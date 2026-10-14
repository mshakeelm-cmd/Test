import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from segments import (  # noqa: E402
    SAMPLE_RATE,
    Segment,
    Turn,
    choose_language,
    format_timestamp,
    merge_turns,
    render_srt,
    render_txt,
    speaker_names,
    split_long_turn,
)


def test_merge_turns_joins_same_speaker_and_drops_blips():
    turns = [Turn(0, 2, "A"), Turn(2.5, 4, "A"), Turn(4.1, 4.2, "C"), Turn(5, 7, "B"), Turn(9, 10, "B")]
    assert merge_turns(turns) == [Turn(0, 4, "A"), Turn(5, 7, "B"), Turn(9, 10, "B")]


def test_split_long_turn_cuts_at_silence_and_respects_max_len():
    rng = np.random.default_rng(0)
    audio = rng.normal(0, 0.3, SAMPLE_RATE * 70).astype(np.float32)
    audio[int(20 * SAMPLE_RATE):int(20.5 * SAMPLE_RATE)] = 0  # a pause at 20 s
    chunks = split_long_turn(audio, Turn(0, 70, "A"), max_len=28)
    assert 20 <= chunks[0].end <= 20.5
    assert all(c.duration <= 28 + 1e-6 for c in chunks)
    assert chunks[0].start == 0 and chunks[-1].end == 70
    assert all(a.end == b.start for a, b in zip(chunks, chunks[1:]))


def test_split_short_turn_unchanged():
    audio = np.zeros(SAMPLE_RATE * 10, np.float32)
    assert split_long_turn(audio, Turn(1, 9, "A")) == [Turn(1, 9, "A")]


def test_choose_language():
    probs = {"en": 0.2, "fr": 0.7}
    assert choose_language(probs, ["en", "fr"], 5.0, "en") == "fr"
    assert choose_language(probs, ["en", "fr"], 0.8, "en") == "en"  # short clip inherits
    assert choose_language(probs, ["en", "fr"], 0.8, None) == "fr"


def test_speaker_names_by_first_appearance():
    segs = [Segment(0, 1, "SPEAKER_01"), Segment(1, 2, "SPEAKER_00"), Segment(2, 3, "SPEAKER_02")]
    assert speaker_names(segs, ["Ali", "Marie"]) == {
        "SPEAKER_01": "Ali", "SPEAKER_00": "Marie", "SPEAKER_02": "Speaker 3"}


def test_format_timestamp():
    assert format_timestamp(3725.5) == "01:02:05"
    assert format_timestamp(3725.5, srt=True) == "01:02:05,500"


def test_render_txt_joins_paragraphs_and_srt_skips_empty():
    segs = [
        Segment(0, 5, "A", "en", "Hello there."),
        Segment(5, 9, "A", "en", "How are you?"),
        Segment(9, 12, "A", "fr", "Ça va bien."),
        Segment(12, 13, "B", "fr", "  "),
        Segment(13, 15, "B", "fr", "Moi aussi."),
    ]
    names = speaker_names(segs)
    assert render_txt(segs, names) == (
        "[00:00:00] Speaker 1 (EN): Hello there. How are you?\n\n"
        "[00:00:09] Speaker 1 (FR): Ça va bien.\n\n"
        "[00:00:13] Speaker 2 (FR): Moi aussi.\n"
    )
    srt = render_srt(segs, names)
    assert srt.count("-->") == 4
    assert "00:00:13,000 --> 00:00:15,000\n[Speaker 2] Moi aussi." in srt

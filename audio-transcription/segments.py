"""Pure helpers for the transcription pipeline (no ML dependencies, unit-tested)."""

from __future__ import annotations

from dataclasses import dataclass, field

import numpy as np

SAMPLE_RATE = 16_000


@dataclass
class Turn:
    start: float
    end: float
    speaker: str

    @property
    def duration(self) -> float:
        return self.end - self.start


@dataclass
class Segment:
    start: float
    end: float
    speaker: str
    language: str = ""
    text: str = ""
    language_probs: dict[str, float] = field(default_factory=dict)


def merge_turns(turns: list[Turn], max_gap: float = 0.8, min_duration: float = 0.3) -> list[Turn]:
    """Join consecutive turns of the same speaker separated by a short pause, then drop blips."""
    merged: list[Turn] = []
    for t in sorted(turns, key=lambda t: t.start):
        if merged and merged[-1].speaker == t.speaker and t.start - merged[-1].end <= max_gap:
            merged[-1].end = max(merged[-1].end, t.end)
        else:
            merged.append(Turn(t.start, t.end, t.speaker))
    return [t for t in merged if t.duration >= min_duration]


def split_long_turn(
    audio: np.ndarray,
    turn: Turn,
    max_len: float = 28.0,
    sr: int = SAMPLE_RATE,
    frame: float = 0.025,
) -> list[Turn]:
    """Split a turn into chunks of at most `max_len` seconds, cutting at the quietest moment.

    Whisper detects the language from a single 30 s window, so keeping chunks under that
    lets us pick up a language switch inside one speaker's long monologue.
    """
    chunks: list[Turn] = []
    start = turn.start
    while turn.end - start > max_len:
        lo, hi = start + max_len * 0.5, start + max_len
        a, b = int(lo * sr), int(hi * sr)
        window = audio[a:b]
        n = int(frame * sr)
        if len(window) >= n:
            frames = window[: len(window) // n * n].reshape(-1, n)
            rms = np.sqrt((frames.astype(np.float64) ** 2).mean(axis=1))
            cut = lo + (int(np.argmin(rms)) + 0.5) * frame
        else:
            cut = hi
        chunks.append(Turn(start, cut, turn.speaker))
        start = cut
    chunks.append(Turn(start, turn.end, turn.speaker))
    return chunks


def choose_language(
    probs: dict[str, float],
    allowed: list[str],
    duration: float,
    previous: str | None,
    min_reliable: float = 2.0,
) -> str:
    """Pick the most likely allowed language.

    Very short clips ("oui", "okay") give unreliable language guesses, so they inherit the
    speaker's previous language when there is one.
    """
    if duration < min_reliable and previous:
        return previous
    return max(allowed, key=lambda lang: probs.get(lang, 0.0))


def speaker_names(segments: list[Segment], names: list[str] | None = None) -> dict[str, str]:
    """Map raw diarization labels to 'Speaker 1', 'Speaker 2'... (or given names) by first appearance."""
    names = names or []
    mapping: dict[str, str] = {}
    for seg in segments:
        if seg.speaker not in mapping:
            i = len(mapping)
            mapping[seg.speaker] = names[i] if i < len(names) else f"Speaker {i + 1}"
    return mapping


def format_timestamp(seconds: float, srt: bool = False) -> str:
    ms = int(round(max(seconds, 0.0) * 1000))
    h, ms = divmod(ms, 3_600_000)
    m, ms = divmod(ms, 60_000)
    s, ms = divmod(ms, 1000)
    return f"{h:02d}:{m:02d}:{s:02d},{ms:03d}" if srt else f"{h:02d}:{m:02d}:{s:02d}"


def _paragraphs(segments: list[Segment]) -> list[Segment]:
    """Join consecutive non-empty segments with the same speaker and language."""
    out: list[Segment] = []
    for seg in segments:
        if not seg.text.strip():
            continue
        if out and out[-1].speaker == seg.speaker and out[-1].language == seg.language:
            out[-1].end = seg.end
            out[-1].text = f"{out[-1].text} {seg.text.strip()}"
        else:
            out.append(Segment(seg.start, seg.end, seg.speaker, seg.language, seg.text.strip()))
    return out


def render_txt(segments: list[Segment], names: dict[str, str]) -> str:
    lines = [
        f"[{format_timestamp(p.start)}] {names.get(p.speaker, p.speaker)} ({p.language.upper()}): {p.text}"
        for p in _paragraphs(segments)
    ]
    return "\n\n".join(lines) + "\n"


def render_srt(segments: list[Segment], names: dict[str, str]) -> str:
    blocks = []
    for i, seg in enumerate((s for s in segments if s.text.strip()), start=1):
        blocks.append(
            f"{i}\n{format_timestamp(seg.start, True)} --> {format_timestamp(seg.end, True)}\n"
            f"[{names.get(seg.speaker, seg.speaker)}] {seg.text.strip()}\n"
        )
    return "\n".join(blocks)

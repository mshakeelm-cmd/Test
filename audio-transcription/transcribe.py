#!/usr/bin/env python3
"""Offline English/French transcription with speaker labels, for Apple Silicon Macs.

Pipeline: ffmpeg decode -> pyannote speaker diarization -> per-chunk language detection
(restricted to the allowed languages) -> mlx-whisper transcription in that language.
Nothing leaves the machine; models are downloaded once from Hugging Face.
"""

from __future__ import annotations

import argparse
import json
import os
import subprocess
import sys
import time
from dataclasses import asdict
from pathlib import Path

import numpy as np

from segments import (
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

MODELS = {
    "accurate": "mlx-community/whisper-large-v3-mlx",
    "fast": "mlx-community/whisper-large-v3-turbo",
}
DIARIZATION_MODEL = "pyannote/speaker-diarization-community-1"


def load_audio(path: Path) -> np.ndarray:
    """Decode any format ffmpeg understands (.m4a from iPhone included) to 16 kHz mono float32."""
    cmd = ["ffmpeg", "-nostdin", "-v", "error", "-i", str(path),
           "-f", "s16le", "-ac", "1", "-ar", str(SAMPLE_RATE), "-"]
    try:
        raw = subprocess.run(cmd, capture_output=True, check=True).stdout
    except FileNotFoundError:
        sys.exit("ffmpeg not found. Install it with: brew install ffmpeg")
    except subprocess.CalledProcessError as e:
        sys.exit(f"Could not decode {path}: {e.stderr.decode(errors='replace').strip()}")
    return np.frombuffer(raw, np.int16).astype(np.float32) / 32768.0


def diarize(audio: np.ndarray, token: str | None, num: int | None,
            min_n: int | None, max_n: int | None) -> list[Turn]:
    import torch
    from pyannote.audio import Pipeline

    pipeline = Pipeline.from_pretrained(DIARIZATION_MODEL, token=token)
    if pipeline is None:
        sys.exit(
            f"Could not load {DIARIZATION_MODEL}. Accept its terms at "
            f"https://huggingface.co/{DIARIZATION_MODEL} and run `hf auth login` (see README)."
        )
    if torch.backends.mps.is_available():
        pipeline.to(torch.device("mps"))

    output = pipeline(
        {"waveform": torch.from_numpy(audio)[None], "sample_rate": SAMPLE_RATE},
        num_speakers=num, min_speakers=min_n, max_speakers=max_n,
    )
    # "Exclusive" diarization assigns overlapping speech to a single speaker, which is
    # what a transcript needs; older pyannote versions return a plain Annotation.
    annotation = getattr(output, "exclusive_speaker_diarization", output)
    return [Turn(seg.start, seg.end, label)
            for seg, _, label in annotation.itertracks(yield_label=True)]


class Transcriber:
    def __init__(self, model_repo: str, languages: list[str]):
        import mlx.core as mx
        import mlx_whisper
        from mlx_whisper.audio import N_FRAMES, N_SAMPLES, log_mel_spectrogram, pad_or_trim
        from mlx_whisper.transcribe import ModelHolder

        self.mx, self.mlx_whisper = mx, mlx_whisper
        self.N_FRAMES, self.N_SAMPLES = N_FRAMES, N_SAMPLES
        self.log_mel_spectrogram, self.pad_or_trim = log_mel_spectrogram, pad_or_trim
        self.repo, self.languages = model_repo, languages
        # Shares the model cache used by mlx_whisper.transcribe, so it is loaded once.
        self.model = ModelHolder.get_model(model_repo, mx.float16)

    def language_probs(self, clip: np.ndarray) -> dict[str, float]:
        mel = self.log_mel_spectrogram(clip, n_mels=self.model.dims.n_mels, padding=self.N_SAMPLES)
        mel = self.pad_or_trim(mel, self.N_FRAMES, axis=-2).astype(self.mx.float16)
        _, probs = self.model.detect_language(mel)
        return {lang: float(probs.get(lang, 0.0)) for lang in self.languages}

    def transcribe(self, clip: np.ndarray, language: str) -> str:
        result = self.mlx_whisper.transcribe(
            clip,
            path_or_hf_repo=self.repo,
            language=language,
            condition_on_previous_text=False,  # limits repeated/hallucinated text
            hallucination_silence_threshold=2.0,
            word_timestamps=True,  # required by hallucination_silence_threshold
        )
        return result["text"].strip()


def process(path: Path, args: argparse.Namespace, transcriber: Transcriber) -> None:
    t0 = time.time()
    print(f"\n==> {path.name}")
    audio = load_audio(path)
    total = len(audio) / SAMPLE_RATE
    print(f"    duration {format_timestamp(total)}; identifying speakers...")

    turns = merge_turns(diarize(audio, args.hf_token, args.speakers,
                                args.min_speakers, args.max_speakers))
    if not turns:
        turns = [Turn(0.0, total, "SPEAKER_00")]
    chunks = [c for t in turns for c in split_long_turn(audio, t, max_len=args.max_chunk)]
    print(f"    {len({t.speaker for t in turns})} speaker(s), {len(chunks)} chunk(s); transcribing...")

    segments: list[Segment] = []
    last_lang: dict[str, str] = {}
    for i, c in enumerate(chunks, 1):
        clip = audio[int(c.start * SAMPLE_RATE):int(c.end * SAMPLE_RATE)]
        if len(args.languages) == 1:
            probs, lang = {}, args.languages[0]
        else:
            probs = transcriber.language_probs(clip)
            lang = choose_language(probs, args.languages, c.duration, last_lang.get(c.speaker))
        last_lang[c.speaker] = lang
        text = transcriber.transcribe(clip, lang)
        segments.append(Segment(c.start, c.end, c.speaker, lang, text, probs))
        print(f"    [{i}/{len(chunks)}] {format_timestamp(c.start)} {lang.upper()} {text[:70]}")

    names = speaker_names(segments, args.names)
    out_dir = args.out_dir or path.parent
    out_dir.mkdir(parents=True, exist_ok=True)
    stem = out_dir / path.stem
    stem.with_suffix(".txt").write_text(render_txt(segments, names), encoding="utf-8")
    stem.with_suffix(".srt").write_text(render_srt(segments, names), encoding="utf-8")
    stem.with_suffix(".json").write_text(json.dumps(
        {"file": path.name, "duration": total, "speakers": names,
         "segments": [asdict(s) | {"speaker_name": names[s.speaker]} for s in segments]},
        ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"    done in {time.time() - t0:.0f}s -> {stem}.txt / .srt / .json")


def main() -> None:
    p = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    p.add_argument("files", nargs="+", type=Path, help="audio files (.m4a, .mp3, .wav, ...)")
    p.add_argument("--languages", default="en,fr",
                   help="comma-separated languages that may be spoken (default: en,fr)")
    p.add_argument("--speakers", type=int, help="exact number of speakers, if known (improves accuracy)")
    p.add_argument("--min-speakers", type=int)
    p.add_argument("--max-speakers", type=int)
    p.add_argument("--names", help="comma-separated names, in order of who speaks first, e.g. 'Ali,Marie'")
    p.add_argument("--fast", action="store_true", help="use whisper-large-v3-turbo (faster, slightly less accurate)")
    p.add_argument("--max-chunk", type=float, default=28.0,
                   help="max seconds per chunk; language is re-detected for every chunk (default: 28)")
    p.add_argument("--out-dir", type=Path, help="where to write results (default: next to the audio)")
    p.add_argument("--hf-token", default=os.environ.get("HF_TOKEN"),
                   help="Hugging Face token (default: $HF_TOKEN or the `hf auth login` token)")
    args = p.parse_args()

    args.languages = [l.strip().lower() for l in args.languages.split(",") if l.strip()]
    args.names = [n.strip() for n in args.names.split(",")] if args.names else None
    missing = [f for f in args.files if not f.is_file()]
    if missing:
        sys.exit(f"File(s) not found: {', '.join(map(str, missing))}")

    transcriber = Transcriber(MODELS["fast" if args.fast else "accurate"], args.languages)
    for f in args.files:
        process(f, args, transcriber)


if __name__ == "__main__":
    main()

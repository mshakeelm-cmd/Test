# Audio transcription (English / French, with speakers)

Transcribes recordings from the iPhone's recording app on your Mac. Each line shows
**who** spoke, **when**, and in **which language**. Everything runs locally: your
audio is never uploaded.

```
[00:00:04] Speaker 1 (EN): Okay, let's start with the budget.

[00:00:11] Speaker 2 (FR): D'accord, j'ai préparé les chiffres hier.
```

Needs a Mac with an M-series chip and 16 GB of memory or more.

## One-time setup (about 15 minutes)

1. **Install tools** (in Terminal):
   ```bash
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"  # skip if you have Homebrew
   brew install python@3.12 ffmpeg
   ```
2. **Create an environment and install the dependencies** (from this folder):
   ```bash
   cd audio-transcription
   python3.12 -m venv .venv
   source .venv/bin/activate
   pip install -r requirements.txt
   ```
3. **Hugging Face access (free, one time, used only to download the speaker model):**
   - Create an account at <https://huggingface.co/join>.
   - Open <https://huggingface.co/pyannote/speaker-diarization-community-1> and accept the terms.
   - Create a *Read* token at <https://huggingface.co/settings/tokens>, then run:
     ```bash
     hf auth login
     ```

The first run downloads the models (about 3 GB). After that, it works offline.

## Usage

Export a recording from the iPhone (Share → Save to Files or AirDrop → `.m4a`), then run:

```bash
source .venv/bin/activate
python transcribe.py ~/Downloads/meeting.m4a
```

This writes `meeting.txt` (readable transcript), `meeting.srt` (subtitles) and
`meeting.json` (full detail) next to the audio file.

Useful options:

| Option | When to use it |
|---|---|
| `--speakers 2` | You know how many people speak. This noticeably improves speaker separation. |
| `--names "Ali,Marie"` | Replaces "Speaker 1" and "Speaker 2" in order of who speaks first. |
| `--languages fr` | The recording uses one language only. This is faster and avoids misdetection. |
| `--fast` | Uses the turbo model: about 2–3× faster, slightly less accurate. |
| `--out-dir ~/Transcripts` | Saves results elsewhere. |

Several files at once: `python transcribe.py ~/Downloads/*.m4a`

## How it works and its limits

1. **Speakers:** pyannote finds who spoke when.
2. **Chunks:** each speaker turn is cut into chunks of 28 seconds or less, at the quietest moment.
3. **Language:** for each chunk, Whisper decides between English and French only. A clip shorter than 2 seconds ("oui", "okay") keeps the speaker's previous language.
4. **Text:** Whisper (large-v3, running on the Mac's GPU) transcribes each chunk in its own language.

Limits:
- Switching language *within one sentence* is transcribed in the chunk's main language.
- People talking over each other are attributed to one speaker.
- Speakers with very similar voices, or a phone far from the speakers, reduce speaker accuracy.
- Expect roughly 10–25 minutes of processing per hour of audio (faster with `--fast`).

## Tests

```bash
pip install pytest && python -m pytest tests
```

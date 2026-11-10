from models import TextBody
import os
from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from supertonic import TTS

tts = TTS(auto_download=True)
style = tts.get_voice_style(voice_name="M1")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

PROJECT_ROOT = Path(__file__).resolve().parent.parent
OUTPUT_DIR = Path(PROJECT_ROOT / "audiofile").resolve()
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

@app.post("/api/v1/synthesize")
def synthesize(body: TextBody):
    wav, _ = tts.synthesize(body.text, style)
    tts.save_audio(wav, f"{OUTPUT_DIR} / output.wav")


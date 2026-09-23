from models import TextBody

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

@app.post("/api/v1/synthesize")
def synthesize(body: TextBody):
    wav, _ = tts.synthesize(body.text, style)
    tts.save_audio(wav, "output.wav")


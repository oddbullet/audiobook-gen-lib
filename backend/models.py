from pydantic import BaseModel

class TextBody(BaseModel):
    text: str
    
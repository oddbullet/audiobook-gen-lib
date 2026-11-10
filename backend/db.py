import os
from pathlib import Path

from sqlalchemy import Engine
from sqlmodel import Field, SQLModel, create_engine

PROJECT_ROOT = Path(__file__).resolve().parent.parent
DB_PATH = Path(os.getenv("DB_PATH", PROJECT_ROOT / "data" / "audiobook.db"))


class Audiobook(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    title: str = ""


class Chapter(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    audiobook_id: int = Field(foreign_key="audiobook.id")
    title: str = ""
    text: str = ""
    index: int

engine = create_engine(f"sqlite:///{DB_PATH}")

def init_db(engine: Engine) -> None:
    Path(engine.url.database).parent.mkdir(parents=True, exist_ok=True)
    SQLModel.metadata.create_all(engine)

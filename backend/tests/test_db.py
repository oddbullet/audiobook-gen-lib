from fastapi.testclient import TestClient
from sqlalchemy import inspect
from sqlmodel import create_engine

import main
from db import init_db


def test_init_db_creates_database_file_and_tables(tmp_path):
    db_file = tmp_path / "nested" / "audiobook.db"
    engine = create_engine(f"sqlite:///{db_file}")

    init_db(engine)

    assert db_file.exists()
    tables = inspect(engine).get_table_names()
    assert "audiobook" in tables
    assert "chapter" in tables


def test_init_db_is_safe_to_run_twice(tmp_path):
    engine = create_engine(f"sqlite:///{tmp_path / 'audiobook.db'}")

    init_db(engine)
    init_db(engine)

    assert "chapter" in inspect(engine).get_table_names()


def test_app_startup_creates_database(tmp_path, monkeypatch):
    db_file = tmp_path / "audiobook.db"
    monkeypatch.setattr(main, "engine", create_engine(f"sqlite:///{db_file}"))

    with TestClient(main.app):
        assert db_file.exists()

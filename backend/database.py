# backend/database.py
import os
from sqlmodel import create_engine, SQLModel, Session
from dotenv import load_dotenv

load_dotenv()

sqlite_file = "resume_builder.db"
if os.getenv("VERCEL"):
    sqlite_url = f"sqlite:////tmp/{sqlite_file}"
else:
    sqlite_url = os.getenv("DATABASE_URL", f"sqlite:///./{sqlite_file}")
engine = create_engine(sqlite_url, echo=True)

def create_db_and_tables():
    SQLModel.metadata.create_all(engine)

def get_session():
    with Session(engine) as session:
        yield session

# backend/main.py
import asyncio
import sys
import logging

# Configure Logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

if sys.platform == 'win32':
    logger.info("Setting Windows ProactorEventLoopPolicy for subprocess support")
    asyncio.set_event_loop_policy(asyncio.WindowsProactorEventLoopPolicy())

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import resume, export
from database import create_db_and_tables
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="Resume Builder API")

# Setup CORS
# Use environment variable or fallback to common local addresses
origins = os.getenv("ALLOWED_ORIGINS", "http://localhost:3000,http://127.0.0.1:3000").split(",")
# Strip any whitespace
origins = [o.strip() for o in origins if o.strip()]

logger.info(f"Setting allowed origins: {origins}")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(resume.router)
app.include_router(export.router)

@app.on_event("startup")
def on_startup():
    logger.info("Application starting up, ensuring database tables exist...")
    create_db_and_tables()

@app.get("/")
def read_root():
    return {"status": "online", "message": "Resume Builder API is running"}

"""FastAPI application entrypoint."""

from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes import analytics, journal
from app.core.config import settings
from app.core.logging import logger
from app.db.database import init_db


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Startup and shutdown lifecycle events."""
    logger.info("🚀 Starting %s ...", settings.APP_NAME)
    await init_db()
    logger.info("✅ Database initialized")
    yield
    logger.info("👋 Shutting down %s", settings.APP_NAME)


app = FastAPI(
    title=settings.APP_NAME,
    description="Predictive wellness journaling powered by LangGraph + GenAI",
    version="0.1.0",
    lifespan=lifespan,
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(journal.router, prefix="/api")
app.include_router(analytics.router, prefix="/api")


@app.get("/")
async def root():
    return {
        "name": settings.APP_NAME,
        "version": "0.1.0",
        "status": "healthy",
    }


@app.get("/health")
async def health():
    return {"status": "ok"}

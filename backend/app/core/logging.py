"""Structured logging configuration."""

import logging
import sys
from pathlib import Path

from app.core.config import settings


def setup_logging() -> logging.Logger:
    """Configure and return the application logger."""
    log_dir = Path("logs")
    log_dir.mkdir(exist_ok=True)

    logger = logging.getLogger("wellness")
    logger.setLevel(getattr(logging, settings.LOG_LEVEL.upper(), logging.INFO))

    formatter = logging.Formatter(
        fmt="%(asctime)s | %(levelname)-8s | %(name)s | %(message)s",
        datefmt="%Y-%m-%d %H:%M:%S",
    )

    # Console handler
    console = logging.StreamHandler(sys.stdout)
    console.setFormatter(formatter)
    logger.addHandler(console)

    # File handler
    file_handler = logging.FileHandler(log_dir / "app.log")
    file_handler.setFormatter(formatter)
    logger.addHandler(file_handler)

    return logger


logger = setup_logging()

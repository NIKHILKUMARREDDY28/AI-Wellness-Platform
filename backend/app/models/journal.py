"""Pydantic models for journal entries and analysis results."""

import uuid
from datetime import datetime
from typing import Any

from pydantic import BaseModel, ConfigDict, Field


def generate_uuid() -> str:
    return str(uuid.uuid4())


class JournalEntry(BaseModel):
    """Journal entry model."""
    
    id: str = Field(default_factory=generate_uuid, alias="_id")
    title: str = "Untitled"
    content: str
    mood_score: float | None = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    # AI analysis results
    sentiment: dict[str, Any] | None = None
    patterns: dict[str, Any] | None = None
    prediction: dict[str, Any] | None = None
    recommendations: list[dict[str, Any]] | None = None
    wellness_score: int | None = None

    model_config = ConfigDict(
        populate_by_name=True,
        json_schema_extra={
            "example": {
                "title": "My Day",
                "content": "I had a great day...",
                "mood_score": 0.8
            }
        }
    )

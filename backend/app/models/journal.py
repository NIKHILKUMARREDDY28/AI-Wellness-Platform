"""SQLAlchemy ORM models for journal entries and analysis results."""

import uuid
from datetime import datetime

from sqlalchemy import JSON, DateTime, Float, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from app.db.database import Base


def generate_uuid() -> str:
    return str(uuid.uuid4())


class JournalEntry(Base):
    __tablename__ = "journal_entries"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=generate_uuid)
    title: Mapped[str] = mapped_column(String(255), default="Untitled")
    content: Mapped[str] = mapped_column(Text, nullable=False)
    mood_score: Mapped[float | None] = mapped_column(Float, nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(
        DateTime, default=datetime.utcnow, onupdate=datetime.utcnow
    )

    # AI analysis results (stored as JSON)
    sentiment: Mapped[dict | None] = mapped_column(JSON, nullable=True)
    patterns: Mapped[dict | None] = mapped_column(JSON, nullable=True)
    prediction: Mapped[dict | None] = mapped_column(JSON, nullable=True)
    recommendations: Mapped[list | None] = mapped_column(JSON, nullable=True)
    wellness_score: Mapped[int | None] = mapped_column(Integer, nullable=True)

    def __repr__(self) -> str:
        return f"<JournalEntry(id={self.id}, title={self.title})>"

"""Pydantic schemas for API request/response validation."""

from datetime import datetime

from pydantic import BaseModel, Field


# ── Journal ──────────────────────────────────────────────────────────────────

class JournalCreate(BaseModel):
    title: str = "Untitled"
    content: str = Field(..., min_length=1, description="Journal entry text")
    mood_score: float | None = Field(None, ge=0, le=100, description="User mood 0-100")


class JournalUpdate(BaseModel):
    title: str | None = None
    content: str | None = None
    mood_score: float | None = None


class SentimentResult(BaseModel):
    score: float = Field(description="Sentiment score -1 to 1")
    label: str = Field(description="e.g. positive, negative, neutral")
    confidence: float = Field(description="Confidence 0-1")


class PatternResult(BaseModel):
    keywords: list[str] = []
    stressors: list[str] = []
    themes: list[str] = []


class PredictionResult(BaseModel):
    outlook: str = ""
    confidence: float = 0.0
    risk_areas: list[str] = []


class RecommendationItem(BaseModel):
    type: str = Field(description="e.g. breathing, article, exercise")
    title: str = ""
    description: str = ""


class AnalysisResponse(BaseModel):
    sentiment: SentimentResult
    patterns: PatternResult
    prediction: PredictionResult
    recommendations: list[RecommendationItem]
    wellness_score: int = Field(ge=0, le=100)


class JournalResponse(BaseModel):
    id: str
    title: str
    content: str
    mood_score: float | None
    created_at: datetime
    updated_at: datetime
    sentiment: dict | None = None
    patterns: dict | None = None
    prediction: dict | None = None
    recommendations: list | None = None
    wellness_score: int | None = None

    model_config = {"from_attributes": True}


# ── Analytics ────────────────────────────────────────────────────────────────

class MoodDistribution(BaseModel):
    label: str
    percentage: float
    color: str


class StressorItem(BaseModel):
    keyword: str
    impact: str  # high, medium, low
    frequency: int


class AnalyticsSummary(BaseModel):
    wellness_score: int
    score_change: float
    total_entries: int
    current_streak: int
    mood_distribution: list[MoodDistribution]
    top_stressors: list[StressorItem]
    stability_trend: list[int]

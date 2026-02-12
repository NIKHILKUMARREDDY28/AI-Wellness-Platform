"""Graph state definition for the wellness analysis pipeline."""

from typing import TypedDict


class WellnessState(TypedDict, total=False):
    """State that flows through each node in the LangGraph pipeline.

    Each node reads from and writes to this shared state object.
    """

    # Input
    journal_text: str
    journal_id: str

    # Sentiment node output
    sentiment: dict  # {score, label, confidence}

    # Pattern node output
    patterns: dict  # {keywords, stressors, themes}

    # Predictor node output
    prediction: dict  # {outlook, confidence, risk_areas}

    # Recommender node output
    recommendations: list  # [{type, title, description}, ...]

    # Final computed score
    wellness_score: int  # 0-100

    # Error tracking
    error: str | None

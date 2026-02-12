"""Sentiment analysis node for the wellness pipeline."""

import json

from langchain_core.messages import HumanMessage, SystemMessage

from app.core.logging import logger
from app.langgraph_system.state import WellnessState
from app.langgraph_system.tools.llm import get_llm


SENTIMENT_PROMPT = """You are a mental health sentiment analyzer. Analyze the following journal entry and return a JSON object with exactly these fields:

{
  "score": <float between -1.0 (very negative) and 1.0 (very positive)>,
  "label": "<one of: very_negative, negative, neutral, positive, very_positive>",
  "confidence": <float between 0.0 and 1.0>
}

Focus on:
- Overall emotional tone
- Subtle indicators of stress, anxiety, joy, or calm
- Context clues about mental state

Return ONLY the JSON object, no other text."""


async def sentiment_node(state: WellnessState) -> dict:
    """Analyze the sentiment of a journal entry.

    Args:
        state: Current pipeline state containing journal_text.

    Returns:
        Dict with 'sentiment' key to merge into state.
    """
    logger.info("🔍 Sentiment node: analyzing entry %s", state.get("journal_id", "unknown"))

    try:
        llm = get_llm(temperature=0.1)
        messages = [
            SystemMessage(content=SENTIMENT_PROMPT),
            HumanMessage(content=state["journal_text"]),
        ]
        response = await llm.ainvoke(messages)

        # Parse the JSON response
        content = response.content.strip()
        # Handle markdown code blocks
        if content.startswith("```"):
            content = content.split("\n", 1)[1].rsplit("```", 1)[0].strip()

        sentiment = json.loads(content)
        logger.info("✅ Sentiment: %s (score: %.2f)", sentiment["label"], sentiment["score"])
        return {"sentiment": sentiment}

    except Exception as e:
        logger.error("❌ Sentiment node failed: %s", str(e))
        return {
            "sentiment": {"score": 0.0, "label": "neutral", "confidence": 0.0},
            "error": f"Sentiment analysis failed: {str(e)}",
        }

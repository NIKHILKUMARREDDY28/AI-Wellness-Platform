"""Mood prediction node for the wellness pipeline."""

import json

from langchain_core.messages import HumanMessage, SystemMessage

from app.core.logging import logger
from app.langgraph_system.state import WellnessState
from app.langgraph_system.tools.llm import get_llm


PREDICTOR_PROMPT = """You are an AI mental wellness predictor. Based on the sentiment analysis and identified patterns from a journal entry, predict the user's wellness outlook.

Sentiment: {sentiment}
Patterns: {patterns}

Return a JSON object with exactly these fields:

{{
  "outlook": "<a 1-2 sentence prediction of the user's mental wellness trajectory>",
  "confidence": <float 0.0-1.0 representing prediction confidence>,
  "risk_areas": ["<areas where the user might need support>"]
}}

Be empathetic, evidence-based, and constructive. Return ONLY the JSON object."""


async def predictor_node(state: WellnessState) -> dict:
    """Predict wellness trajectory based on sentiment and patterns.

    Args:
        state: Current pipeline state with sentiment and patterns.

    Returns:
        Dict with 'prediction' key to merge into state.
    """
    logger.info("📊 Predictor node: generating forecast for entry %s", state.get("journal_id", "unknown"))

    try:
        llm = get_llm(temperature=0.3)
        prompt = PREDICTOR_PROMPT.format(
            sentiment=json.dumps(state.get("sentiment", {})),
            patterns=json.dumps(state.get("patterns", {})),
        )

        messages = [
            SystemMessage(content=prompt),
            HumanMessage(content="Generate the wellness prediction based on the above analysis."),
        ]
        response = await llm.ainvoke(messages)

        content = response.content.strip()
        if content.startswith("```"):
            content = content.split("\n", 1)[1].rsplit("```", 1)[0].strip()

        prediction = json.loads(content)
        logger.info("✅ Prediction: confidence=%.2f, risks=%s", prediction["confidence"], prediction["risk_areas"])
        return {"prediction": prediction}

    except Exception as e:
        logger.error("❌ Predictor node failed: %s", str(e))
        return {
            "prediction": {"outlook": "Unable to predict.", "confidence": 0.0, "risk_areas": []},
            "error": f"Prediction failed: {str(e)}",
        }

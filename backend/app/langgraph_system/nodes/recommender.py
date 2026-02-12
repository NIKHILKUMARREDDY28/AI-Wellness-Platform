"""Recommendation generator node for the wellness pipeline."""

import json

from langchain_core.messages import HumanMessage, SystemMessage

from app.core.logging import logger
from app.langgraph_system.state import WellnessState
from app.langgraph_system.tools.llm import get_llm


RECOMMENDER_PROMPT = """You are an AI wellness coach. Based on the complete analysis of a journal entry, generate personalized wellness recommendations.

Sentiment: {sentiment}
Patterns: {patterns}
Prediction: {prediction}

Return a JSON object with exactly these fields:

{{
  "recommendations": [
    {{
      "type": "<one of: breathing, meditation, article, exercise, social, professional>",
      "title": "<short title for the recommendation>",
      "description": "<1-2 sentence actionable description>"
    }}
  ],
  "wellness_score": <integer 0-100 representing overall wellness>
}}

Guidelines:
- Generate 3-5 recommendations
- Prioritize by urgency (most helpful first)
- Be specific and actionable
- Wellness score: 0-30 = concerning, 31-50 = needs attention, 51-70 = moderate, 71-85 = good, 86-100 = excellent

Return ONLY the JSON object."""


async def recommender_node(state: WellnessState) -> dict:
    """Generate personalized wellness recommendations.

    Args:
        state: Current pipeline state with all prior analysis.

    Returns:
        Dict with 'recommendations' and 'wellness_score' to merge into state.
    """
    logger.info("💡 Recommender node: generating recommendations for entry %s", state.get("journal_id", "unknown"))

    try:
        llm = get_llm(temperature=0.5)
        prompt = RECOMMENDER_PROMPT.format(
            sentiment=json.dumps(state.get("sentiment", {})),
            patterns=json.dumps(state.get("patterns", {})),
            prediction=json.dumps(state.get("prediction", {})),
        )

        messages = [
            SystemMessage(content=prompt),
            HumanMessage(content="Generate wellness recommendations and score."),
        ]
        response = await llm.ainvoke(messages)

        content = response.content.strip()
        if content.startswith("```"):
            content = content.split("\n", 1)[1].rsplit("```", 1)[0].strip()

        result = json.loads(content)

        recommendations = result.get("recommendations", [])
        wellness_score = max(0, min(100, result.get("wellness_score", 50)))

        logger.info(
            "✅ Recommendations: %d items, wellness_score=%d",
            len(recommendations),
            wellness_score,
        )
        return {
            "recommendations": recommendations,
            "wellness_score": wellness_score,
        }

    except Exception as e:
        logger.error("❌ Recommender node failed: %s", str(e))
        return {
            "recommendations": [],
            "wellness_score": 50,
            "error": f"Recommendation generation failed: {str(e)}",
        }

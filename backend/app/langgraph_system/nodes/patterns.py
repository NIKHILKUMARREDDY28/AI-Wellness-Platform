"""Pattern extraction node for the wellness pipeline."""

import json

from langchain_core.messages import HumanMessage, SystemMessage

from app.core.logging import logger
from app.langgraph_system.state import WellnessState
from app.langgraph_system.tools.llm import get_llm


PATTERN_PROMPT = """You are a mental health pattern analyst. Given a journal entry and its sentiment analysis, extract behavioral and emotional patterns.

Return a JSON object with exactly these fields:

{
  "keywords": ["<key emotional/topical words found in the text>"],
  "stressors": ["<identified sources of stress or negative emotion>"],
  "themes": ["<overarching themes like 'work pressure', 'relationship concerns', 'self-growth'>"]
}

Sentiment context: {sentiment}

Analyze the following journal entry. Return ONLY the JSON object, no other text."""


async def patterns_node(state: WellnessState) -> dict:
    """Extract patterns and themes from a journal entry.

    Args:
        state: Current pipeline state with journal_text and sentiment.

    Returns:
        Dict with 'patterns' key to merge into state.
    """
    logger.info("🧩 Patterns node: extracting patterns for entry %s", state.get("journal_id", "unknown"))

    try:
        llm = get_llm(temperature=0.2)
        prompt = PATTERN_PROMPT.format(sentiment=json.dumps(state.get("sentiment", {})))

        messages = [
            SystemMessage(content=prompt),
            HumanMessage(content=state["journal_text"]),
        ]
        response = await llm.ainvoke(messages)

        content = response.content.strip()
        if content.startswith("```"):
            content = content.split("\n", 1)[1].rsplit("```", 1)[0].strip()

        patterns = json.loads(content)
        logger.info(
            "✅ Patterns: %d keywords, %d stressors, %d themes",
            len(patterns.get("keywords", [])),
            len(patterns.get("stressors", [])),
            len(patterns.get("themes", [])),
        )
        return {"patterns": patterns}

    except Exception as e:
        logger.error("❌ Patterns node failed: %s", str(e))
        return {
            "patterns": {"keywords": [], "stressors": [], "themes": []},
            "error": f"Pattern extraction failed: {str(e)}",
        }

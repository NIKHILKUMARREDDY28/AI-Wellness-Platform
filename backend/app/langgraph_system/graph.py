"""Main LangGraph workflow for journal analysis.

Pipeline: Journal Entry → Sentiment → Patterns → Predictor → Recommender → Final Analysis
"""

from langgraph.graph import END, StateGraph

from app.core.logging import logger
from app.langgraph_system.nodes.patterns import patterns_node
from app.langgraph_system.nodes.predictor import predictor_node
from app.langgraph_system.nodes.recommender import recommender_node
from app.langgraph_system.nodes.sentiment import sentiment_node
from app.langgraph_system.state import WellnessState


def build_wellness_graph() -> StateGraph:
    """Construct and compile the wellness analysis LangGraph.

    The pipeline flows linearly:
      sentiment → patterns → predictor → recommender

    Each node reads prior state and enriches it for the next node.

    Returns:
        A compiled LangGraph that can be invoked with a WellnessState dict.
    """
    graph = StateGraph(WellnessState)

    # Register nodes
    graph.add_node("sentiment", sentiment_node)
    graph.add_node("patterns", patterns_node)
    graph.add_node("predictor", predictor_node)
    graph.add_node("recommender", recommender_node)

    # Define edges (linear pipeline)
    graph.set_entry_point("sentiment")
    graph.add_edge("sentiment", "patterns")
    graph.add_edge("patterns", "predictor")
    graph.add_edge("predictor", "recommender")
    graph.add_edge("recommender", END)

    return graph.compile()


# Singleton compiled graph
wellness_graph = build_wellness_graph()


async def analyze_journal(journal_text: str, journal_id: str = "") -> dict:
    """Run the complete wellness analysis pipeline on a journal entry.

    Args:
        journal_text: The raw journal entry text.
        journal_id: Optional ID for logging.

    Returns:
        Final WellnessState dict with all analysis results.
    """
    logger.info("🚀 Starting analysis pipeline for entry: %s", journal_id or "anonymous")

    initial_state: WellnessState = {
        "journal_text": journal_text,
        "journal_id": journal_id,
    }

    result = await wellness_graph.ainvoke(initial_state)

    logger.info(
        "✅ Pipeline complete for %s — wellness_score=%d",
        journal_id or "anonymous",
        result.get("wellness_score", 0),
    )
    return result

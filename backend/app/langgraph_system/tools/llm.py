"""LLM client wrapper for Google Gemini via LangChain."""

from langchain_google_genai import ChatGoogleGenerativeAI

from app.core.config import settings


def get_llm(temperature: float = 0.3, model: str = "gemini-2.0-flash") -> ChatGoogleGenerativeAI:
    """Return a configured Gemini LLM instance.

    Args:
        temperature: Controls randomness (0=deterministic, 1=creative).
        model: Gemini model name to use.

    Returns:
        A LangChain chat model backed by Google Gemini.
    """
    return ChatGoogleGenerativeAI(
        model=model,
        google_api_key=settings.GOOGLE_API_KEY,
        temperature=temperature,
        convert_system_message_to_human=True,
    )

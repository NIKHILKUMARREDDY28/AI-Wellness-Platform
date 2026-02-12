"""Journal business logic service."""

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.langgraph_system.graph import analyze_journal
from app.models.journal import JournalEntry
from app.models.schemas import JournalCreate, JournalUpdate


async def create_entry(db: AsyncSession, data: JournalCreate) -> JournalEntry:
    """Create a new journal entry."""
    entry = JournalEntry(
        title=data.title,
        content=data.content,
        mood_score=data.mood_score,
    )
    db.add(entry)
    await db.flush()
    await db.refresh(entry)
    return entry


async def get_entries(db: AsyncSession, limit: int = 50, offset: int = 0) -> list[JournalEntry]:
    """Retrieve journal entries ordered by newest first."""
    result = await db.execute(
        select(JournalEntry).order_by(JournalEntry.created_at.desc()).limit(limit).offset(offset)
    )
    return list(result.scalars().all())


async def get_entry(db: AsyncSession, entry_id: str) -> JournalEntry | None:
    """Retrieve a single journal entry by ID."""
    result = await db.execute(select(JournalEntry).where(JournalEntry.id == entry_id))
    return result.scalar_one_or_none()


async def update_entry(db: AsyncSession, entry_id: str, data: JournalUpdate) -> JournalEntry | None:
    """Update a journal entry."""
    entry = await get_entry(db, entry_id)
    if not entry:
        return None

    update_data = data.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(entry, field, value)

    await db.flush()
    await db.refresh(entry)
    return entry


async def delete_entry(db: AsyncSession, entry_id: str) -> bool:
    """Delete a journal entry. Returns True if deleted."""
    entry = await get_entry(db, entry_id)
    if not entry:
        return False
    await db.delete(entry)
    return True


async def analyze_entry(db: AsyncSession, entry_id: str) -> JournalEntry | None:
    """Run the LangGraph analysis pipeline on a journal entry and persist results.

    This triggers the full AI pipeline:
      Sentiment → Patterns → Predictor → Recommender
    """
    entry = await get_entry(db, entry_id)
    if not entry:
        return None

    # Run the LangGraph pipeline
    result = await analyze_journal(entry.content, entry.id)

    # Persist analysis results
    entry.sentiment = result.get("sentiment")
    entry.patterns = result.get("patterns")
    entry.prediction = result.get("prediction")
    entry.recommendations = result.get("recommendations")
    entry.wellness_score = result.get("wellness_score")

    await db.flush()
    await db.refresh(entry)
    return entry

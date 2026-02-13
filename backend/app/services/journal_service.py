"""Journal business logic service."""

import asyncio
from datetime import datetime

from pymongo.collection import Collection
from pymongo.database import Database

from app.langgraph_system.graph import analyze_journal
from app.models.journal import JournalEntry
from app.models.schemas import JournalCreate, JournalUpdate


def get_collection(db: Database) -> Collection:
    return db["journal_entries"]


def create_entry(db: Database, data: JournalCreate) -> JournalEntry:
    """Create a new journal entry."""
    entry = JournalEntry(
        title=data.title,
        content=data.content,
        mood_score=data.mood_score,
    )
    collection = get_collection(db)
    collection.insert_one(entry.model_dump(by_alias=True))
    return entry


def get_entries(db: Database, limit: int = 50, offset: int = 0) -> list[JournalEntry]:
    """Retrieve journal entries ordered by newest first."""
    collection = get_collection(db)
    cursor = collection.find().sort("created_at", -1).skip(offset).limit(limit)
    return [JournalEntry(**doc) for doc in cursor]


def get_entry(db: Database, entry_id: str) -> JournalEntry | None:
    """Retrieve a single journal entry by ID."""
    collection = get_collection(db)
    doc = collection.find_one({"_id": entry_id})
    if not doc:
        return None
    return JournalEntry(**doc)


def update_entry(db: Database, entry_id: str, data: JournalUpdate) -> JournalEntry | None:
    """Update a journal entry."""
    collection = get_collection(db)
    update_data = data.model_dump(exclude_unset=True)
    if not update_data:
        return get_entry(db, entry_id)

    update_data["updated_at"] = datetime.utcnow()
    
    result = collection.find_one_and_update(
        {"_id": entry_id},
        {"$set": update_data},
        return_document=True
    )
    
    if not result:
        return None
    return JournalEntry(**result)


def delete_entry(db: Database, entry_id: str) -> bool:
    """Delete a journal entry. Returns True if deleted."""
    collection = get_collection(db)
    result = collection.delete_one({"_id": entry_id})
    return result.deleted_count > 0


async def analyze_entry(db: Database, entry_id: str) -> JournalEntry | None:
    """Run the LangGraph analysis pipeline on a journal entry and persist results.

    This triggers the full AI pipeline:
      Sentiment → Patterns → Predictor → Recommender
    """
    # Run DB read in thread to avoid blocking loop
    entry = await asyncio.to_thread(get_entry, db, entry_id)
    if not entry:
        return None

    # Run the LangGraph pipeline (Async)
    result = await analyze_journal(entry.content, entry.id)

    # Prepare update data
    update_data = {
        "sentiment": result.get("sentiment"),
        "patterns": result.get("patterns"),
        "prediction": result.get("prediction"),
        "recommendations": result.get("recommendations"),
        "wellness_score": result.get("wellness_score"),
        "updated_at": datetime.utcnow()
    }

    # Run DB write in thread
    collection = get_collection(db)
    updated_doc = await asyncio.to_thread(
        collection.find_one_and_update,
        {"_id": entry_id},
        {"$set": update_data},
        return_document=True
    )
    
    if not updated_doc:
        return None
        
    return JournalEntry(**updated_doc)

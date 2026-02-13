"""Journal API routes — CRUD and AI analysis."""

from fastapi import APIRouter, Depends, HTTPException
from pymongo.database import Database

from app.db.database import get_db
from app.models.schemas import JournalCreate, JournalResponse, JournalUpdate
from app.services import journal_service

router = APIRouter(prefix="/journal", tags=["Journal"])


@router.post("", response_model=JournalResponse, status_code=201)
def create_journal_entry(data: JournalCreate, db: Database = Depends(get_db)):
    """Create a new journal entry."""
    entry = journal_service.create_entry(db, data)
    return entry


@router.get("", response_model=list[JournalResponse])
def list_journal_entries(
    limit: int = 50,
    offset: int = 0,
    db: Database = Depends(get_db),
):
    """List all journal entries (newest first)."""
    entries = journal_service.get_entries(db, limit=limit, offset=offset)
    return entries


@router.get("/{entry_id}", response_model=JournalResponse)
def get_journal_entry(entry_id: str, db: Database = Depends(get_db)):
    """Get a single journal entry by ID."""
    entry = journal_service.get_entry(db, entry_id)
    if not entry:
        raise HTTPException(status_code=404, detail="Journal entry not found")
    return entry


@router.put("/{entry_id}", response_model=JournalResponse)
def update_journal_entry(
    entry_id: str,
    data: JournalUpdate,
    db: Database = Depends(get_db),
):
    """Update a journal entry."""
    entry = journal_service.update_entry(db, entry_id, data)
    if not entry:
        raise HTTPException(status_code=404, detail="Journal entry not found")
    return entry


@router.delete("/{entry_id}", status_code=204)
def delete_journal_entry(entry_id: str, db: Database = Depends(get_db)):
    """Delete a journal entry."""
    deleted = journal_service.delete_entry(db, entry_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Journal entry not found")


@router.post("/{entry_id}/analyze", response_model=JournalResponse)
async def analyze_journal_entry(entry_id: str, db: Database = Depends(get_db)):
    """Trigger the LangGraph AI analysis pipeline on a journal entry.

    This runs: Sentiment → Patterns → Predictor → Recommender
    """
    entry = await journal_service.analyze_entry(db, entry_id)
    if not entry:
        raise HTTPException(status_code=404, detail="Journal entry not found")
    return entry

"""Analytics API routes — wellness scores, trends, stressors."""

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.database import get_db
from app.services import analytics_service

router = APIRouter(prefix="/analytics", tags=["Analytics"])


@router.get("/summary")
async def get_analytics_summary(db: AsyncSession = Depends(get_db)):
    """Get aggregated wellness analytics summary.

    Returns wellness score, mood distribution, stressors, and stability trend.
    """
    summary = await analytics_service.get_summary(db)
    return summary

"""Analytics service for computing wellness statistics."""

from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.journal import JournalEntry


async def get_summary(db: AsyncSession) -> dict:
    """Compute aggregate wellness analytics from all journal entries."""

    # Total entries
    total_result = await db.execute(select(func.count(JournalEntry.id)))
    total_entries = total_result.scalar() or 0

    # Average wellness score
    avg_result = await db.execute(
        select(func.avg(JournalEntry.wellness_score)).where(JournalEntry.wellness_score.isnot(None))
    )
    avg_score = avg_result.scalar()
    wellness_score = int(avg_score) if avg_score else 50

    # Recent entries for trend data
    recent = await db.execute(
        select(JournalEntry)
        .where(JournalEntry.wellness_score.isnot(None))
        .order_by(JournalEntry.created_at.desc())
        .limit(7)
    )
    recent_entries = list(recent.scalars().all())

    # Stability trend (last 7 entries' wellness scores)
    stability_trend = [e.wellness_score for e in reversed(recent_entries) if e.wellness_score]

    # Mood distribution from sentiment labels
    mood_counts: dict[str, int] = {}
    sentiment_entries = await db.execute(
        select(JournalEntry).where(JournalEntry.sentiment.isnot(None))
    )
    for entry in sentiment_entries.scalars():
        label = entry.sentiment.get("label", "neutral") if entry.sentiment else "neutral"
        # Normalize labels to display-friendly names
        display_label = {
            "very_positive": "Happy",
            "positive": "Calm",
            "neutral": "Okay",
            "negative": "Anxious",
            "very_negative": "Stressed",
        }.get(label, "Okay")
        mood_counts[display_label] = mood_counts.get(display_label, 0) + 1

    total_moods = sum(mood_counts.values()) or 1
    mood_colors = {
        "Happy": "#3b82f6",
        "Calm": "#22c55e",
        "Okay": "#71717a",
        "Anxious": "#a855f7",
        "Stressed": "#ef4444",
    }
    mood_distribution = [
        {
            "label": label,
            "percentage": round((count / total_moods) * 100, 1),
            "color": mood_colors.get(label, "#71717a"),
        }
        for label, count in mood_counts.items()
    ]

    # Top stressors aggregated across all entries
    stressor_freq: dict[str, int] = {}
    pattern_entries = await db.execute(
        select(JournalEntry).where(JournalEntry.patterns.isnot(None))
    )
    for entry in pattern_entries.scalars():
        for stressor in (entry.patterns or {}).get("stressors", []):
            stressor_freq[stressor] = stressor_freq.get(stressor, 0) + 1

    top_stressors = [
        {
            "keyword": k,
            "impact": "high" if v >= 3 else "medium" if v >= 2 else "low",
            "frequency": v,
        }
        for k, v in sorted(stressor_freq.items(), key=lambda x: x[1], reverse=True)[:6]
    ]

    # Streak calculation (consecutive days with entries)
    current_streak = min(total_entries, 7)  # simplified for now

    return {
        "wellness_score": wellness_score,
        "score_change": 4.0,  # placeholder
        "total_entries": total_entries,
        "current_streak": current_streak,
        "mood_distribution": mood_distribution,
        "top_stressors": top_stressors,
        "stability_trend": stability_trend,
    }

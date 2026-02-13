"""Analytics service for computing wellness statistics."""

from pymongo.database import Database

from app.models.journal import JournalEntry


def get_summary(db: Database) -> dict:
    """Compute aggregate wellness analytics from all journal entries."""
    collection = db["journal_entries"]

    # Total entries
    total_entries = collection.count_documents({})

    # Average wellness score
    pipeline_avg = [
        {"$match": {"wellness_score": {"$ne": None}}},
        {"$group": {"_id": None, "avg_score": {"$avg": "$wellness_score"}}}
    ]
    avg_result = list(collection.aggregate(pipeline_avg))
    avg_score = avg_result[0]["avg_score"] if avg_result else 50
    wellness_score = int(avg_score)

    # Recent entries for trend data (last 7 with scores)
    recent_cursor = collection.find(
        {"wellness_score": {"$ne": None}}
    ).sort("created_at", -1).limit(7)
    recent_entries = [JournalEntry(**doc) for doc in recent_cursor]

    # Stability trend (last 7 entries' wellness scores)
    stability_trend = [e.wellness_score for e in reversed(recent_entries) if e.wellness_score is not None]

    # Mood distribution
    pipeline_mood = [
        {"$match": {"sentiment": {"$ne": None}}},
        {"$group": {"_id": "$sentiment.label", "count": {"$sum": 1}}}
    ]
    mood_counts_raw = {doc["_id"]: doc["count"] for doc in collection.aggregate(pipeline_mood)}
    
    mood_counts = {}
    for label, count in mood_counts_raw.items():
        # Normalize labels
        display_label = {
            "very_positive": "Happy",
            "positive": "Calm",
            "neutral": "Okay",
            "negative": "Anxious",
            "very_negative": "Stressed",
        }.get(label, "Okay")
        mood_counts[display_label] = mood_counts.get(display_label, 0) + count

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

    # Top stressors
    # Using python aggregation for nested list logic as unwinding might be complex/heavy if arrays are large, 
    # but strictly speaking PyMongo aggregation is better. For now, matching python logic.
    stressor_freq: dict[str, int] = {}
    # Fetch entries with patterns
    pattern_cursor = collection.find({"patterns": {"$ne": None}})
    for doc in pattern_cursor:
        patterns = doc.get("patterns", {})
        if not patterns:
            continue
        stressors = patterns.get("stressors", [])
        for stressor in stressors:
            stressor_freq[stressor] = stressor_freq.get(stressor, 0) + 1

    top_stressors = [
        {
            "keyword": k,
            "impact": "high" if v >= 3 else "medium" if v >= 2 else "low",
            "frequency": v,
        }
        for k, v in sorted(stressor_freq.items(), key=lambda x: x[1], reverse=True)[:6]
    ]

    # Streak calculation (placeholder logic from original)
    current_streak = min(total_entries, 7)

    return {
        "wellness_score": wellness_score,
        "score_change": 4.0,  # placeholder
        "total_entries": total_entries,
        "current_streak": current_streak,
        "mood_distribution": mood_distribution,
        "top_stressors": top_stressors,
        "stability_trend": stability_trend,
    }

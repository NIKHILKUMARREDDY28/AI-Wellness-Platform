"""MongoDB synchronous database connection."""

from pymongo import MongoClient

from app.core.config import settings

client = MongoClient(settings.DATABASE_URL)
db = client.get_database(settings.DATABASE_NAME)


def get_db():
    """Dependency that returns the MongoDB database."""
    return db

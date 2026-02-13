"""Application configuration loaded from .env file."""

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

    # Application
    APP_NAME: str = "AI Wellness Platform"
    APP_ENV: str = "development"
    LOG_LEVEL: str = "INFO"

    # Database
    DATABASE_URL: str

    # Google Gemini
    GOOGLE_API_KEY: str = ""

    # CORS
    CORS_ORIGINS: list[str] = ["*",]


settings = Settings()

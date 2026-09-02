from enum import Enum

from fastapi import status


class ErrorCode(str, Enum):
    AUTHENTICATION_ERROR = "AUTHENTICATION_ERROR"
    AUTHORIZATION_ERROR = "AUTHORIZATION_ERROR"
    CASE_NOT_FOUND = "CASE_NOT_FOUND"
    CHAPTER_NOT_FOUND = "CHAPTER_NOT_FOUND"
    AUDIO_NOT_FOUND = "AUDIO_NOT_FOUND"
    INVALID_SEARCH = "INVALID_SEARCH"
    DOCUMENT_PROCESSING_FAILED = "DOCUMENT_PROCESSING_FAILED"
    TTS_GENERATION_FAILED = "TTS_GENERATION_FAILED"
    STORAGE_ERROR = "STORAGE_ERROR"
    DATABASE_ERROR = "DATABASE_ERROR"
    VALIDATION_ERROR = "VALIDATION_ERROR"
    INTERNAL_ERROR = "INTERNAL_ERROR"


class AppError(Exception):
    def __init__(
        self,
        code: ErrorCode,
        message: str,
        status_code: int = status.HTTP_400_BAD_REQUEST,
        details: object | None = None,
    ) -> None:
        self.code = code
        self.message = message
        self.status_code = status_code
        self.details = details
        super().__init__(message)


def error_payload(code: str, message: str, details: object | None = None) -> dict:
    error: dict = {"code": code, "message": message}
    if details is not None:
        error["details"] = details
    return {"success": False, "error": error}

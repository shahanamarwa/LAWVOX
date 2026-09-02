from fastapi import APIRouter, status
from sqlalchemy.exc import SQLAlchemyError

from app.core.config import settings
from app.database.connection import check_database_connection
from app.schemas.common import SuccessResponse
from app.utils.errors import AppError, ErrorCode

router = APIRouter(tags=["Health"])


@router.get(
    "/health",
    response_model=SuccessResponse[dict],
    summary="Health check",
)
def health_check() -> SuccessResponse[dict]:
    try:
        check_database_connection()
        database_status = "connected"
    except SQLAlchemyError as exc:
        raise AppError(
            code=ErrorCode.DATABASE_ERROR,
            message="Database is unavailable.",
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
        ) from exc

    return SuccessResponse(
        data={
            "status": "healthy",
            "service": settings.app_name,
            "environment": settings.app_env,
            "database": database_status,
        },
        message="Request successful",
    )

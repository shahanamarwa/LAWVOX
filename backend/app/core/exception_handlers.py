from fastapi import FastAPI, HTTPException, Request, status
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from sqlalchemy.exc import SQLAlchemyError

from app.utils.errors import AppError, ErrorCode, error_payload


def register_exception_handlers(app: FastAPI) -> None:
    @app.exception_handler(AppError)
    async def app_error_handler(_request: Request, exc: AppError) -> JSONResponse:
        return JSONResponse(
            status_code=exc.status_code,
            content=error_payload(exc.code.value, exc.message, exc.details),
        )

    @app.exception_handler(HTTPException)
    async def http_exception_handler(_request: Request, exc: HTTPException) -> JSONResponse:
        code = ErrorCode.INTERNAL_ERROR.value
        if exc.status_code == status.HTTP_401_UNAUTHORIZED:
            code = ErrorCode.AUTHENTICATION_ERROR.value
        elif exc.status_code == status.HTTP_403_FORBIDDEN:
            code = ErrorCode.AUTHORIZATION_ERROR.value
        elif exc.status_code == status.HTTP_404_NOT_FOUND:
            code = "NOT_FOUND"
        elif exc.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY:
            code = ErrorCode.VALIDATION_ERROR.value

        detail = exc.detail if isinstance(exc.detail, str) else "Request failed."
        return JSONResponse(
            status_code=exc.status_code,
            content=error_payload(code, detail),
        )

    @app.exception_handler(RequestValidationError)
    async def validation_exception_handler(
        _request: Request, exc: RequestValidationError
    ) -> JSONResponse:
        return JSONResponse(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            content=error_payload(
                ErrorCode.VALIDATION_ERROR.value,
                "Request validation failed.",
                details=exc.errors(),
            ),
        )

    @app.exception_handler(SQLAlchemyError)
    async def database_exception_handler(
        _request: Request, _exc: SQLAlchemyError
    ) -> JSONResponse:
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content=error_payload(
                ErrorCode.DATABASE_ERROR.value,
                "A database error occurred.",
            ),
        )

    @app.exception_handler(Exception)
    async def unhandled_exception_handler(_request: Request, _exc: Exception) -> JSONResponse:
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content=error_payload(
                ErrorCode.INTERNAL_ERROR.value,
                "An unexpected error occurred.",
            ),
        )

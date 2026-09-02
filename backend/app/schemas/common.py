from typing import Any, Generic, TypeVar

from pydantic import BaseModel, Field

T = TypeVar("T")


class SuccessResponse(BaseModel, Generic[T]):
    success: bool = True
    data: T | None = None
    message: str = "Request successful"


class ErrorBody(BaseModel):
    code: str
    message: str
    details: Any | None = Field(default=None)


class ErrorResponse(BaseModel):
    success: bool = False
    error: ErrorBody

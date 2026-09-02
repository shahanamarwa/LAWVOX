from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.health import health_check
from app.api.router import api_router
from app.core.config import settings
from app.core.exception_handlers import register_exception_handlers


def create_app() -> FastAPI:
    application = FastAPI(
        title=settings.app_name,
        description="LAWVOX Legal AudioBook API",
        version="0.1.0",
        docs_url="/docs",
        redoc_url="/redoc",
        openapi_url="/openapi.json",
    )

    application.add_middleware(
        CORSMiddleware,
        allow_origins=settings.cors_origin_list,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    register_exception_handlers(application)
    application.include_router(api_router, prefix="/api")

    application.add_api_route(
        "/health",
        health_check,
        methods=["GET"],
        include_in_schema=False,
    )

    return application


app = create_app()

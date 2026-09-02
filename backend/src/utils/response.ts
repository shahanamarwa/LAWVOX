import { Response } from 'express';
import { ApiResponse } from '../types';

export class AppResponse {
  static success<T>(res: Response, data: T, status: number = 200, message?: string): Response {
    const payload: ApiResponse<T> = {
      success: true,
      data,
    };
    if (message) {
      payload.message = message;
    }
    return res.status(status).json(payload);
  }

  static created<T>(res: Response, data: T, message?: string): Response {
    return this.success(res, data, 201, message);
  }

  static error(
    res: Response,
    message: string,
    status: number = 500,
    details?: unknown
  ): Response {
    const payload: ApiResponse = {
      success: false,
      error: {
        message,
        ...(details ? { details } : {}),
      },
    };
    return res.status(status).json(payload);
  }

  static badRequest(res: Response, message: string = 'Bad request', details?: unknown): Response {
    return this.error(res, message, 400, details);
  }

  static notFound(res: Response, message: string = 'Resource not found'): Response {
    return this.error(res, message, 404);
  }

  static conflict(res: Response, message: string = 'Resource conflict'): Response {
    return this.error(res, message, 409);
  }
}

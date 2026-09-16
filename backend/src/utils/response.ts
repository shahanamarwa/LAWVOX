// backend/src/utils/response.ts

import { Response } from 'express';
import { ApiResponse } from '../types';

/**
 * Unified JSON response builder for all API endpoints
 */
export class ResponseBuilder {
  static success<T>(res: Response, data: T, message: string = 'Success', statusCode: number = 200): Response {
    const payload: ApiResponse<T> = {
      success: true,
      message,
      data,
      status: statusCode,
    };
    return res.status(statusCode).json(payload);
  }

  static error(res: Response, error: string, statusCode: number = 400, message?: string): Response {
    const payload: ApiResponse = {
      success: false,
      message: message || error,
      error,
      status: statusCode,
    };
    return res.status(statusCode).json(payload);
  }

  static notFound(res: Response, message: string = 'Resource not found'): Response {
    return this.error(res, 'NOT_FOUND', 404, message);
  }

  static badRequest(res: Response, message: string = 'Bad request'): Response {
    return this.error(res, 'BAD_REQUEST', 400, message);
  }

  static serverError(res: Response, message: string = 'Internal server error'): Response {
    return this.error(res, 'INTERNAL_SERVER_ERROR', 500, message);
  }
}

// backend/src/middleware/error.middleware.ts

import { Request, Response, NextFunction } from 'express';
import { ResponseBuilder } from '../utils/response';

export function errorMiddleware(err: any, req: Request, res: Response, next: NextFunction) {
  console.error('[Error]', err);

  const statusCode = err.statusCode || err.status || 500;
  const message = err.message || 'Internal server error';

  ResponseBuilder.error(res, message, statusCode);
}

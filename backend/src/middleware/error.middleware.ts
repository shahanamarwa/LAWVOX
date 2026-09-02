import { Request, Response, NextFunction } from 'express';
import { AppResponse } from '../utils/response';

export interface CustomError extends Error {
  statusCode?: number;
  status?: number;
  code?: string;
}

export function errorMiddleware(
  err: CustomError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
): void {
  console.error(`[Error] ${req.method} ${req.originalUrl}:`, err);

  // SQLite Constraint error handling
  if (err.code === 'SQLITE_CONSTRAINT_UNIQUE' || err.message?.includes('UNIQUE constraint failed')) {
    AppResponse.conflict(res, 'A record with this unique identifier already exists.');
    return;
  }

  if (err.code === 'SQLITE_CONSTRAINT_FOREIGNKEY' || err.message?.includes('FOREIGN KEY constraint failed')) {
    AppResponse.badRequest(res, 'Referenced parent record does not exist.');
    return;
  }

  const statusCode = err.statusCode || err.status || 500;
  const message = statusCode === 500 && process.env.NODE_ENV === 'production'
    ? 'An unexpected server error occurred.'
    : err.message || 'Internal Server Error';

  AppResponse.error(res, message, statusCode);
}

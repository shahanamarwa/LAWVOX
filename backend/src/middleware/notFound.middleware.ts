import { Request, Response } from 'express';
import { AppResponse } from '../utils/response';

export function notFoundMiddleware(req: Request, res: Response): void {
  AppResponse.notFound(res, `Route '${req.method} ${req.originalUrl}' not found`);
}

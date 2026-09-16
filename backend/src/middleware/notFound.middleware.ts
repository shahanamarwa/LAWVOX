// backend/src/middleware/notFound.middleware.ts

import { Request, Response } from 'express';
import { ResponseBuilder } from '../utils/response';

export function notFoundMiddleware(req: Request, res: Response) {
  ResponseBuilder.notFound(res, `Endpoint not found: ${req.method} ${req.path}`);
}

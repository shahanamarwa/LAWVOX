import { Request, Response, NextFunction } from 'express';
import { HistoryService } from '../services/history.service';
import { CasesService } from '../services/cases.service';
import { AppResponse } from '../utils/response';

export class HistoryController {
  /**
   * GET /api/history
   * Return listening history
   */
  static async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const history = HistoryService.getHistory();
      AppResponse.success(res, history);
    } catch (error) {
      next(error);
    }
  }

  /**
   * POST /api/history
   * Create or record listening history record
   */
  static async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { case_id, duration_listened, completion_percentage, last_position } = req.body;

      if (!case_id || typeof case_id !== 'string') {
        AppResponse.badRequest(res, 'Field "case_id" is required.');
        return;
      }

      const caseExists = CasesService.getCaseById(case_id);
      if (!caseExists) {
        AppResponse.notFound(res, `Cannot record history for non-existent case ID '${case_id}'`);
        return;
      }

      const record = HistoryService.recordHistory({
        case_id,
        duration_listened: duration_listened !== undefined ? Number(duration_listened) : 0,
        completion_percentage: completion_percentage !== undefined ? Number(completion_percentage) : 0,
        last_position: last_position !== undefined ? Number(last_position) : 0,
      });

      AppResponse.created(res, record, 'Listening history recorded successfully');
    } catch (error) {
      next(error);
    }
  }

  /**
   * PUT /api/history/:id
   * Update listening progress
   */
  static async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const historyId = parseInt(id, 10);
      if (isNaN(historyId)) {
        AppResponse.badRequest(res, 'History ID must be a valid number.');
        return;
      }

      const existing = HistoryService.getHistoryById(historyId);
      if (!existing) {
        AppResponse.notFound(res, `History record '${id}' not found`);
        return;
      }

      const { duration_listened, completion_percentage, last_position } = req.body;
      const updated = HistoryService.updateHistory(historyId, {
        duration_listened: duration_listened !== undefined ? Number(duration_listened) : undefined,
        completion_percentage: completion_percentage !== undefined ? Number(completion_percentage) : undefined,
        last_position: last_position !== undefined ? Number(last_position) : undefined,
      });

      AppResponse.success(res, updated, 200, 'Listening history updated successfully');
    } catch (error) {
      next(error);
    }
  }

  /**
   * DELETE /api/history/:id
   * Delete history record
   */
  static async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const historyId = parseInt(id, 10);
      if (isNaN(historyId)) {
        AppResponse.badRequest(res, 'History ID must be a valid number.');
        return;
      }

      const deleted = HistoryService.deleteHistory(historyId);
      if (!deleted) {
        AppResponse.notFound(res, `History record '${id}' not found`);
        return;
      }

      AppResponse.success(res, { deleted: true, id: historyId }, 200, 'History record deleted successfully');
    } catch (error) {
      next(error);
    }
  }
}

import { Request, Response, NextFunction } from 'express';
import { DashboardService } from '../services/dashboard.service';
import { AppResponse } from '../utils/response';

export class DashboardController {
  /**
   * GET /api/dashboard
   * Return dashboard feed, dynamic stats, continue listening, categories, etc.
   */
  static async getDashboard(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const data = DashboardService.getDashboardData();
      AppResponse.success(res, data);
    } catch (error) {
      next(error);
    }
  }
}

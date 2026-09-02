import { Request, Response, NextFunction } from 'express';
import { CasesService } from '../services/cases.service';
import { AppResponse } from '../utils/response';

export class CasesController {
  /**
   * GET /api/cases
   * Return all cases with optional filters
   */
  static async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { court, year, category, judge } = req.query;
      const cases = CasesService.getAllCases({
        court: court as string,
        year: year ? parseInt(year as string, 10) : undefined,
        category: category as string,
        judge: judge as string,
      });
      AppResponse.success(res, cases);
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /api/cases/search?q=...
   * Search cases
   */
  static async search(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { q, court, year, category, judge } = req.query;
      const results = CasesService.searchCases({
        q: q as string,
        court: court as string,
        year: year ? parseInt(year as string, 10) : undefined,
        category: category as string,
        judge: judge as string,
      });
      AppResponse.success(res, results);
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /api/cases/:id
   * Return single case
   */
  static async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const caseItem = CasesService.getCaseById(id);
      if (!caseItem) {
        AppResponse.notFound(res, `Case with ID '${id}' not found`);
        return;
      }
      AppResponse.success(res, caseItem);
    } catch (error) {
      next(error);
    }
  }

  /**
   * POST /api/cases
   * Create a new case
   */
  static async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const {
        case_name,
        court,
        year,
        citation,
        category,
        judge,
        constitutional_provisions,
        summary,
        audio_url,
      } = req.body;

      if (!case_name || typeof case_name !== 'string' || case_name.trim() === '') {
        AppResponse.badRequest(res, 'Field "case_name" is required and cannot be empty.');
        return;
      }

      if (!court || typeof court !== 'string' || court.trim() === '') {
        AppResponse.badRequest(res, 'Field "court" is required and cannot be empty.');
        return;
      }

      if (year === undefined || isNaN(Number(year))) {
        AppResponse.badRequest(res, 'Field "year" is required and must be a valid number.');
        return;
      }

      if (!category || typeof category !== 'string' || category.trim() === '') {
        AppResponse.badRequest(res, 'Field "category" is required.');
        return;
      }

      const created = CasesService.createCase({
        case_name: case_name.trim(),
        court: court.trim(),
        year: Number(year),
        citation,
        category: category.trim(),
        judge,
        constitutional_provisions,
        summary,
        audio_url,
      });

      AppResponse.created(res, created, 'Case created successfully');
    } catch (error) {
      next(error);
    }
  }

  /**
   * PUT /api/cases/:id
   * Update a case
   */
  static async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const existing = CasesService.getCaseById(id);
      if (!existing) {
        AppResponse.notFound(res, `Case with ID '${id}' not found`);
        return;
      }

      if (req.body.year !== undefined && isNaN(Number(req.body.year))) {
        AppResponse.badRequest(res, 'Field "year" must be a valid number.');
        return;
      }

      const updated = CasesService.updateCase(id, {
        ...req.body,
        year: req.body.year !== undefined ? Number(req.body.year) : undefined,
      });

      AppResponse.success(res, updated, 200, 'Case updated successfully');
    } catch (error) {
      next(error);
    }
  }

  /**
   * DELETE /api/cases/:id
   * Delete a case
   */
  static async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const deleted = CasesService.deleteCase(id);
      if (!deleted) {
        AppResponse.notFound(res, `Case with ID '${id}' not found`);
        return;
      }
      AppResponse.success(res, { deleted: true, id }, 200, 'Case deleted successfully');
    } catch (error) {
      next(error);
    }
  }
}

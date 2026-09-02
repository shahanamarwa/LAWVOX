import { Request, Response, NextFunction } from 'express';
import { SearchesService } from '../services/searches.service';
import { CasesService } from '../services/cases.service';
import { AppResponse } from '../utils/response';

export class SearchesController {
  /**
   * GET /api/searches
   * Return recent search queries
   */
  static async getRecent(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 10;
      const searches = SearchesService.getRecentSearches(isNaN(limit) ? 10 : limit);
      AppResponse.success(res, searches);
    } catch (error) {
      next(error);
    }
  }

  /**
   * POST /api/searches
   * Record a search query
   */
  static async addSearch(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { query } = req.body;
      if (!query || typeof query !== 'string' || query.trim() === '') {
        AppResponse.badRequest(res, 'Field "query" is required.');
        return;
      }

      const search = SearchesService.addSearch(query);
      AppResponse.created(res, search, 'Search query recorded');
    } catch (error) {
      next(error);
    }
  }

  /**
   * DELETE /api/searches/:id
   * Delete a search query
   */
  static async deleteSearch(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const searchId = parseInt(id, 10);
      if (isNaN(searchId)) {
        AppResponse.badRequest(res, 'Search ID must be a valid number.');
        return;
      }

      const deleted = SearchesService.deleteSearch(searchId);
      if (!deleted) {
        AppResponse.notFound(res, `Search query with ID '${id}' not found`);
        return;
      }

      AppResponse.success(res, { deleted: true, id: searchId }, 200, 'Search query deleted');
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /api/search?q=keyword
   * Global search endpoint matching requirement 18
   */
  static async globalSearch(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { q, court, year, category, judge } = req.query;
      const queryString = (q as string) || '';

      // Optionally record non-empty searches
      if (queryString.trim() !== '') {
        try {
          SearchesService.addSearch(queryString.trim());
        } catch {
          // Ignore search recording errors on search query
        }
      }

      const results = CasesService.searchCases({
        q: queryString,
        court: court as string,
        year: year ? parseInt(year as string, 10) : undefined,
        category: category as string,
        judge: judge as string,
      });

      // Format clean response matching Requirement 18:
      // case name, year, court, citation, summary, judge, category, constitutional provisions
      const formatted = results.map((c) => ({
        id: c.id,
        case_name: c.case_name,
        year: c.year,
        court: c.court,
        citation: c.citation,
        summary: c.summary,
        judge: c.judge,
        category: c.category,
        constitutional_provisions: c.constitutional_provisions,
        audio_url: c.audio_url,
      }));

      AppResponse.success(res, formatted);
    } catch (error) {
      next(error);
    }
  }
}

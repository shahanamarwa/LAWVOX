import { Request, Response, NextFunction } from 'express';
import { BookmarksService } from '../services/bookmarks.service';
import { CasesService } from '../services/cases.service';
import { AppResponse } from '../utils/response';

export class BookmarksController {
  /**
   * GET /api/bookmarks
   * Return all bookmarked cases
   */
  static async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const bookmarks = BookmarksService.getBookmarks();
      AppResponse.success(res, bookmarks);
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /api/bookmarks/:caseId
   * Check whether a specific case is bookmarked
   */
  static async checkStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { caseId } = req.params;
      const isBookmarked = BookmarksService.isBookmarked(caseId);
      const bookmark = isBookmarked ? BookmarksService.getBookmarkByCaseId(caseId) : null;
      AppResponse.success(res, {
        caseId,
        bookmarked: isBookmarked,
        bookmark,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * POST /api/bookmarks/:caseId
   * Create a bookmark
   */
  static async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { caseId } = req.params;
      const caseExists = CasesService.getCaseById(caseId);
      if (!caseExists) {
        AppResponse.notFound(res, `Cannot bookmark non-existent case ID '${caseId}'`);
        return;
      }

      const bookmark = BookmarksService.addBookmark(caseId);
      AppResponse.created(res, bookmark, 'Case bookmarked successfully');
    } catch (error) {
      next(error);
    }
  }

  /**
   * DELETE /api/bookmarks/:caseId
   * Remove a bookmark
   */
  static async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { caseId } = req.params;
      const removed = BookmarksService.removeBookmark(caseId);
      if (!removed) {
        AppResponse.notFound(res, `Bookmark for case '${caseId}' was not found`);
        return;
      }
      AppResponse.success(res, { removed: true, caseId }, 200, 'Bookmark removed successfully');
    } catch (error) {
      next(error);
    }
  }
}

import { Request, Response, NextFunction } from 'express';
import { NotesService } from '../services/notes.service';
import { CasesService } from '../services/cases.service';
import { AppResponse } from '../utils/response';

export class NotesController {
  /**
   * GET /api/notes
   * Return all notes or filter by caseId
   */
  static async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { case_id, caseId } = req.query;
      const targetCaseId = (case_id || caseId) as string | undefined;

      const notes = targetCaseId
        ? NotesService.getNotesByCaseId(targetCaseId)
        : NotesService.getAllNotes();

      AppResponse.success(res, notes);
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /api/notes/:id
   * Return single note
   */
  static async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const noteId = parseInt(id, 10);
      if (isNaN(noteId)) {
        AppResponse.badRequest(res, 'Note ID must be a valid number.');
        return;
      }

      const note = NotesService.getNoteById(noteId);
      if (!note) {
        AppResponse.notFound(res, `Note '${id}' not found`);
        return;
      }

      AppResponse.success(res, note);
    } catch (error) {
      next(error);
    }
  }

  /**
   * POST /api/notes
   * Create a note
   */
  static async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { title, case_id, caseId, content } = req.body;
      const targetCaseId = case_id || caseId;

      if (!title || typeof title !== 'string' || title.trim() === '') {
        AppResponse.badRequest(res, 'Field "title" is required.');
        return;
      }

      if (!targetCaseId || typeof targetCaseId !== 'string') {
        AppResponse.badRequest(res, 'Field "case_id" is required.');
        return;
      }

      if (!content || typeof content !== 'string' || content.trim() === '') {
        AppResponse.badRequest(res, 'Field "content" is required.');
        return;
      }

      const caseExists = CasesService.getCaseById(targetCaseId);
      if (!caseExists) {
        AppResponse.notFound(res, `Cannot create note for non-existent case ID '${targetCaseId}'`);
        return;
      }

      const note = NotesService.createNote({
        title: title.trim(),
        case_id: targetCaseId.trim(),
        content: content.trim(),
      });

      AppResponse.created(res, note, 'Note created successfully');
    } catch (error) {
      next(error);
    }
  }

  /**
   * PUT /api/notes/:id
   * Update a note
   */
  static async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const noteId = parseInt(id, 10);
      if (isNaN(noteId)) {
        AppResponse.badRequest(res, 'Note ID must be a valid number.');
        return;
      }

      const existing = NotesService.getNoteById(noteId);
      if (!existing) {
        AppResponse.notFound(res, `Note '${id}' not found`);
        return;
      }

      const { title, content } = req.body;
      const updated = NotesService.updateNote(noteId, {
        title: title !== undefined ? String(title).trim() : undefined,
        content: content !== undefined ? String(content).trim() : undefined,
      });

      AppResponse.success(res, updated, 200, 'Note updated successfully');
    } catch (error) {
      next(error);
    }
  }

  /**
   * DELETE /api/notes/:id
   * Delete a note
   */
  static async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const noteId = parseInt(id, 10);
      if (isNaN(noteId)) {
        AppResponse.badRequest(res, 'Note ID must be a valid number.');
        return;
      }

      const deleted = NotesService.deleteNote(noteId);
      if (!deleted) {
        AppResponse.notFound(res, `Note '${id}' not found`);
        return;
      }

      AppResponse.success(res, { deleted: true, id: noteId }, 200, 'Note deleted successfully');
    } catch (error) {
      next(error);
    }
  }
}

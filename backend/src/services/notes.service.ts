import { db } from '../config/database';
import { Note, CreateNoteInput, UpdateNoteInput } from '../types';

export class NotesService {
  /**
   * Get all notes joined with case information
   */
  static getAllNotes(): Note[] {
    const sql = `
      SELECT 
        n.id,
        n.title,
        n.case_id,
        n.content,
        n.created_at,
        n.updated_at,
        c.case_name,
        c.citation
      FROM notes n
      JOIN cases c ON n.case_id = c.id
      ORDER BY n.updated_at DESC
    `;
    return db.prepare(sql).all() as Note[];
  }

  /**
   * Get note by ID
   */
  static getNoteById(id: number): Note | null {
    const sql = `
      SELECT 
        n.id,
        n.title,
        n.case_id,
        n.content,
        n.created_at,
        n.updated_at,
        c.case_name,
        c.citation
      FROM notes n
      JOIN cases c ON n.case_id = c.id
      WHERE n.id = ?
    `;
    const row = db.prepare(sql).get(id);
    return (row as Note) || null;
  }

  /**
   * Get notes for a specific case
   */
  static getNotesByCaseId(caseId: string): Note[] {
    const sql = `
      SELECT 
        n.id,
        n.title,
        n.case_id,
        n.content,
        n.created_at,
        n.updated_at,
        c.case_name,
        c.citation
      FROM notes n
      JOIN cases c ON n.case_id = c.id
      WHERE n.case_id = ?
      ORDER BY n.updated_at DESC
    `;
    return db.prepare(sql).all(caseId) as Note[];
  }

  /**
   * Create a new note
   */
  static createNote(input: CreateNoteInput): Note {
    const caseExists = db.prepare('SELECT id FROM cases WHERE id = ?').get(input.case_id);
    if (!caseExists) {
      throw new Error(`Case with ID '${input.case_id}' does not exist.`);
    }

    const info = db.prepare(`
      INSERT INTO notes (title, case_id, content)
      VALUES (?, ?, ?)
    `).run(input.title, input.case_id, input.content);

    return this.getNoteById(Number(info.lastInsertRowid))!;
  }

  /**
   * Update a note
   */
  static updateNote(id: number, input: UpdateNoteInput): Note | null {
    const existing = this.getNoteById(id);
    if (!existing) {
      return null;
    }

    const updates: string[] = [];
    const params: string[] = [];

    if (input.title !== undefined) {
      updates.push('title = ?');
      params.push(input.title);
    }
    if (input.content !== undefined) {
      updates.push('content = ?');
      params.push(input.content);
    }

    if (updates.length === 0) {
      return existing;
    }

    updates.push('updated_at = CURRENT_TIMESTAMP');
    const sql = `UPDATE notes SET ${updates.join(', ')} WHERE id = ?`;
    db.prepare(sql).run(...params, id);

    return this.getNoteById(id);
  }

  /**
   * Delete a note
   */
  static deleteNote(id: number): boolean {
    const res = db.prepare('DELETE FROM notes WHERE id = ?').run(id);
    return res.changes > 0;
  }
}

import { db } from '../config/database';
import { Bookmark } from '../types';

export class BookmarksService {
  /**
   * Get all bookmarks joined with case details
   */
  static getBookmarks(): Bookmark[] {
    const sql = `
      SELECT 
        b.id,
        b.case_id,
        b.created_at,
        c.case_name,
        c.court,
        c.year,
        c.citation,
        c.category,
        c.judge,
        c.summary,
        c.audio_url
      FROM bookmarks b
      JOIN cases c ON b.case_id = c.id
      ORDER BY b.created_at DESC
    `;
    return db.prepare(sql).all() as Bookmark[];
  }

  /**
   * Check if a case is bookmarked
   */
  static isBookmarked(caseId: string): boolean {
    const row = db.prepare('SELECT id FROM bookmarks WHERE case_id = ?').get(caseId);
    return !!row;
  }

  /**
   * Get bookmark record for a case
   */
  static getBookmarkByCaseId(caseId: string): Bookmark | null {
    const sql = `
      SELECT 
        b.id,
        b.case_id,
        b.created_at,
        c.case_name,
        c.court,
        c.year,
        c.citation,
        c.category,
        c.judge,
        c.summary,
        c.audio_url
      FROM bookmarks b
      JOIN cases c ON b.case_id = c.id
      WHERE b.case_id = ?
    `;
    const row = db.prepare(sql).get(caseId);
    return (row as Bookmark) || null;
  }

  /**
   * Add a case to bookmarks
   */
  static addBookmark(caseId: string): Bookmark {
    // Check if case exists
    const caseExists = db.prepare('SELECT id FROM cases WHERE id = ?').get(caseId);
    if (!caseExists) {
      throw new Error(`Case with ID '${caseId}' does not exist.`);
    }

    // Insert or ignore
    db.prepare('INSERT OR IGNORE INTO bookmarks (case_id) VALUES (?)').run(caseId);
    return this.getBookmarkByCaseId(caseId)!;
  }

  /**
   * Remove a bookmark
   */
  static removeBookmark(caseId: string): boolean {
    const res = db.prepare('DELETE FROM bookmarks WHERE case_id = ?').run(caseId);
    return res.changes > 0;
  }
}

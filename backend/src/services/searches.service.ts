import { db } from '../config/database';
import { RecentSearch } from '../types';

export class SearchesService {
  /**
   * Get recent search queries
   */
  static getRecentSearches(limit: number = 10): RecentSearch[] {
    const sql = 'SELECT * FROM recent_searches ORDER BY created_at DESC LIMIT ?';
    return db.prepare(sql).all(limit) as RecentSearch[];
  }

  /**
   * Add a search query to history
   */
  static addSearch(query: string): RecentSearch {
    const trimmed = query.trim();
    if (!trimmed) {
      throw new Error('Search query cannot be empty.');
    }

    // Remove duplicates of the same query before adding to keep it fresh
    db.prepare('DELETE FROM recent_searches WHERE LOWER(query) = LOWER(?)').run(trimmed);

    const info = db.prepare('INSERT INTO recent_searches (query) VALUES (?)').run(trimmed);
    const row = db.prepare('SELECT * FROM recent_searches WHERE id = ?').get(info.lastInsertRowid);
    return row as RecentSearch;
  }

  /**
   * Delete a search query by ID
   */
  static deleteSearch(id: number): boolean {
    const res = db.prepare('DELETE FROM recent_searches WHERE id = ?').run(id);
    return res.changes > 0;
  }

  /**
   * Clear all search history
   */
  static clearSearches(): boolean {
    const res = db.prepare('DELETE FROM recent_searches').run();
    return res.changes > 0;
  }
}

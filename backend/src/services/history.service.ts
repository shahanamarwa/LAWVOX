import { db } from '../config/database';
import { ListeningHistory, CreateHistoryInput, UpdateHistoryInput } from '../types';

export class HistoryService {
  /**
   * Get all listening history joined with case details
   */
  static getHistory(): ListeningHistory[] {
    const sql = `
      SELECT 
        h.id,
        h.case_id,
        h.duration_listened,
        h.completion_percentage,
        h.last_position,
        h.listened_at,
        c.case_name,
        c.court,
        c.year,
        c.citation,
        c.category,
        c.audio_url
      FROM listening_history h
      JOIN cases c ON h.case_id = c.id
      ORDER BY h.listened_at DESC
    `;
    return db.prepare(sql).all() as ListeningHistory[];
  }

  /**
   * Get single history item by ID
   */
  static getHistoryById(id: number): ListeningHistory | null {
    const sql = `
      SELECT 
        h.id,
        h.case_id,
        h.duration_listened,
        h.completion_percentage,
        h.last_position,
        h.listened_at,
        c.case_name,
        c.court,
        c.year,
        c.citation,
        c.category,
        c.audio_url
      FROM listening_history h
      JOIN cases c ON h.case_id = c.id
      WHERE h.id = ?
    `;
    const row = db.prepare(sql).get(id);
    return (row as ListeningHistory) || null;
  }

  /**
   * Record or update listening history for a case
   */
  static recordHistory(input: CreateHistoryInput): ListeningHistory {
    const caseExists = db.prepare('SELECT id FROM cases WHERE id = ?').get(input.case_id);
    if (!caseExists) {
      throw new Error(`Case with ID '${input.case_id}' does not exist.`);
    }

    // Check if there is already a recent history record for this case to update or create new
    const existing = db
      .prepare('SELECT id FROM listening_history WHERE case_id = ? ORDER BY listened_at DESC LIMIT 1')
      .get(input.case_id) as { id: number } | undefined;

    const duration = input.duration_listened ?? 0;
    const completion = input.completion_percentage ?? 0.0;
    const position = input.last_position ?? 0;

    let historyId: number;

    if (existing) {
      db.prepare(`
        UPDATE listening_history 
        SET duration_listened = ?, completion_percentage = ?, last_position = ?, listened_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `).run(duration, completion, position, existing.id);
      historyId = existing.id;
    } else {
      const info = db.prepare(`
        INSERT INTO listening_history (case_id, duration_listened, completion_percentage, last_position)
        VALUES (?, ?, ?, ?)
      `).run(input.case_id, duration, completion, position);
      historyId = Number(info.lastInsertRowid);
    }

    return this.getHistoryById(historyId)!;
  }

  /**
   * Update listening history record by ID
   */
  static updateHistory(id: number, input: UpdateHistoryInput): ListeningHistory | null {
    const existing = this.getHistoryById(id);
    if (!existing) {
      return null;
    }

    const updates: string[] = [];
    const params: (number)[] = [];

    if (input.duration_listened !== undefined) {
      updates.push('duration_listened = ?');
      params.push(input.duration_listened);
    }
    if (input.completion_percentage !== undefined) {
      updates.push('completion_percentage = ?');
      params.push(input.completion_percentage);
    }
    if (input.last_position !== undefined) {
      updates.push('last_position = ?');
      params.push(input.last_position);
    }

    updates.push('listened_at = CURRENT_TIMESTAMP');
    params.push(id);

    const sql = `UPDATE listening_history SET ${updates.join(', ')} WHERE id = ?`;
    db.prepare(sql).run(...params);

    return this.getHistoryById(id);
  }

  /**
   * Delete listening history by ID
   */
  static deleteHistory(id: number): boolean {
    const res = db.prepare('DELETE FROM listening_history WHERE id = ?').run(id);
    return res.changes > 0;
  }

  /**
   * Get latest active case being listened to (for Continue Listening)
   */
  static getLatestListening(): ListeningHistory | null {
    const sql = `
      SELECT 
        h.id,
        h.case_id,
        h.duration_listened,
        h.completion_percentage,
        h.last_position,
        h.listened_at,
        c.case_name,
        c.court,
        c.year,
        c.citation,
        c.category,
        c.audio_url
      FROM listening_history h
      JOIN cases c ON h.case_id = c.id
      ORDER BY h.listened_at DESC
      LIMIT 1
    `;
    const row = db.prepare(sql).get();
    return (row as ListeningHistory) || null;
  }
}

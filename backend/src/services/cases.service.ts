import { db } from '../config/database';
import { Case, CreateCaseInput, UpdateCaseInput, CaseFilterOptions } from '../types';

export class CasesService {
  /**
   * Get all cases with optional filters
   */
  static getAllCases(filters?: CaseFilterOptions): Case[] {
    let sql = 'SELECT * FROM cases WHERE 1=1';
    const params: (string | number)[] = [];

    if (filters?.court) {
      sql += ' AND LOWER(court) LIKE LOWER(?)';
      params.push(`%${filters.court}%`);
    }

    if (filters?.year) {
      sql += ' AND year = ?';
      params.push(filters.year);
    }

    if (filters?.category) {
      const normalizedCat = filters.category.replace(/-/g, ' ');
      sql += ' AND (LOWER(category) LIKE LOWER(?) OR LOWER(category) LIKE LOWER(?))';
      params.push(`%${filters.category}%`, `%${normalizedCat}%`);
    }

    if (filters?.judge) {
      sql += ' AND LOWER(judge) LIKE LOWER(?)';
      params.push(`%${filters.judge}%`);
    }

    if (filters?.doctrine) {
      sql += ' AND LOWER(doctrine) LIKE LOWER(?)';
      params.push(`%${filters.doctrine}%`);
    }

    sql += ' ORDER BY year DESC, case_name ASC';
    return db.prepare(sql).all(...params) as Case[];
  }

  /**
   * Get a single case by ID
   */
  static getCaseById(id: string): Case | null {
    const row = db.prepare('SELECT * FROM cases WHERE id = ?').get(id);
    return (row as Case) || null;
  }

  /**
   * Search cases across multiple fields with parameterized query
   */
  static searchCases(options: CaseFilterOptions): Case[] {
    let sql = 'SELECT * FROM cases WHERE 1=1';
    const params: (string | number)[] = [];

    if (options.q && options.q.trim() !== '') {
      const term = `%${options.q.trim()}%`;
      sql += ` AND (
        LOWER(case_name) LIKE LOWER(?) OR
        LOWER(court) LIKE LOWER(?) OR
        LOWER(category) LIKE LOWER(?) OR
        LOWER(judge) LIKE LOWER(?) OR
        LOWER(constitutional_provisions) LIKE LOWER(?) OR
        LOWER(summary) LIKE LOWER(?) OR
        LOWER(COALESCE(legal_issue, '')) LIKE LOWER(?) OR
        LOWER(COALESCE(decision, '')) LIKE LOWER(?) OR
        LOWER(COALESCE(keywords, '')) LIKE LOWER(?) OR
        LOWER(COALESCE(doctrine, '')) LIKE LOWER(?)
      )`;
      params.push(term, term, term, term, term, term, term, term, term, term);
    }

    if (options.court) {
      sql += ' AND LOWER(court) LIKE LOWER(?)';
      params.push(`%${options.court}%`);
    }

    if (options.year) {
      sql += ' AND year = ?';
      params.push(options.year);
    }

    if (options.category) {
      const normalizedCat = options.category.replace(/-/g, ' ');
      sql += ' AND (LOWER(category) LIKE LOWER(?) OR LOWER(category) LIKE LOWER(?))';
      params.push(`%${options.category}%`, `%${normalizedCat}%`);
    }

    if (options.judge) {
      sql += ' AND LOWER(judge) LIKE LOWER(?)';
      params.push(`%${options.judge}%`);
    }

    if (options.doctrine) {
      sql += ' AND LOWER(doctrine) LIKE LOWER(?)';
      params.push(`%${options.doctrine}%`);
    }

    sql += ' ORDER BY year DESC, case_name ASC';
    return db.prepare(sql).all(...params) as Case[];
  }

  /**
   * Create a new case
   */
  static createCase(input: CreateCaseInput): Case {
    const id = input.id || input.case_name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    
    const stmt = db.prepare(`
      INSERT INTO cases (
        id, case_name, court, year, citation, category, judge, constitutional_provisions,
        summary, legal_issue, decision, keywords, bench_size, doctrine, audio_url
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    stmt.run(
      id,
      input.case_name,
      input.court,
      input.year,
      input.citation || null,
      input.category,
      input.judge || null,
      input.constitutional_provisions || null,
      input.summary || null,
      input.legal_issue || null,
      input.decision || null,
      input.keywords || null,
      input.bench_size || null,
      input.doctrine || null,
      input.audio_url || null
    );

    return this.getCaseById(id)!;
  }

  /**
   * Update an existing case
   */
  static updateCase(id: string, input: UpdateCaseInput): Case | null {
    const existing = this.getCaseById(id);
    if (!existing) {
      return null;
    }

    const updates: string[] = [];
    const params: (string | number | null)[] = [];

    if (input.case_name !== undefined) {
      updates.push('case_name = ?');
      params.push(input.case_name);
    }
    if (input.court !== undefined) {
      updates.push('court = ?');
      params.push(input.court);
    }
    if (input.year !== undefined) {
      updates.push('year = ?');
      params.push(input.year);
    }
    if (input.citation !== undefined) {
      updates.push('citation = ?');
      params.push(input.citation);
    }
    if (input.category !== undefined) {
      updates.push('category = ?');
      params.push(input.category);
    }
    if (input.judge !== undefined) {
      updates.push('judge = ?');
      params.push(input.judge);
    }
    if (input.constitutional_provisions !== undefined) {
      updates.push('constitutional_provisions = ?');
      params.push(input.constitutional_provisions);
    }
    if (input.summary !== undefined) {
      updates.push('summary = ?');
      params.push(input.summary);
    }
    if (input.legal_issue !== undefined) {
      updates.push('legal_issue = ?');
      params.push(input.legal_issue);
    }
    if (input.decision !== undefined) {
      updates.push('decision = ?');
      params.push(input.decision);
    }
    if (input.keywords !== undefined) {
      updates.push('keywords = ?');
      params.push(input.keywords);
    }
    if (input.bench_size !== undefined) {
      updates.push('bench_size = ?');
      params.push(input.bench_size);
    }
    if (input.doctrine !== undefined) {
      updates.push('doctrine = ?');
      params.push(input.doctrine);
    }
    if (input.audio_url !== undefined) {
      updates.push('audio_url = ?');
      params.push(input.audio_url);
    }

    if (updates.length === 0) {
      return existing;
    }

    updates.push('updated_at = CURRENT_TIMESTAMP');
    params.push(id);

    const sql = `UPDATE cases SET ${updates.join(', ')} WHERE id = ?`;
    db.prepare(sql).run(...params);

    return this.getCaseById(id);
  }

  /**
   * Delete a case by ID
   */
  static deleteCase(id: string): boolean {
    const result = db.prepare('DELETE FROM cases WHERE id = ?').run(id);
    return result.changes > 0;
  }
}

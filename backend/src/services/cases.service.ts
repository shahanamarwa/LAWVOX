// backend/src/services/cases.service.ts

import { db } from '../config/database';
import { Case } from '../types';

export class CasesService {
  static getAllCases(): Case[] {
    try {
      const cases = db.prepare('SELECT * FROM cases ORDER BY year DESC').all() as Case[];
      return cases;
    } catch (err) {
      console.error('[CasesService] Error fetching all cases:', err);
      return [];
    }
  }

  static getCaseById(id: string): Case | null {
    try {
      const caseData = db.prepare('SELECT * FROM cases WHERE id = ?').get(id) as Case | undefined;
      return caseData || null;
    } catch (err) {
      console.error('[CasesService] Error fetching case by ID:', err);
      return null;
    }
  }

  static createCase(caseData: Partial<Case>): Case | null {
    try {
      const stmt = db.prepare(`
        INSERT INTO cases (
          id, case_name, court, year, citation, category, judge,
          constitutional_provisions, summary, legal_issue, decision,
          keywords, bench_size, doctrine, audio_url, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))
      `);

      stmt.run(
        caseData.id,
        caseData.case_name,
        caseData.court,
        caseData.year,
        caseData.citation || null,
        caseData.category,
        caseData.judge || null,
        caseData.constitutional_provisions || null,
        caseData.summary || null,
        caseData.legal_issue || null,
        caseData.decision || null,
        caseData.keywords || null,
        caseData.bench_size || null,
        caseData.doctrine || null,
        caseData.audio_url || null
      );

      return this.getCaseById(caseData.id!);
    } catch (err) {
      console.error('[CasesService] Error creating case:', err);
      return null;
    }
  }

  static updateCase(id: string, updates: Partial<Case>): Case | null {
    try {
      const fields: string[] = [];
      const values: any[] = [];

      for (const [key, value] of Object.entries(updates)) {
        if (key !== 'id' && key !== 'created_at') {
          fields.push(`${key} = ?`);
          values.push(value);
        }
      }

      values.push('now()');
      values.push(id);

      const query = `UPDATE cases SET ${fields.join(', ')}, updated_at = datetime(?) WHERE id = ?`;
      db.prepare(query).run(...values);

      return this.getCaseById(id);
    } catch (err) {
      console.error('[CasesService] Error updating case:', err);
      return null;
    }
  }

  static deleteCase(id: string): boolean {
    try {
      db.prepare('DELETE FROM cases WHERE id = ?').run(id);
      return true;
    } catch (err) {
      console.error('[CasesService] Error deleting case:', err);
      return false;
    }
  }

  static searchCases(query: string): Case[] {
    try {
      const searchQuery = `%${query}%`;
      const cases = db
        .prepare(`
          SELECT * FROM cases WHERE
            case_name LIKE ? OR
            court LIKE ? OR
            category LIKE ? OR
            judge LIKE ? OR
            constitutional_provisions LIKE ? OR
            summary LIKE ? OR
            legal_issue LIKE ? OR
            decision LIKE ? OR
            keywords LIKE ? OR
            doctrine LIKE ?
          ORDER BY year DESC
        `)
        .all(
          searchQuery,
          searchQuery,
          searchQuery,
          searchQuery,
          searchQuery,
          searchQuery,
          searchQuery,
          searchQuery,
          searchQuery,
          searchQuery
        ) as Case[];
      return cases;
    } catch (err) {
      console.error('[CasesService] Error searching cases:', err);
      return [];
    }
  }

  static getCasesByCategory(category: string): Case[] {
    try {
      const cases = db
        .prepare('SELECT * FROM cases WHERE category = ? ORDER BY year DESC')
        .all(category) as Case[];
      return cases;
    } catch (err) {
      console.error('[CasesService] Error fetching cases by category:', err);
      return [];
    }
  }

  static getCasesByYear(year: number): Case[] {
    try {
      const cases = db
        .prepare('SELECT * FROM cases WHERE year = ? ORDER BY case_name')
        .all(year) as Case[];
      return cases;
    } catch (err) {
      console.error('[CasesService] Error fetching cases by year:', err);
      return [];
    }
  }
}

import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const dbPathConfig = process.env.DATABASE_PATH || './data/lawvox.db';
const resolvedDbPath = path.isAbsolute(dbPathConfig)
  ? dbPathConfig
  : path.resolve(process.cwd(), dbPathConfig);

// Ensure directory exists
const dbDir = path.dirname(resolvedDbPath);
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

export const db = new Database(resolvedDbPath);

// Enable foreign keys and WAL mode
db.pragma('foreign_keys = ON');
db.pragma('journal_mode = WAL');

const BASE_TABLES_SQL = `
PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS cases (
  id TEXT PRIMARY KEY,
  case_name TEXT NOT NULL,
  court TEXT NOT NULL,
  year INTEGER NOT NULL,
  citation TEXT,
  category TEXT NOT NULL,
  judge TEXT,
  constitutional_provisions TEXT,
  summary TEXT,
  legal_issue TEXT,
  decision TEXT,
  keywords TEXT,
  bench_size TEXT,
  doctrine TEXT,
  audio_url TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS bookmarks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  case_id TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (case_id) REFERENCES cases(id) ON DELETE CASCADE,
  UNIQUE(case_id)
);

CREATE TABLE IF NOT EXISTS listening_history (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  case_id TEXT NOT NULL,
  duration_listened INTEGER DEFAULT 0,
  completion_percentage REAL DEFAULT 0.0,
  last_position INTEGER DEFAULT 0,
  listened_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (case_id) REFERENCES cases(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS notes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  case_id TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (case_id) REFERENCES cases(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS profile (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  profession TEXT,
  email TEXT NOT NULL,
  institution TEXT,
  research_interests TEXT,
  avatar_url TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS settings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  notification_enabled INTEGER DEFAULT 1,
  autoplay_enabled INTEGER DEFAULT 1,
  playback_speed REAL DEFAULT 1.0,
  language TEXT DEFAULT 'English',
  appearance TEXT DEFAULT 'light',
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS recent_searches (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  query TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
`;

const INDEXES_SQL = `
CREATE INDEX IF NOT EXISTS idx_cases_category ON cases(category);
CREATE INDEX IF NOT EXISTS idx_cases_year ON cases(year);
CREATE INDEX IF NOT EXISTS idx_cases_court ON cases(court);
CREATE INDEX IF NOT EXISTS idx_cases_doctrine ON cases(doctrine);
CREATE INDEX IF NOT EXISTS idx_bookmarks_case_id ON bookmarks(case_id);
CREATE INDEX IF NOT EXISTS idx_listening_history_case_id ON listening_history(case_id);
CREATE INDEX IF NOT EXISTS idx_notes_case_id ON notes(case_id);
`;

/**
 * Initializes the SQLite database schema if tables do not already exist.
 */
export function initializeDatabase(): void {
  // 1. Create base tables
  db.exec(BASE_TABLES_SQL);

  // 2. Add columns if missing in existing table
  const tableInfo = db.prepare("PRAGMA table_info('cases')").all() as { name: string }[];
  const existingColumns = new Set(tableInfo.map((c) => c.name));

  const columnsToAdd: { name: string; type: string }[] = [
    { name: 'legal_issue', type: 'TEXT' },
    { name: 'decision', type: 'TEXT' },
    { name: 'keywords', type: 'TEXT' },
    { name: 'bench_size', type: 'TEXT' },
    { name: 'doctrine', type: 'TEXT' },
  ];

  for (const col of columnsToAdd) {
    if (!existingColumns.has(col.name)) {
      try {
        db.exec(`ALTER TABLE cases ADD COLUMN ${col.name} ${col.type}`);
      } catch {
        // ignore if already present
      }
    }
  }

  // 3. Create indexes
  db.exec(INDEXES_SQL);

  console.log(`[Database] Initialized tables successfully at: ${resolvedDbPath}`);
}

export function closeDatabase(): void {
  if (db && db.open) {
    db.close();
  }
}

-- LAWVOX SQLite Database Schema
-- Constitutional Precedent Research and Legal Audio Platform

PRAGMA foreign_keys = ON;

-- 1. CASES Table
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

-- 2. BOOKMARKS Table
CREATE TABLE IF NOT EXISTS bookmarks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  case_id TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (case_id) REFERENCES cases(id) ON DELETE CASCADE,
  UNIQUE(case_id)
);

-- 3. LISTENING_HISTORY Table
CREATE TABLE IF NOT EXISTS listening_history (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  case_id TEXT NOT NULL,
  duration_listened INTEGER DEFAULT 0,
  completion_percentage REAL DEFAULT 0.0,
  last_position INTEGER DEFAULT 0,
  listened_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (case_id) REFERENCES cases(id) ON DELETE CASCADE
);

-- 4. NOTES Table
CREATE TABLE IF NOT EXISTS notes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  case_id TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (case_id) REFERENCES cases(id) ON DELETE CASCADE
);

-- 5. PROFILE Table
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

-- 6. SETTINGS Table
CREATE TABLE IF NOT EXISTS settings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  notification_enabled INTEGER DEFAULT 1,
  autoplay_enabled INTEGER DEFAULT 1,
  playback_speed REAL DEFAULT 1.0,
  language TEXT DEFAULT 'English',
  appearance TEXT DEFAULT 'light',
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 7. RECENT_SEARCHES Table
CREATE TABLE IF NOT EXISTS recent_searches (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  query TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_cases_category ON cases(category);
CREATE INDEX IF NOT EXISTS idx_cases_year ON cases(year);
CREATE INDEX IF NOT EXISTS idx_cases_court ON cases(court);
CREATE INDEX IF NOT EXISTS idx_cases_doctrine ON cases(doctrine);
CREATE INDEX IF NOT EXISTS idx_bookmarks_case_id ON bookmarks(case_id);
CREATE INDEX IF NOT EXISTS idx_listening_history_case_id ON listening_history(case_id);
CREATE INDEX IF NOT EXISTS idx_notes_case_id ON notes(case_id);

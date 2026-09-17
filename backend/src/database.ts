import Database from "better-sqlite3";

const db = new Database("lawvox.db");

db.pragma("journal_mode = WAL");

db.exec(`
  CREATE TABLE IF NOT EXISTS cases (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    case_name TEXT NOT NULL,
    case_number TEXT,
    court TEXT,
    year INTEGER,
    category TEXT,
    summary TEXT,
    judgment TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

export default db;

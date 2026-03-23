import Database from 'better-sqlite3';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'react-archive.db');
const db = new Database(DB_PATH);

// 테이블 초기화
db.exec(`
  CREATE TABLE IF NOT EXISTS contents (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    summary TEXT,
    description TEXT,
    code TEXT NOT NULL,
    folder_name TEXT NOT NULL,
    size INTEGER,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );

  CREATE INDEX IF NOT EXISTS idx_folder ON contents(folder_name);
  CREATE INDEX IF NOT EXISTS idx_updated ON contents(updated_at DESC);
`);

export default db;

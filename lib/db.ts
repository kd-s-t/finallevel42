// Use Neon (Postgres) for production/Vercel, SQLite for local dev
// Only use Neon if DATABASE_URL is set AND it's a valid URL (not a placeholder)
const databaseUrl = process.env.DATABASE_URL;
const useNeon = !!databaseUrl && 
                databaseUrl.startsWith('postgresql://') && 
                !databaseUrl.includes('your_neon_connection_string');

let sql: any;
let db: any;

if (useNeon) {
  // Neon/Postgres for production
  const { neon } = require('@neondatabase/serverless');
  sql = neon(databaseUrl!);
} else {
  // SQLite for local development
  const Database = require('better-sqlite3');
  const path = require('path');
  const fs = require('fs');
  
  const dbPath = path.join(process.cwd(), 'data', 'trainer.db');
  const dbDir = path.dirname(dbPath);
  
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
  }
  
  db = new Database(dbPath);
  db.pragma('foreign_keys = ON');
}

// Initialize schema
export async function initDb() {
  if (useNeon) {
    // Postgres schema
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        vdot REAL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Add vdot column if it doesn't exist (for existing databases)
    await sql`
      ALTER TABLE users ADD COLUMN IF NOT EXISTS vdot REAL
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS training_sessions (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL,
        week_number INTEGER NOT NULL,
        week_range TEXT NOT NULL,
        day_name TEXT NOT NULL,
        date TEXT NOT NULL,
        time TEXT,
        session_type TEXT NOT NULL,
        details TEXT NOT NULL,
        completed BOOLEAN DEFAULT FALSE,
        completed_at TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        UNIQUE(user_id, week_number, day_name)
      )
    `;

    await sql`
      CREATE INDEX IF NOT EXISTS idx_user_sessions 
      ON training_sessions(user_id, week_number)
    `;
  } else {
    // SQLite schema
    db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        vdot REAL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Add vdot column if it doesn't exist (for existing databases)
    try {
      db.exec(`ALTER TABLE users ADD COLUMN vdot REAL`);
    } catch (e: any) {
      // Column already exists, ignore error
      if (!e.message?.includes('duplicate column')) {
        console.error('Error adding vdot column:', e);
      }
    }

    db.exec(`
      CREATE TABLE IF NOT EXISTS training_sessions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        week_number INTEGER NOT NULL,
        week_range TEXT NOT NULL,
        day_name TEXT NOT NULL,
        date TEXT NOT NULL,
        time TEXT,
        session_type TEXT NOT NULL,
        details TEXT NOT NULL,
        completed BOOLEAN DEFAULT 0,
        completed_at DATETIME,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        UNIQUE(user_id, week_number, day_name)
      )
    `);

    db.exec(`
      CREATE INDEX IF NOT EXISTS idx_user_sessions 
      ON training_sessions(user_id, week_number)
    `);
  }
}

// Initialize on import
if (useNeon) {
  initDb().catch(console.error);
} else {
  initDb();
}

export { sql, db, useNeon };
export default useNeon ? sql : db;

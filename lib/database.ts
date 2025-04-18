// lib/database.ts
import Database from 'better-sqlite3';
import path from 'path';




const dbFile = path.join(process.cwd(), 'data', 'news.db');
console.log('SQLite DB path:', dbFile);      // <— добавь для отладки
const db = new Database(dbFile);

db.exec(`
    CREATE INDEX IF NOT EXISTS idx_news_date ON News(dateCreated);
  CREATE INDEX IF NOT EXISTS idx_comments_newsId ON Comments(newsId);
  CREATE TABLE IF NOT EXISTS News (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    dateCreated TEXT NOT NULL,
    rating INTEGER DEFAULT 0,
    votes INTEGER DEFAULT 0
  );
  CREATE TABLE IF NOT EXISTS Comments (
    id TEXT PRIMARY KEY,
    newsId TEXT NOT NULL,
    author TEXT NOT NULL,
    text TEXT NOT NULL,
    dateCreated TEXT NOT NULL,
    FOREIGN KEY(newsId) REFERENCES News(id)
  );
`);

export default db;

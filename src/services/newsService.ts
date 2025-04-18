// src/services/newsService.ts
import db from '../../lib/database';
import { NewsItem, Comment } from '../types/news';


// 1) Получить список новостей (без комментариев)

export function getNews(): NewsItem[] {
  try {
    const rows: any[] = db.prepare(`...`).all();
    return rows.map(r => ({
      ...r,
      comments: [],  // комментарии будем грузить при GET /news/[id]
    }));
  } catch (error) {
    console.error('Ошибка получения новостей:', error);
    return [];
  }
}

// 2) Создать новость
export function createNews(item: {
  title: string;
  content: string;
}): NewsItem {
  const id = `news_${Date.now()}`;
  const now = new Date().toISOString();
  db.prepare(`
    INSERT INTO News (id, title, content, dateCreated)
    VALUES (?, ?, ?, ?)
  `).run(id, item.title, item.content, now);
  return { id, ...item, dateCreated: now, rating: 0, votes: 0, comments: [] };
}

// 3) Получить одну новость вместе с комментариями
export function getNewsItem(id: string): NewsItem | null {
  const r: any = db
    .prepare('SELECT * FROM News WHERE id = ?')
    .get(id);
  if (!r) return null;

  const comments: Comment[] = db
    .prepare(`
      SELECT id, author, text, dateCreated
      FROM Comments
      WHERE newsId = ?
      ORDER BY dateCreated DESC
    `)
    .all(id)
    .map((c: any) => ({
      id: c.id,
      author: c.author,
      text: c.text,
      dateCreated: c.dateCreated,
    }));

  return { 
    id: r.id,
    title: r.title,
    content: r.content,
    dateCreated: r.dateCreated,
    rating: r.rating,
    votes: r.votes,
    comments
  };
}

// 4) Добавить комментарий
export function addComment(
  newsId: string,
  comm: { author: string; text: string }
): Comment {
  const newsExists = db.prepare('SELECT id FROM News WHERE id = ?').get(newsId);
  if (!newsExists) throw new Error('Новость не найдена');
  const id = `c_${Date.now()}`;
  const now = new Date().toISOString();
  db.prepare(`
    INSERT INTO Comments (id, newsId, author, text, dateCreated)
    VALUES (?, ?, ?, ?, ?)
  `).run(id, newsId, comm.author, comm.text, now);
  return { id, author: comm.author, text: comm.text, dateCreated: now };
}

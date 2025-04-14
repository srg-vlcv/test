// src/services/newsService.ts
import { NewsItem, Comment } from '../types/news';

// Получить все новости из localStorage
export const getNews = (): NewsItem[] => {
  try {
    const storedNews = localStorage.getItem('news');
    return storedNews ? JSON.parse(storedNews) : [];
  } catch (error) {
    console.error('Ошибка чтения новостей:', error);
    return [];
  }
};

// Сохранить все новости в localStorage
export const saveNews = (news: NewsItem[]): void => {
  localStorage.setItem('news', JSON.stringify(news));
};

// Добавить комментарий к конкретной новости
export const addComment = (newsId: string, comment: Comment): void => {
  const news = getNews();
  const newsItem = news.find((item) => item.id === newsId);

  if (!newsItem) {
    console.error('Новость не найдена');
    return;
  }

  if (!newsItem.comments) newsItem.comments = [];
  newsItem.comments.push(comment);
  saveNews(news);
};
// src/hooks/useNews.ts
import { useState, useEffect } from 'react';
import { NewsItem } from '../types/news';
import { getNews, saveNews } from '../services/newsService';

export const useNews = () => {
  const [news, setNews] = useState<NewsItem[]>([]);

  // Загрузка новостей при монтировании компонента
  useEffect(() => {
    const loadNews = () => {
      const data = getNews();
      setNews(data);
    };
    loadNews();
  }, []);

  // Обработка голосования
  const handleVote = (newsItemId: string, voteType: 'like' | 'dislike') => {
    const updatedNews = news.map((item) => {
      if (item.id === newsItemId) {
        const votedKey = `voted_${newsItemId}`;
        const hasVoted = localStorage.getItem(votedKey);

        if (!hasVoted) {
          const newRating = voteType === 'like' ? item.rating + 1 : item.rating - 1;
          localStorage.setItem(votedKey, 'true');
          return { ...item, rating: newRating, votes: item.votes + 1 };
        }
      }
      return item;
    });

    setNews(updatedNews);
    saveNews(updatedNews); // Сохраняем изменения через сервис
  };

  return { news, handleVote };
};
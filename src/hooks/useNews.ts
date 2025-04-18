// src/hooks/useNews.ts
import { useState, useEffect } from 'react';
import { NewsItem } from '../types/news';

export const useNews = () => {
  const [news, setNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    fetch('/api/news')
      .then(r => r.json())
      .then(setNews);
  }, []);

  return { news };
};

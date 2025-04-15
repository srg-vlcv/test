import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { NewsItem } from '../../types/news';
import BackButton from '../../components/BackButton';
import Layout from '../../components/Layout';
import { getNews } from '../../services/newsService';
import CommentForm from '../../components/CommentForm';

const NewsPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const newsId = Array.isArray(id) ? id[0] : id;
  const [newsItem, setNewsItem] = useState<NewsItem | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (newsId) {
      const news = getNews();
      const item = news.find(n => n.id === newsId);
      item ? setNewsItem(item) : setNotFound(true);
    }
  }, [newsId]);

  return (
    <Layout>
      <main className="main-content">
        <BackButton />

        {notFound || !newsItem ? (
          <div>Новость не найдена</div>
        ) : (
          <>
            <h1 className="text-3xl font-bold mb-4">{newsItem.title}</h1>
            <p className="text-gray-600 mb-2">
              Опубликовано: {new Date(newsItem.dateCreated).toLocaleDateString()}
            </p>
            <p className="text-gray-800">{newsItem.content}</p>
            <p className="mt-4">Рейтинг: {newsItem.rating}</p>

            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4 mx-2">Комментарии</h2>
              <CommentForm />
            </div>
          </>
        )}
      </main>
    </Layout>
  );
};

export default NewsPage;

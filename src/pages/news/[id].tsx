import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { NewsItem } from '../../types/news';
//import BackButton from '../../components/BackButton';
import Layout from '../../components/Layout';
import { getNews } from '../../services/newsService';
import CommentForm from '../../components/CommentForm';
import 'react-quill/dist/quill.snow.css';

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
      if (item) {
        setNewsItem(item);
      } else {
        setNotFound(true);
      }
    }
  }, [newsId]);

  return (
    <Layout>
      <main className="main-content">
        {notFound || !newsItem ? (
          <div>Новость не найдена</div>
        ) : (
          <div className="mx-auto p-6">
            <p className="text-gray-500 mx-auto">
              Опубликовано: {new Date(newsItem.dateCreated).toLocaleDateString()}
            </p>
            <h1 className="text-3xl font-bold mb-2">{newsItem.title}</h1>
            
            {/* Контент новости: рендерим HTML с Quill-классами */}
            <div className="prose mb-6 ql-editor ql-snow"
                 dangerouslySetInnerHTML={{ __html: newsItem.content }}
            />
            <p className="mb-6">Рейтинг: {newsItem.rating}</p>
            <div>
              <h2 className="text-2xl font-bold mb-4">Комментарии</h2>
              <CommentForm />
            </div>
          </div>
        )}
      </main>
    </Layout>
  );
};

export default NewsPage;
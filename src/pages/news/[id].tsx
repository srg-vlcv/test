import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { NewsItem } from '../../types/news';
import BackButton from '../../components/BackButton';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { getNews, saveNews } from '../../services/newsService'; // Импорт сервиса

const NewsPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const newsId = Array.isArray(id) ? id[0] : id;
  const [newsItem, setNewsItem] = useState<NewsItem | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (newsId) {
      const news = getNews(); // Используем сервис
      const item = news.find(n => n.id === newsId);
      
      if (item) {
        setNewsItem(item);
      } else {
        setNotFound(true);
      }
    }
  }, [newsId]);

  const handleSubmitComment = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const commentText = event.currentTarget.comment.value.trim();

    if (!commentText || !newsItem) return;

    const newComment = {
      id: `comment_${Date.now()}`,
      author: event.currentTarget.author?.value || 'Аноним',
      text: commentText,
    };

    const news = getNews();
    const newsIndex = news.findIndex(n => n.id === newsItem.id);
    
    if (newsIndex === -1) return;

    const updatedNewsItem = { 
      ...news[newsIndex], 
      comments: [...(news[newsIndex].comments || []), newComment] 
    };

    news[newsIndex] = updatedNewsItem;
    saveNews(news); // Сохраняем через сервис
    
    setNewsItem(updatedNewsItem);
    event.currentTarget.comment.value = '';
  };

  return (
    <Layout>
      <>
      <main className="main-content">
        <BackButton />
        {notFound ? (
          <div>Новость не найдена</div>
        ) : !newsItem ? (
          <div>Новость не найдена</div>
        ) : newsItem ? (
          <>
            <h1 className="text-3xl font-bold mb-4">
              {newsItem.title}
            </h1>
            <p className="text-gray-600 mb-2">
              Опубликовано: {new Date(newsItem.dateCreated).toLocaleDateString()}
            </p>
            <p className="text-gray-800">{newsItem.content}</p>
            <p className="mt-4">Рейтинг: {newsItem.rating}</p>

            {/* Comments Section */}
            <div className="mt-8 ">
              <h2 className="text-2xl font-bold mb-4">Комментарии</h2>

              {/* Comment Form */}
              <form onSubmit={handleSubmitComment} className="mb-6">
                <div className="mb-2">
                  <textarea
                    id="comment"
                    name="comment"
                    maxLength={500}
                    placeholder="Напишите свой комментарий..."
                    className="w-full h-24 p-2 border rounded"
                    required
                  />
                </div>
                <button type="submit" className="button primary">
                  Отправить комментарий
                </button>
              </form>

              {/* Display Comments */}
              {newsItem.comments && newsItem.comments.length > 0 ? (
                <ul>
                  {newsItem.comments.map(comment => (
                    <li key={comment.id} className="mb-4 p-4 bg-gray-50 rounded-lg shadow-sm">
                      <p className="font-semibold">
                        Author: {comment.author}
                      </p>
                      <p>{comment.text}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Пока нет комментариев. Будьте первым, кто прокомментирует!</p>
              )}
            </div>
          </>
        ) : (
          <div>Загрузка...</div> 
        )}
      </main>
      </>
    </Layout>

  );
};

export default NewsPage;
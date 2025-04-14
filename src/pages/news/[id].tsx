import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { NewsItem } from '../../types/news';
import BackButton from '../../components/BackButton';
import Layout from '../../components/Layout';
import { getNews, saveNews } from '../../services/newsService';
import { SmartCaptcha } from '@yandex/smart-captcha';

const NewsPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const newsId = Array.isArray(id) ? id[0] : id;
  const [newsItem, setNewsItem] = useState<NewsItem | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [captchaToken, setCaptchaToken] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (newsId) {
      const news = getNews();
      const item = news.find(n => n.id === newsId);
      item ? setNewsItem(item) : setNotFound(true);
    }
  }, [newsId]);

  const handleSubmitComment = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const author = event.currentTarget.author.value.trim();
    const commentText = event.currentTarget.comment.value.trim();
    
    setError(''); // Сбрасываем предыдущие ошибки

    // Валидация полей
    if (!author) {
      setError('Пожалуйста, введите ваше имя');
      return;
    }

    if (!commentText) {
      setError('Пожалуйста, введите комментарий');
      return;
    }

    if (!captchaToken) {
      setError('Пожалуйста, пройдите проверку каптчи');
      return;
    }

    // Создание комментария
    const newComment = {
      id: `comment_${Date.now()}`,
      author: author,
      text: commentText,
    };

    // Обновление данных
    const news = getNews();
    const newsIndex = news.findIndex(n => n.id === newsItem?.id);
    if (newsIndex === -1) return;

    const updatedNewsItem = { 
      ...news[newsIndex], 
      comments: [...(news[newsIndex].comments || []), newComment] 
    };

    news[newsIndex] = updatedNewsItem;
    saveNews(news);
    
    // Сброс формы
    setNewsItem(updatedNewsItem);
    event.currentTarget.reset();
    setCaptchaToken('');
  };

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
              <h2 className="text-2xl font-bold mb-4">Комментарии</h2>

              <form 
                onSubmit={handleSubmitComment} 
                className="mb-6"
                onChange={() => setError('')} // Сбрасываем ошибки при изменении полей
              >
                <div className="mb-2">
                  <label htmlFor="author" className="block text-sm font-medium mb-1">
                    Ваше имя:
                  </label>
                  <input
                    type="text"
                    id="author"
                    name="author"
                    placeholder="Введите имя"
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div className="mb-2">
                  <label htmlFor="comment" className="block text-sm font-medium mb-1">
                    Комментарий:
                  </label>
                  <textarea
                    id="comment"
                    name="comment"
                    maxLength={500}
                    placeholder="Напишите свой комментарий..."
                    className="w-full h-32 p-2 border rounded focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div className="mb-4">
                  <SmartCaptcha
                    sitekey="ysc1_YlpBL0WYgRXgSCI2gjm27vUgZ2ll69ea0BUZK7DR96d0f581"
                    onSuccess={setCaptchaToken}
                  />
                </div>

                {error && (
                  <p className="text-red-500 text-sm mb-2">
                    {error}
                  </p>
                )}

                <button 
                  type="submit" 
                  className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded"
                >
                  Отправить комментарий
                </button>
              </form>

              {newsItem.comments?.length > 0 ? (
                <ul className="space-y-3">
                  {newsItem.comments.map(comment => (
                    <li 
                      key={comment.id}
                      className="p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-100"
                    >
                      <p className="font-semibold text-gray-700">
                        {comment.author}
                      </p>
                      <p className="text-gray-600 mt-1">
                        {comment.text}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">
                  Пока нет комментариев. Будьте первым!
                </p>
              )}
            </div>
          </>
        )}
      </main>
    </Layout>
  );
};

export default NewsPage;
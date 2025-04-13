import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { NewsItem } from '../../../types/news';
import BackButton from '../../components/BackButton';
import Link from 'next/link';
import Layout from '../../components/Layout'; // Adjusted path


const NewsPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const newsId = Array.isArray(id) ? id[0] : id;
  const [newsItem, setNewsItem] = useState<NewsItem | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);
  const [userVote, setUserVote] = useState(0);

  useEffect(() => {
    if (newsId) {
      const storedNews = localStorage.getItem('news'); // Попытка получить данные из localStorage по ключу 'news'
      if (storedNews) { // Проверяем, есть ли вообще данные в localStorage
        try {
          const news: NewsItem[] = JSON.parse(storedNews) as NewsItem[]; // Пытаемся распарсить строку из localStorage в массив объектов NewsItem
          // Если данные успешно распарсены, ищем новость с нужным ID
          console.log("Data from localStorage:", news); // Выводим данные из localStorage в консоль для отладки
          const item = news.find(n => n.id === newsId); // Ищем новость с нужным ID в массиве
          if (item) {
            setNewsItem(item); // Если новость найдена, обновляем состояние newsItem
          } else {
            setNotFound(true); // Если новость не найдена, устанавливаем флаг notFound в true
          }
        } catch (error) {
          // Если при парсинге данных из localStorage произошла ошибка (например, если данные повреждены),
          console.error("Error parsing news from localStorage:", error); // Выводим сообщение об ошибке в консоль
          setNewsItem(null); // Устанавливаем newsItem в null, так как не удалось получить данные
          setNotFound(true); // Устанавливаем notFound в true, чтобы отобразить сообщение об ошибке пользователю
        }
      } 
    }
  }, [newsId]);



  
  const handleSubmitComment = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const commentText = event.currentTarget.comment.value;

    if (commentText.trim() === '') {
      alert('Пожалуйста, введите комментарий.');
      return;
    }

    const generateId = () => {
      return `comment_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    };

    const newComment: import('../../types/news').Comment = {
      id: generateId(),
      author: 'Placeholder', // Replace with actual author later
      text: commentText,
    };

    const storedNews = localStorage.getItem('news');
    if (storedNews) {
      const news: NewsItem[] = JSON.parse(storedNews) as NewsItem[];
      const newsIndex = news.findIndex(n => n.id === newsItem.id);
      if (newsIndex !== -1) {
        const updatedNewsItem = { ...news[newsIndex], comments: [...(news[newsIndex].comments || []), newComment] };
        news[newsIndex] = updatedNewsItem;
        localStorage.setItem('news', JSON.stringify(news));
        setNewsItem(updatedNewsItem);
      }
    }

    event.currentTarget.comment.value = ''; // Clear textarea
  };

  return (
    <Layout>
      <>
      <header className="frosted-glass py-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-serif font-semibold">
            Neuro-wire
          </Link>
          <div className="">
            <Link href="/create" className="button primary">
              Create+
            </Link>
          </div>
        </div>
      </header>
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
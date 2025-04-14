import React, { useState } from 'react';
import { NextRouter, useRouter } from 'next/router';
import Link from "next/link";
import BackButton from '../components/BackButton';
import Layout from '../components/Layout';
import { getNews, saveNews } from '../services/newsService';


const CreatePage: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  const router = useRouter();

  const generateId = () => {
    return `news_text_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError(''); // Clear previous errors

    if (title.trim() === '' && content.trim() === '') {
      setError('Пожалуйста, введите заголовок и содержание.');
      return;
    } 
    if (title.trim() === '') {
      setError('Пожалуйста, введите заголовок.');
    } else if (content.trim() === '') {
      setError('Пожалуйста, введите содержание.');
    } else { // No errors, proceed with saving
        setError(''); // Clear any existing error message
        const newsId = generateId();
        const newNews = {
          id: newsId,
          title: title,
          content: content,
          dateCreated: new Date().toISOString(),
          rating: 0,
          votes: 0,
          comments: [],
        };

        const news = getNews(); // <-- Используем сервис
        news.push(newNews);
        saveNews(news); // <-- Сохраняем через сервис 

        router.push('/');
    }   
  };

  
  return (
    <Layout>
      <div className="page-container">
          <header className="frosted-glass py-4">
            <div className="container mx-auto flex justify-between items-center">
              <Link href="/" className="text-2xl font-serif font-semibold">
                Neuro-wire
              </Link>
              <div>
                <Link href="/create" className="button primary">
                  Create+
                </Link>
              </div>
            </div>
          </header>          
                    
                <main className="main-content">
                  <BackButton />
                  <div className="my-8">
                    <h1 className="text-3xl font-bold mb-4">Создать новость</h1>
                    <form onSubmit={handleSubmit}>
                      <div className="mb-4">
                        <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
                          Заголовок (макс. 50 символов):
                        </label>
                        <input
                          type="text"
                          id="title"
                          name="title"
                          value={title}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                          maxLength={50}
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                      </div>
                      <div className="mb-6">
                        <label htmlFor="content" className="block text-gray-700 text-sm font-bold mb-2">
                          Содержание:
                        </label>
                        <textarea
                          id="content"
                          name="content"
                          value={content}
                          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
                        />
                      </div>
                      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Отправить</button>
                      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                    </form>
                  </div>
                </main>
              </div>
            </Layout>
          );
};

export default CreatePage;
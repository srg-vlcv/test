'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { NextRouter, useRouter } from 'next/router';
import Link from 'next/link';
//import BackButton from '../components/BackButton';
import Layout from '../components/Layout';
import { getNews, saveNews } from '../services/newsService';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export default function CreatePage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  const router = useRouter();

  const generateId = () => {
    return `news_text_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    if (!title.trim()) {
      setError('Пожалуйста, введите заголовок.');
      return;
    }
    if (!content.trim()) {
      setError('Пожалуйста, введите содержание.');
      return;
    }

    // По желанию можно ограничить длину HTML-строки
    if (content.length > 5000) {
      setError('Содержание не должно превышать 5000 символов.');
      return;
    }

    const newsId = generateId();
    const newNews = {
      id: newsId,
      title: title.trim(),
      content, // здесь хранится HTML
      dateCreated: new Date().toISOString(),
      rating: 0,
      votes: 0,
      comments: [],
    };

    const newsList = getNews();
    newsList.push(newNews);
    saveNews(newsList);

    router.push('/');
  };

  return (
    <Layout>
      <div className="page-container">
        <main className="main-content">
          <div className="my-4 mx-auto p-4 bg-white rounded shadow">
            <h1 className="text-3xl font-bold mb-4">Создать новость</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium mb-1">
                  Заголовок (макс. 50 символов):
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  maxLength={50}
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
                />
              </div>
              <div>
                <label htmlFor="content" className="block text-sm font-medium mb-1">
                  Содержание:
                </label>
                <div className="border rounded">
                  <ReactQuill
                    theme="snow"
                    value={content}
                    onChange={setContent}
                    placeholder="Введите текст новости..."
                    style={{ minHeight: '300px' }}
                  />
                </div>
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded"
              >
                Отправить
              </button>
            </form>
          </div>
        </main>
      </div>
    </Layout>
  );
}
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import BackButton from '../components/BackButton';
import Layout from '../components/Layout';

const CreatePage: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const router = useRouter();

  const generateId = () => {
    return `news_text_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (title.trim() === '' || content.trim() === '') {
      alert('Please enter both title and content.');
      return;
    }

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

    const existingNews = localStorage.getItem('news');
    const news = existingNews ? JSON.parse(existingNews) : [];
    news.push(newNews);
    localStorage.setItem('news', JSON.stringify(news));

    router.push('/');
  };

  return (
    <Layout>
      <div className="relative p-6">
          <BackButton />
          <div className="frosted-glass p-6 my-8">
            <h1 className="text-3xl font-bold mb-4">Create New News</h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
                  Title (max 50 chars):
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  maxLength={50}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="content" className="block text-gray-700 text-sm font-bold mb-2">
                  Content:
                </label>
                <textarea
                  id="content"
                  name="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
                />
              </div>
              <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit</button>
            </form>
          </div>
        </div>
    </Layout>
  );
};

export default CreatePage;
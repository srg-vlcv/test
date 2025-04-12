import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { NewsItem } from '../../types/news';
import BackButton from '../../components/BackButton';
import Link from 'next/link';

const NewsPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const newsId = Array.isArray(id) ? id[0] : id;
  const [newsItem, setNewsItem] = useState<NewsItem | null>(null);

  useEffect(() => {
    if (newsId) {
        const storedNews = localStorage.getItem('news');
        if (storedNews) {
            const news: NewsItem[] = JSON.parse(storedNews) as NewsItem[];
            console.log("Data from localStorage:", news); // Added
            const item = news.find(n => n.id === newsId);
            setNewsItem(item ? item : null);
        }
    }
  }, [newsId]);

  if (!newsItem) {
    return <div>Loading...</div>; // Or a better loading indicator
  } 
  
  const handleSubmitComment = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const commentText = event.currentTarget.comment.value;

    if (commentText.trim() === '') {
      alert('Please enter a comment.');
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
    <div className="page-container">
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
          <h1 className="text-3xl font-bold mb-4">
            {newsItem.title}
          </h1>
          <p className="text-gray-600 mb-2">
            Published: {new Date(newsItem.dateCreated).toLocaleDateString()}
          </p>
          <p className="text-gray-800">{newsItem.content}</p>
          <p className="mt-4">Rating: {newsItem.rating}</p>

          {/* Comments Section */}
          <div className="mt-8 ">
            <h2 className="text-2xl font-bold mb-4">Comments</h2>

            {/* Comment Form */}
            <form onSubmit={handleSubmitComment} className="mb-6">
              <div className="mb-2">
                <textarea
                  id="comment"
                  name="comment"
                  placeholder="Write your comment..."
                  className="w-full h-24 p-2 border rounded"
                  required
                />
              </div>
              <button type="submit" className="button primary">
                Submit Comment
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
              <p>No comments yet. Be the first to comment!</p>
            )}
          </div>
        </main>
        <footer className="frosted-glass py-4 mt-8">
          <div className="container mx-auto flex justify-between items-center">
            <p>&copy; 2023 Neuro-wire. All rights reserved.</p>
            {/* Add social media links here */}
            <div className="flex space-x-4">
              <a href="#" target="_blank" rel="noopener noreferrer">Facebook</a>
              <a href="#" target="_blank" rel="noopener noreferrer">Twitter</a>
              <a href="#" target="_blank" rel="noopener noreferrer">Instagram</a>
            </div>
          </div>
        </footer>
      </>
    </div>
  );
};

export default NewsPage;
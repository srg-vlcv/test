import React, { useState, useEffect } from "react";
import Layout from '../components/Layout';
import Link from "next/link";
import NewsList from "../components/NewsList";
import { NewsItem } from "../types/news";

const HomePage: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);

  const handleVote = (newsItemId: string, voteType: 'like' | 'dislike') => {
    const storedNews = localStorage.getItem('news');
    if (!storedNews) return;

    let newsData: NewsItem[] = JSON.parse(storedNews);
    const newsItemIndex = newsData.findIndex(item => item.id === newsItemId);

    if (newsItemIndex === -1) return;

    const votedKey = `voted_${newsItemId}`;
    const hasVoted = localStorage.getItem(votedKey);

    if (!hasVoted) {
      const updatedNewsItem = { ...newsData[newsItemIndex] };
      if (voteType === 'like') {
        updatedNewsItem.rating += 1;
      } else {
        updatedNewsItem.rating -= 1;
      }
      updatedNewsItem.votes += 1;
      newsData[newsItemIndex] = updatedNewsItem;

      localStorage.setItem('news', JSON.stringify(newsData));
      localStorage.setItem(votedKey, 'true');
      setNews(newsData);
    } else {
      alert('You have already voted for this news item.');
    }
  };

  const clearNews = () => {
    localStorage.removeItem('news');
    setNews([]);
  };

  useEffect(() => {
    const storedNews = localStorage.getItem('news');
    setNews(storedNews ? JSON.parse(storedNews) : []);
  }, []);

  return (
    <Layout>
      <div className="min-h-screen">
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
                <button onClick={clearNews} className="button secondary">
                  Очистить новости
                </button>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="container mx-auto py-8">
            <div className="p-6">
              <NewsList news={news} onVote={handleVote} />
            </div>
          </main>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;

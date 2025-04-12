import React, { useState, useEffect } from 'react';
import NewsList from '../components/NewsList';
import { NewsItem } from '../types/news';
import Layout from '../components/Layout';


const HomePage: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);

  const handleVote = (newsItemId: string, voteType: 'like' | 'dislike') => {
    // Placeholder for vote handling, will be implemented later
    console.log(`Vote ${voteType} for ${newsItemId}`);
  };

  useEffect(() => {
    // Placeholder for fetching news, will be implemented later
    setNews([{ id: '1', title: 'News 1', content: 'Content 1', dateCreated: new Date().toISOString(), rating: 0, votes: 0, comments: [] }]);
  }, []);

  return (
    <Layout>
        <div className="p-6">
          <NewsList news={news} onVote={handleVote} />
        </div>
    </Layout>
  );
};

export default HomePage;

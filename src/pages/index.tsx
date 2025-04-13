import React, { useState, useEffect } from "react";
import Layout from '../components/Layout';
import Link from "next/link";
import NewsList from "../components/NewsList";
import { NewsItem } from "../types/news";

const HomePage: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState('rating');
  const [sortDirection, setSortDirection] = useState('desc'); // 'asc' or 'desc'
  const NEWS_PER_PAGE = 5;
  const fetchNews = () => {
    const storedNews = localStorage.getItem('news');
    let initialNews: NewsItem[] = storedNews ? JSON.parse(storedNews) : [];
    const sortedNews = sortNews(initialNews, sortBy, sortDirection);
    setNews(sortedNews);
    setTotalPages(Math.ceil(sortedNews.length / NEWS_PER_PAGE));
  };


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
      
      newsData = sortNews(newsData, sortBy, sortDirection);
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

  const sortNews = (newsArray: NewsItem[], sortBy: string, sortDirection: string): NewsItem[] => {
    const sortedNews = [...newsArray].sort((a, b) => {
      let comparison = 0;
      if (sortBy === 'rating') {
        comparison = a.rating - b.rating;
      } else if (sortBy === 'date') {
        comparison = new Date(a.dateCreated).getTime() - new Date(b.dateCreated).getTime();
      } else if (sortBy === 'comments') {
        comparison = (a.comments ? a.comments.length : 0) - (b.comments ? b.comments.length : 0);
      } else if (sortBy === 'votes') {
        comparison = a.votes - b.votes;
      }
      return sortDirection === 'asc' ? comparison : -comparison;
    });
    return sortedNews;
    }

  const handleSortChange = (column: string) => {
    if (sortBy === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortDirection('asc');
    }
  };

  useEffect(() => {
    fetchNews();
  }, [sortBy, sortDirection]);

  useEffect(() => {
    const storedNews = localStorage.getItem('news');
    let initialNews: NewsItem[] = storedNews ? JSON.parse(storedNews) : [];
    const sortedNews = sortNews(initialNews, sortBy, sortDirection);
    setNews(sortedNews);
    setTotalPages(Math.ceil(sortedNews.length / NEWS_PER_PAGE));
  }, [sortDirection]);

  useEffect(() => {
    const storedNews = localStorage.getItem('news');
    let initialNews: NewsItem[] = storedNews ? JSON.parse(storedNews) : [];
    const sortedNews = sortNews(initialNews, sortBy, sortDirection);
    setTotalPages(Math.ceil(sortedNews.length / NEWS_PER_PAGE));
  }, [news]);

  const indexOfLastNews = currentPage * NEWS_PER_PAGE;
  const indexOfFirstNews = indexOfLastNews - NEWS_PER_PAGE;
  const currentNews = news.slice(indexOfFirstNews, indexOfLastNews);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    if (startPage > 1) {
      pageNumbers.push(<span key="start">...</span>);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button key={i} onClick={() => paginate(i)} className={`mx-1 px-3 py-2 rounded ${currentPage === i ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}>{i}</button>
      );
    }

    if (endPage < totalPages) {
      pageNumbers.push(<span key="end">...</span>);
    }
    return pageNumbers;
  };

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
              

              

              <NewsList 
                news={currentNews} 
                onVote={handleVote}                
                onSort={handleSortChange}
                sortBy={sortBy} sortDirection={sortDirection}
              />

              {totalPages > 1 && (
                <div className="flex justify-center mt-4">
                  <button 
                    onClick={prevPage} 
                    disabled={currentPage === 1} 
                    className="mx-1 px-3 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
                  >
                    Previous
                  </button>
                  

                  {renderPageNumbers()}

                  <button 
                    onClick={nextPage} 
                    disabled={currentPage === totalPages} 
                    className="mx-1 px-3 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              )}


            </div>
          </main>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;

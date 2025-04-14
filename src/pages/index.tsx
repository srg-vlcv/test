import React, { useState, useMemo } from "react";
import Link from "next/link";
import Layout from '../components/Layout';
import NewsList from "../components/NewsList";
import { useNews } from '../hooks/useNews';
import { NewsItem } from '../types/news';

// Функция сортировки (добавлена вручную)
const sortNews = (
  newsArray: NewsItem[],
  sortBy: string,
  sortDirection: string
): NewsItem[] => {
  return [...newsArray].sort((a, b) => {
    let comparison = 0;
    if (sortBy === 'rating') {
      comparison = a.rating - b.rating;
    } else if (sortBy === 'date') {
      comparison = new Date(a.dateCreated).getTime() - new Date(b.dateCreated).getTime();
    } else if (sortBy === 'comments') {
      comparison = (a.comments?.length || 0) - (b.comments?.length || 0);
    } else if (sortBy === 'votes') {
      comparison = a.votes - b.votes;
    }
    return sortDirection === 'asc' ? comparison : -comparison;
  });
};

const HomePage: React.FC = () => {
  const { news, handleVote } = useNews();
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<'rating' | 'date' | 'comments' | 'votes'>('rating');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const NEWS_PER_PAGE = 5;

  const sortedNews = useMemo(
    () => sortNews(news, sortBy, sortDirection),
    [news, sortBy, sortDirection]
  );

  // Вычисляем общее количество страниц
  const totalPages = Math.ceil(sortedNews.length / NEWS_PER_PAGE);

  // Получаем новости для текущей страницы
  const currentNews = sortedNews.slice(
    (currentPage - 1) * NEWS_PER_PAGE,
    currentPage * NEWS_PER_PAGE
  );

  // Обработчик изменения сортировки
  const handleSortChange = (column: string) => {
    if (sortBy === column) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column as typeof sortBy);
      setSortDirection('asc');
    }
  };

  // Очистка новостей из localStorage
  const clearNews = () => {
    localStorage.removeItem('news');
    window.location.reload(); // Перезагрузка для обновления состояния
  };

  // Пагинация
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const nextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);

  // Рендер номеров страниц
  const renderPageNumbers = () => {
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    const pageNumbers = [];
    if (startPage > 1) pageNumbers.push(<span key="start">...</span>);
    
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => paginate(i)}
          className={`mx-1 px-3 py-2 rounded ${currentPage === i ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPages) pageNumbers.push(<span key="end">...</span>);
    return pageNumbers;
  };

  return (
    <Layout>
      <div className="min-h-screen">
        <div className="page-container">
          <main className="container mx-auto py-8">
            <div className="p-6">
              <NewsList 
                news={currentNews} 
                onVote={handleVote}                
                onSort={handleSortChange}
                sortBy={sortBy}
                sortDirection={sortDirection}
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
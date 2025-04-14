import React from 'react';
import { useRouter } from 'next/router';
import { NewsItem } from '../types/news';

interface NewsListProps {
    news: NewsItem[];
    onVote: (newsItemId: string, voteType: 'like' | 'dislike') => void;
    onSort: (column: string) => void;
    sortBy: string;
    sortDirection: 'asc' | 'desc';
}

const NewsList: React.FC<NewsListProps> = ({ news, onVote, onSort, sortBy, sortDirection }) => {
  const router = useRouter();

  const handleTitleClick = (newsItemId: string) => {
    router.push(`/news/${newsItemId}`);
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border-b text-left">Заголовок</th>
            <th onClick={() => onSort('rating')} className="py-2 px-4 border-b text-right cursor-pointer">
              Рейтинг{sortBy === 'rating' ? (sortDirection === 'asc' ? ' ↑' : ' ↓') : ''}
            </th>
            <th onClick={() => onSort('votes')} className="py-2 px-4 border-b text-right cursor-pointer">
              Голоса{sortBy === 'votes' ? (sortDirection === 'asc' ? ' ↑' : ' ↓') : ''}
            </th>
            <th onClick={() => onSort('comments')} className="py-2 px-4 border-b text-right cursor-pointer">
              Комментарии{sortBy === 'comments' ? (sortDirection === 'asc' ? ' ↑' : ' ↓') : ''}
            </th>
            <th className="py-2 px-4 border-b text-center w-32">Голосовать</th>
          </tr>
        </thead>
        <tbody>
          {news.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50">
              <td className="py-2 px-4 border-b">
                <a onClick={() => handleTitleClick(item.id)} className="text-blue-500 hover:underline cursor-pointer">
                  {item.title}
                </a>
              </td>
              <td className="py-2 px-4 border-b text-right">{item.rating}</td>
              <td className="py-2 px-4 border-b text-right">{item.votes}</td>
              <td className="py-2 px-4 border-b text-right">{item.comments ? item.comments.length : 0}</td>
              <td className="py-2 px-4 border-b text-center w-32">
                <button 
                  onClick={() => onVote(item.id, 'like')} 
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-1 flex items-center justify-center"
                  aria-label="Like"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="w-5 h-5" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" 
                    />
                  </svg>
                </button>
                <button 
                  onClick={() => onVote(item.id, 'dislike')} 
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded flex items-center justify-center"
                  aria-label="Dislike"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="w-5 h-5" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.017a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" 
                    />
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NewsList;
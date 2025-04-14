import React from 'react';
import { useRouter } from 'next/router';
import { NewsItem } from '../types/news';
import { LikeIcon,} from '../components/icons/LikeIcon'; // Путь уточните по своей структуре
import { DislikeIcon,} from '../components/icons/DislikeIcon'; // Путь уточните по своей структуре

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
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border-b text-left">Заголовок</th>
            <th 
              onClick={() => onSort('rating')} 
              className="py-2 px-4 border-b text-right cursor-pointer"
            >
              Рейтинг{sortBy === 'rating' ? (sortDirection === 'asc' ? ' ↑' : ' ↓') : ''}
            </th>
            <th 
              onClick={() => onSort('votes')} 
              className="py-2 px-4 border-b text-right cursor-pointer"
            >
              Голоса{sortBy === 'votes' ? (sortDirection === 'asc' ? ' ↑' : ' ↓') : ''}
            </th>
            <th 
              onClick={() => onSort('comments')} 
              className="py-2 px-4 border-b text-right cursor-pointer"
            >
              Комментарии{sortBy === 'comments' ? (sortDirection === 'asc' ? ' ↑' : ' ↓') : ''}
            </th>
            <th className="py-2 px-4 border-b text-center w-32">Голосовать</th>
          </tr>
        </thead>
        <tbody>
          {news.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50">
              <td className="py-2 px-4 border-b">
                <button 
                  onClick={() => handleTitleClick(item.id)} 
                  className="text-blue-500 hover:underline"
                >
                  {item.title}
                </button>
              </td>
              <td className="py-2 px-4 border-b text-right">{item.rating}</td>
              <td className="py-2 px-4 border-b text-right">{item.votes}</td>
              <td className="py-2 px-4 border-b text-right">{item.comments?.length || 0}</td>
              <td className="py-2 px-4 border-b text-center w-32 space-x-1">
                <button
                  onClick={() => onVote(item.id, 'like')}
                  className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded transition-colors"
                  aria-label="Like"
                >
                  <LikeIcon className="w-5 h-5" />
                </button>
                <button
                  onClick={() => onVote(item.id, 'dislike')}
                  className="bg-red-500 hover:bg-red-700 text-white p-2 rounded transition-colors"
                  aria-label="Dislike"
                >
                  <DislikeIcon className="w-5 h-5" />
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
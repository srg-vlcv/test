import React from 'react';
import { useRouter } from 'next/router';
import { NewsItem } from '../types/news';

interface NewsListProps {
  news: NewsItem[];
  onVote: (newsItemId: string, voteType: 'like' | 'dislike') => void;
}

const NewsList: React.FC<NewsListProps> = ({ news, onVote }) => {
  const router = useRouter();

  const handleTitleClick = (newsItemId: string) => {
    router.push(`/news/${newsItemId}`);
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border-b text-left">Title</th>
            <th className="py-2 px-4 border-b text-right">Rating</th>
            <th className="py-2 px-4 border-b text-right">Votes</th>
            <th className="py-2 px-4 border-b text-center">Vote</th>
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
              <td className="py-2 px-4 border-b text-center">
                <button onClick={() => onVote(item.id, 'like')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-1">
                  Like
                </button>
                <button onClick={() => onVote(item.id, 'dislike')} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
                  Dislike
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
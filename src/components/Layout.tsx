import React, { ReactNode } from 'react';
import Link from 'next/link';
import { VKIcon } from '../components/icons/VKIcon';
import { TelegramIcon } from '../components/icons/TelegramIcon';
import { DzenIcon } from '../components/icons/DzenIcon';
import AppHeader from './AppHeader'; // Импорт нового компонента

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Добавляем шапку здесь */}
      <AppHeader />
      
      <main className="container mx-auto py-8">
        {children}
      </main>

      {/* Футер остаётся без изменений */}
      <footer className="frosted-glass py-4 mt-8">
        <div className="container mx-auto flex justify-between items-center">
          <p>&copy; 2025 Neuro-wire. All rights reserved.</p>
          <div className="flex space-x-4">
            <a 
              href="https://dzen.ru/neurowire" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-800 transition-colors"
              aria-label="Dzen"
            >
              <DzenIcon className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10" />
            </a>
            <a 
              href="https://vk.com/neurowire" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-800 transition-colors"
              aria-label="VK"
            >
              <VKIcon className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10" />
            </a>
            <a 
              href="https://t.me/neurowire" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-800 transition-colors"
              aria-label="Telegram"
            >
              <TelegramIcon className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
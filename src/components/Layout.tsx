import React, { ReactNode } from 'react';
import Link from 'next/link';
import { VKIcon } from '../components/icons/VKIcon';
import { TelegramIcon } from '../components/icons/TelegramIcon';
import { DzenIcon } from '../components/icons/DzenIcon';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto py-8">
        {children}
      </main>

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
              <DzenIcon className="w-8 h-8" />
            </a>
            <a 
              href="https://vk.com/neurowire" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-800 transition-colors"
              aria-label="VK"
            >
              <VKIcon className="w-8 h-8" />
            </a>
            <a 
              href="https://t.me/neurowire" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-800 transition-colors"
              aria-label="Telegram"
            >
              <TelegramIcon className="w-8 h-8" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
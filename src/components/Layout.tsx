import React, { ReactNode } from 'react';
import Link from 'next/link';

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
            <a href="https://dzen.ru/neurowire" target="_blank" rel="noopener noreferrer">
              <img src="/dzen.svg" alt="Dzen" width="34" height="34" />
            </a>
            <a href="https://vk.com/neurowire" target="_blank" rel="noopener noreferrer">
              <img src="/vk.svg" alt="VK" width="34" height="34" />
            </a>
            <a href="https://t.me/neurowire" target="_blank" rel="noopener noreferrer">
              <img src="/tg.svg" alt="Telegram" width="34" height="34" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
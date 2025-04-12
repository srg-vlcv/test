import React, { ReactNode } from 'react';
import Link from 'next/link';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="frosted-glass py-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-serif font-semibold">
            Neuro-wire
          </Link>
          <div>
            <Link href="/create" className="button primary">
              Create+
            </Link>
            <button className="button secondary" onClick={() => alert('Rating clicked!')}>
              Rating
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto py-8">
        {children}
      </main>

      <footer className="frosted-glass py-4 mt-8">
        <div className="container mx-auto flex justify-between items-center">
          <p>&copy; 2023 Neuro-wire. All rights reserved.</p>
          <div className="flex space-x-4">
            <a href="#" target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href="#" target="_blank" rel="noopener noreferrer">Twitter</a>
            <a href="#" target="_blank" rel="noopener noreferrer">Instagram</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
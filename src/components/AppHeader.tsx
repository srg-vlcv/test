import Link from 'next/link';

const AppHeader = () => {
  return (
    <header className="frosted-glass py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-serif font-semibold">
          Neuro-wire
        </Link>
        <div>
          <Link href="/create" className="button primary">
            Create+
          </Link>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
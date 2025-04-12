import { useRouter } from 'next/router';
import React from 'react';

const BackButton: React.FC = () => {
  const router = useRouter();

  const handleClick = () => {
    router.back();
  };

  return (
    <button className="button secondary" onClick={handleClick}>
      Back
    </button>
  );
};

export default BackButton;

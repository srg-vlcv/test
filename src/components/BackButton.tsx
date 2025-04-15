/* Кнопка «Назад» всегда под шапкой, перед контентом 
import React from 'react';

const BackButton: React.FC = () => {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
    >
      Взад
    </button>
  );
};

export default BackButton;*/

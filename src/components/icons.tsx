// components/icons.tsx
import React from 'react'

const baseSize = "w-12 h-12" // Размер 32x32px (2rem = 32px)

export const icons: React.FC<{ SizeSVG?: string }>[] = [
  // Все иконки получат классы: ${baseSize} и переданный className
  // Добавлен preserveAspectRatio для единого масштабирования
  
  // 1. Пунктирный круг
  ({ SizeSVG }) => (
    <svg 
      className={`${baseSize} ${SizeSVG}`} 
      viewBox="0 0 64 64"
      preserveAspectRatio="xMidYMid meet"
    >
      <circle cx="32" cy="32" r="28" fill="none" stroke="currentColor" strokeWidth="4" strokeDasharray="4 8"/>
    </svg>
  ),

  // 4. Перекрывающиеся круги
  ({ SizeSVG }) => (
    <svg 
      className={`${baseSize} ${SizeSVG}`} 
      viewBox="0 0 64 64"
      preserveAspectRatio="xMidYMid meet"
    >
      <circle cx="20" cy="32" r="20" fill="currentColor" opacity="0.8"/>
      <circle cx="44" cy="32" r="20" fill="currentColor" opacity="0.8"/>
    </svg>
  ),

  // 5. Мозаика
  ({ SizeSVG }) => (
    <svg 
      className={`${baseSize} ${SizeSVG}`} 
      viewBox="0 0 64 64"
      preserveAspectRatio="xMidYMid meet"
    >
      <rect width="32" height="32" fill="currentColor"/>
      <rect x="32" y="32" width="32" height="32" fill="currentColor"/>
      <path d="M32 0l32 32-32 32-32-32z" fill="currentColor"/>
    </svg>
  ),

  // 7. Абстрактное дерево
  ({ SizeSVG }) => (
    <svg 
      className={`${baseSize} ${SizeSVG}`} 
      viewBox="0 0 64 64"
      preserveAspectRatio="xMidYMid meet"
    >
      <rect x="28" y="20" width="8" height="40" fill="currentColor"/>
      <circle cx="32" cy="16" r="12" fill="currentColor"/>
    </svg>
  ),

  // 9. Соты
  ({ SizeSVG }) => (
    <svg 
      className={`${baseSize} ${SizeSVG}`} 
      viewBox="0 0 64 64"
      preserveAspectRatio="xMidYMid meet"
    >
      <path d="M24 0l24 14v28l-24 14-24-14V14z" fill="currentColor"/>
      <path d="M0 28l24 14 24-14-24-14z" fill="currentColor"/>
    </svg>
  ),

  // 11. Пиксельное сердце
  ({ SizeSVG }) => (
    <svg 
      className={`${baseSize} ${SizeSVG}`} 
      viewBox="0 0 64 64"
      preserveAspectRatio="xMidYMid meet"
    >
      <rect x="20" y="24" width="8" height="8" fill="currentColor"/>
      <rect x="36" y="24" width="8" height="8" fill="currentColor"/>
      <rect x="16" y="32" width="32" height="8" fill="currentColor"/>
      <rect x="8" y="40" width="48" height="8" fill="currentColor"/>
    </svg>
  ),

  // 12. Капля
  ({ SizeSVG }) => (
    <svg 
      className={`${baseSize} ${SizeSVG}`} 
      viewBox="0 0 64 64"
      preserveAspectRatio="xMidYMid meet"
    >
      <path d="M32 12c12 16 24 32 24 40a24 24 0 0 1-48 0c0-8 12-24 24-40z" fill="currentColor"/>
    </svg>
  ),

  // 13. Кольца
  ({ SizeSVG }) => (
    <svg 
      className={`${baseSize} ${SizeSVG}`} 
      viewBox="0 0 64 64"
      preserveAspectRatio="xMidYMid meet"
    >
      <circle cx="32" cy="32" r="24" fill="none" stroke="currentColor" strokeWidth="4"/>
      <circle cx="32" cy="32" r="16" fill="none" stroke="currentColor" strokeWidth="4"/>
    </svg>
  ),

  // 14. Стрелки
  ({ SizeSVG }) => (
    <svg 
      className={`${baseSize} ${SizeSVG}`} 
      viewBox="0 0 64 64"
      preserveAspectRatio="xMidYMid meet"
    >
      <path d="M32 0l16 32-16 16-16-16zm0 64L16 32 32 16l16 16z" fill="currentColor"/>
    </svg>
  ),

  // 15. Наложение фигур
  ({ SizeSVG }) => (
    <svg 
      className={`${baseSize} ${SizeSVG}`} 
      viewBox="0 0 64 64"
      preserveAspectRatio="xMidYMid meet"
    >
      <rect x="8" y="8" width="48" height="48" fill="currentColor" transform="rotate(45 32 32)"/>
      <circle cx="32" cy="32" r="16" fill="currentColor"/>
    </svg>
  ),

  // Смайлик
  ({ SizeSVG }) => (
    <svg 
      className={`${baseSize} ${SizeSVG}`} 
      viewBox="0 0 64 64"
      preserveAspectRatio="xMidYMid meet"
    >
      <circle cx="32" cy="32" r="30" fill="currentColor"/>
      <circle cx="24" cy="26" r="3" fill="currentColor"/>
      <circle cx="40" cy="26" r="3" fill="currentColor"/>
      <path d="M22 38c4 4 16 4 20 0" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>
    </svg>
  ),

  // Красный пунктир
  ({ SizeSVG }) => (
    <svg 
      className={`${baseSize} ${SizeSVG}`} 
      viewBox="0 0 64 64"
      preserveAspectRatio="xMidYMid meet"
    >
      <circle cx="32" cy="32" r="28" fill="currentColor" stroke="currentColor" strokeWidth="4" strokeDasharray="8,4"/>
    </svg>
  ),
]
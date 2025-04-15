// components/icons.tsx
import React from 'react'

export const icons: React.FC<{ className?: string }>[] = [
  // 1. Пунктирный круг
  ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
      <circle cx="32" cy="32" r="28" fill="none" stroke="#a0aec0" strokeWidth="4" strokeDasharray="4 8"/>
    </svg>
  ),

  // 4. Перекрывающиеся круги
  ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
      <circle cx="20" cy="32" r="20" fill="#4fd1c5" opacity="0.8"/>
      <circle cx="44" cy="32" r="20" fill="#fc8181" opacity="0.8"/>
    </svg>
  ),

  // 5. Мозаика
  ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
      <rect width="32" height="32" fill="#e2e8f0"/>
      <rect x="32" y="32" width="32" height="32" fill="#e2e8f0"/>
      <path d="M32 0l32 32-32 32-32-32z" fill="#a0aec0"/>
    </svg>
  ),

  // 7. Абстрактное дерево
  ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
      <rect x="28" y="20" width="8" height="40" fill="#4a5568"/>
      <circle cx="32" cy="16" r="12" fill="#48bb78"/>
    </svg>
  ),

  // 9. Соты
  ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
      <path d="M24 0l24 14v28l-24 14-24-14V14z" fill="#f6ad55"/>
      <path d="M0 28l24 14 24-14-24-14z" fill="#c05621"/>
    </svg>
  ),

  // 11. Пиксельное сердце
  ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
      <rect x="20" y="24" width="8" height="8" fill="#fc8181"/>
      <rect x="36" y="24" width="8" height="8" fill="#fc8181"/>
      <rect x="16" y="32" width="32" height="8" fill="#fc8181"/>
      <rect x="8" y="40" width="48" height="8" fill="#fc8181"/>
    </svg>
  ),

  // 12. Капля
  ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
      <path d="M32 12c12 16 24 32 24 40a24 24 0 0 1-48 0c0-8 12-24 24-40z" fill="#4299e1"/>
    </svg>
  ),

  // 13. Кольца
  ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
      <circle cx="32" cy="32" r="24" fill="none" stroke="#4a5568" strokeWidth="4"/>
      <circle cx="32" cy="32" r="16" fill="none" stroke="#a0aec0" strokeWidth="4"/>
    </svg>
  ),

  // 14. Стрелки
  ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
      <path d="M32 0l16 32-16 16-16-16zm0 64L16 32 32 16l16 16z" fill="#48bb78"/>
    </svg>
  ),

  // 15. Наложение фигур
  ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
      <rect x="8" y="8" width="48" height="48" fill="#f6e05e" transform="rotate(45 32 32)"/>
      <circle cx="32" cy="32" r="16" fill="#b7791f"/>
    </svg>
  ),

  // Смайлик
  ({ className }) => (
    <svg className={className} width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="30" fill="#F39C12"/>
      <circle cx="24" cy="26" r="3" fill="#FFF"/>
      <circle cx="40" cy="26" r="3" fill="#FFF"/>
      <path d="M22 38c4 4 16 4 20 0" stroke="#FFF" strokeWidth="2" fill="none" strokeLinecap="round"/>
    </svg>
  ),

  // Красный пунктир
  ({ className }) => (
    <svg className={className} width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="28" fill="#E74C3C" stroke="#C0392B" strokeWidth="4" strokeDasharray="8,4"/>
    </svg>
  ),
]

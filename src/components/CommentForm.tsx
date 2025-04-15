'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { SmartCaptcha } from '@yandex/smart-captcha';
import { icons } from './icons';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface Comment {
  id: number;
  name: string;
  email?: string;
  content: string;
  date: string;
  iconIndex: number;
}

const CommentForm: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [comments, setComments] = useState<Comment[]>([]);
  const [captchaToken, setCaptchaToken] = useState<string>('');
  const [error, setError] = useState<string>('');

  // Загрузка из localStorage
  useEffect(() => {
    const saved = localStorage.getItem('comments');
    if (saved) setComments(JSON.parse(saved));
  }, []);

  // Сохранение в localStorage
  useEffect(() => {
    localStorage.setItem('comments', JSON.stringify(comments));
  }, [comments]);
  const [captchaKey, setCaptchaKey] = useState(Date.now());
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!name.trim())    return setError('Пожалуйста, введите имя');
    if (!content.trim()) return setError('Пожалуйста, введите текст комментария');
    if (!captchaToken)   return setError('Пожалуйста, пройдите проверку каптчи');

    const iconIndex = Math.floor(Math.random() * icons.length);
    const newComment: Comment = {
      id: Date.now(),
      name,
      email,
      content,
      date: new Date().toISOString(),
      iconIndex,
    };
    setComments(prev => [newComment, ...prev]);
    setContent('');
    setCaptchaToken('');
    setCaptchaKey(Date.now()); // пересоздаёт компонент

    
  };

  return (
    
      <div className="flex items-start gap-4">
        
        

        {/* Карточка формы */}
        <div className="flex-1 bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="px-4 py-2 border-b font-semibold">
            Гость, оставьте комментарий?
          </div>

          {/* Форма */}
          <form onSubmit={handleSubmit} onChange={() => setError('')}>
            <div className="px-4 py-3 space-y-4">
              {/* Имя и E‑mail */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="comment-name" className="block text-sm">
                    Имя:<span className="text-red-500">*</span>
                  </label>
                  <input
                    id="comment-name"
                    type="text"
                    className="w-full border rounded px-2 py-1"
                    value={name}
                    onChange={e => setName(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="comment-email" className="block text-sm">
                    E‑Mail:
                  </label>
                  <input
                    id="comment-email"
                    type="email"
                    className="w-full border rounded px-2 py-1"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </div>
              </div>

              {/* WYSIWYG‑редактор */}
              <div className="border rounded">
                <ReactQuill
                  theme="snow"
                  value={content}
                  onChange={setContent}
                  placeholder="Ваш комментарий..."
                  style={{ minHeight: '180px' }}
                />
              </div>

              {/* Яндекс‑капча */}
              <SmartCaptcha
                key={captchaKey}
                sitekey="ysc1_YlpBL0WYgRXgSCI2gjm27vUgZ2ll69ea0BUZK7DR96d0f581"
                onSuccess={token => setCaptchaToken(token)}

              />

              {/* Ошибка валидации */}
              {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>

            {/* Footer формы */}
            <div className="bg-gray-50 border-t px-4 py-3 text-right">
              <button
                type="submit"
                className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded"
              >
                Отправить
              </button>
            </div>
          </form>
        </div>
      

      {/* Список комментариев */}
      <ul className="mt-6 space-y-4">
        {comments.map(c => {
          const Icon = icons[c.iconIndex];
          return (
            <li key={c.id} className="flex items-start gap-4">
              <Icon className="w-12 h-12 flex-shrink-0" />
              <div className="bg-white rounded-2xl shadow-lg p-3 flex-1">
                <div className="text-sm font-semibold">
                  {c.name}{' '}
                  <span className="text-xs text-gray-500">
                    {new Date(c.date).toLocaleString()}
                  </span>
                </div>
                <div
                  className="mt-2 prose"
                  dangerouslySetInnerHTML={{ __html: c.content }}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CommentForm;

'use client';

import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { SmartCaptcha } from '@yandex/smart-captcha';
import { icons } from './icons';
import 'react-quill/dist/quill.snow.css'; // обязательно импортируем стили Quill

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface Comment {
  id: number;
  name: string;
  email: string;
  content: string;
  date: string;
  iconIndex: number;
}

export default function CommentForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [content, setContent] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);
  const [captchaToken, setCaptchaToken] = useState('');
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [error, setError] = useState('');
  const isFirstSave = useRef(true);

  // Загрузка комментариев и флага капчи
  useEffect(() => {
    const savedComments = window.localStorage.getItem('comments');
    if (savedComments) {
      try { setComments(JSON.parse(savedComments)); } catch {}
    }
    if (window.localStorage.getItem('captchaPassed') === 'true') {
      setCaptchaVerified(true);
    }
  }, []);

  // Сохранение комментариев (пропускаем первый рендер)
  useEffect(() => {
    if (isFirstSave.current) {
      isFirstSave.current = false;
      return;
    }
    window.localStorage.setItem('comments', JSON.stringify(comments));
  }, [comments]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!name.trim())    return setError('Пожалуйста, введите имя');
    if (!content.trim()) return setError('Пожалуйста, введите текст комментария');
    if (!captchaVerified && !captchaToken) {
      return setError('Пожалуйста, пройдите проверку каптчи');
    }
    if (!captchaVerified && captchaToken) {
      window.localStorage.setItem('captchaPassed', 'true');
      setCaptchaVerified(true);
    }

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
  };

  return (
    <div className="mx-4">
      <form onSubmit={handleSubmit} onChange={() => setError('')}>
        {/* Поля Имя и E-Mail */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="comment-name" className="block text-sm font-medium">
              Имя:<span className="text-red-500">*</span>
            </label>
            <input
              id="comment-name"
              type="text"
              className="mt-1 w-full border rounded px-2 py-1"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="comment-email" className="block text-sm font-medium">
              E‑Mail:
            </label>
            <input
              id="comment-email"
              type="email"
              className="mt-1 w-full border rounded px-2 py-1"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
        </div>

        {/* Редактор */}
        <div className="border rounded mb-4">
          <ReactQuill
            theme="snow"
            value={content}
            onChange={setContent}
            placeholder="Ваш комментарий..."
            style={{ minHeight: '180px' }}
          />
        </div>

        {/* Капча */}
        {!captchaVerified && (
          <div className="mb-4">
            <SmartCaptcha
              sitekey="ваш_ключ_Yandex"
              onSuccess={token => setCaptchaToken(token)}
            />
          </div>
        )}

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <div className="text-right mb-8">
          <button
            type="submit"
            className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded"
          >
            Отправить
          </button>
        </div>
      </form>

      {/* Список комментариев */}
      <ul className="space-y-4">
        {comments.map(c => {
          const Icon = icons[c.iconIndex];
          return (
            <li key={c.id} className="flex items-start gap-4">
              <Icon SizeSVG="w-12 h-12 flex-shrink-0" />
              <div className="bg-white rounded-2xl shadow p-3 flex-1">
                <div className="text-sm font-semibold">
                  {c.name}{' '}
                  <span className="text-xs text-gray-500">
                    {new Date(c.date).toLocaleString()}
                  </span>
                </div>
                {/* Оборачиваем HTML в контейнер с классом ql-editor для корректных стилей */}
                <div
                  className="mt-2 ql-editor ql-snow"
                  dangerouslySetInnerHTML={{ __html: c.content }}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

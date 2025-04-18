// src/pages/api/news/index.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { getNews, createNews } from '../../../services/newsService';


export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    return res.status(200).json(getNews());
  }
  if (req.method === 'POST') {
    const { title, content } = req.body;
    const newItem = createNews({ title, content });
    return res.status(201).json(newItem);
  }
  res.setHeader('Allow', ['GET','POST']);
  res.status(405).end();
}

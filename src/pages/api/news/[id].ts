// src/pages/api/news/[id].ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { getNewsItem, addComment } from '../../../services/newsService';


export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query as { id: string };

  if (req.method === 'GET') {
    const item = getNewsItem(id);
    return item
      ? res.status(200).json(item)
      : res.status(404).json({ message: 'Not found' });
  }

  if (req.method === 'POST') {
    const { author, text } = req.body;
    const comment = addComment(id, { author, text });
    return res.status(201).json(comment);
  }

  res.setHeader('Allow', ['GET','POST']);
  res.status(405).end();
}

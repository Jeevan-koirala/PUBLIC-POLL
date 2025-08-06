import { NextApiRequest, NextApiResponse } from 'next';
import { pollDB } from './db';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (!id || typeof id !== 'string' || !pollDB[id]) {
    return res.status(404).json({ error: 'Poll not found' });
  }

  res.status(200).json(pollDB[id]);
}

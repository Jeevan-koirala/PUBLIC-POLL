import { pollDB } from './db';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { question, options } = req.body;
    const id = Math.random().toString(36).substring(2, 8);
    pollDB[id] = {
      question,
      options,
      votes: Array(options.length).fill(0),
    };
    res.status(200).json({ id });
  } else {
    res.status(405).end();
  }
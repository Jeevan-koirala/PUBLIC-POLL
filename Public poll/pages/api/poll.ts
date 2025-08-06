import { pollDB } from './db';
export default function handler(req, res) {
  const { id } = req.query;
  if (!pollDB[id]) {
    return res.status(404).json({ error: 'Poll not found' });
  }
  res.status(200).json(pollDB[id]);
}
import { pollDB } from './db';
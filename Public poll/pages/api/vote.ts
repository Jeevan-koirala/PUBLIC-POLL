import { pollDB } from './db';
export default function handler(req, res) {
  const { id, index } = req.body;
  if (!pollDB[id]) return res.status(404).json({ error: 'Poll not found' });
  pollDB[id].votes[index]++;
  res.status(200).json({ success: true });
}
import { pollDB } from './db';

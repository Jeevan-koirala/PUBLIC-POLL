// pages/poll/[id].tsx
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function PollPage() {
  const router = useRouter();
  const { id } = router.query;
  const [poll, setPoll] = useState(null);
  const [voted, setVoted] = useState(false);

  useEffect(() => {
    if (id) {
      fetch(`/api/poll?id=${id}`)
        .then((res) => res.json())
        .then((data) => setPoll(data));
    }
  }, [id]);

  const handleVote = async (index: number) => {
    if (voted) return;
    await fetch('/api/vote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, index }),
    });
    setVoted(true);
    const res = await fetch(`/api/poll?id=${id}`);
    const data = await res.json();
    setPoll(data);
  };

  if (!poll) return <div className="p-4">Loading...</div>;

  return (
    <main className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{poll.question}</h1>
      {poll.options.map((opt: string, i: number) => (
        <div key={i} className="mb-2">
          <button
            className="bg-gray-100 hover:bg-gray-200 px-4 py-2 w-full text-left rounded"
            onClick={() => handleVote(i)}
            disabled={voted}
          >
            {opt}
          </button>
          {voted && (
            <div className="bg-green-500 text-white text-sm px-2 py-1 rounded mt-1">
              {poll.votes[i]} votes
            </div>
          )}
        </div>
      ))}
    </main>
  );
}

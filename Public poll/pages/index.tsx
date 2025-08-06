import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '']);
  const router = useRouter();

  const handleCreatePoll = async () => {
    const res = await fetch('/api/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question, options }),
    });
    const data = await res.json();
    router.push(`/poll/${data.id}`);
  };

  return (
    <main className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create a poll</h1>
      <input
        className="border p-2 w-full mb-4"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Poll question"
      />
      {options.map((opt, i) => (
        <input
          key={i}
          className="border p-2 w-full mb-2"
          value={opt}
          onChange={(e) => {
            const newOptions = [...options];
            newOptions[i] = e.target.value;
            setOptions(newOptions);
          }}
          placeholder={`Option ${i + 1}`}
        />
      ))}
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => setOptions([...options, ''])}
      >
        Add Option
      </button>
      <button
        className="bg-green-600 text-white px-4 py-2 rounded ml-2"
        onClick={handleCreatePoll}
      >
        Create Poll
      </button>
    </main>
  );
}
'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function SearchPage() {
  const [strains, setStrains] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (!query) return;
    fetch(`/api/strain?query=${query}`)
      .then(res => res.json())
      .then(setStrains);
  }, [query]);

  return (
    <div className="p-4 text-white">
      <input
        type="text"
        placeholder="Search by keyword..."
        value={query}
        onChange={e => setQuery(e.target.value)}
        className="p-2 bg-gray-900 border border-gray-600 w-full"
      />
      <ul className="mt-4 space-y-2">
        {strains.map((s: any) => (
          <li key={s.id}>
            <Link href={`/strain/${s.id}`} className="underline">
              {s.name} ({s.family})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
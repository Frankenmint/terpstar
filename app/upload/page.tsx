'use client';
import { useState } from 'react';

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState('');

  const handleUpload = async () => {
    if (!file) return;
    const text = await file.text();
    try {
      const json = JSON.parse(text);
      const res = await fetch('/api/import-csv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(json),
      });
      const data = await res.json();
      if (res.ok) setMessage(`Imported ${data.inserted} entries.`);
      else setMessage(`Error: ${data.error}`);
    } catch (err) {
      setMessage('Failed to parse file. Ensure it is valid JSON.');
    }
  };

  return (
    <div className="p-4 text-white">
      <h1 className="text-xl font-bold mb-2">Import Strain Data (JSON)</h1>
      <input
        type="file"
        accept="application/json"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="mb-4 block"
      />
      <button
        onClick={handleUpload}
        disabled={!file}
        className="bg-green-600 px-4 py-2 rounded text-white disabled:opacity-50"
      >
        Upload
      </button>
      {message && <p className="mt-4 text-sm text-yellow-400">{message}</p>}
    </div>
  );
}
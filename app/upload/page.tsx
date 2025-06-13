'use client';
import { useState } from 'react';

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState('');

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append('csv', file);

    const res = await fetch('/api/upload-csv', { method: 'POST', body: formData });
    const json = await res.json();
    setMessage(json.message || 'Done');
  };

  return (
    <main className="p-6 text-white bg-black min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Upload CSV of Strains</h1>
      <input type="file" accept=".csv" onChange={(e) => setFile(e.target.files?.[0] || null)} className="text-black" />
      <button
        onClick={handleUpload}
        className="mt-4 px-4 py-2 bg-green-500 hover:bg-green-700 rounded"
      >
        Upload
      </button>
      <p className="mt-4 text-green-400">{message}</p>
    </main>
  );
}
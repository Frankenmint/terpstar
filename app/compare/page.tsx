'use client';
import { useEffect, useState } from 'react';

export default function ComparePage() {
  const [ids, setIds] = useState('');
  const [strains, setStrains] = useState([]);

  useEffect(() => {
    const idList = ids.split(',').map(id => parseInt(id.trim())).filter(Boolean);
    if (idList.length === 0) return;
    fetch(`/api/strain?query=`) // fallback fetch
      .then(res => res.json())
      .then(data => {
        const selected = data.filter((s: any) => idList.includes(s.id));
        setStrains(selected);
      });
  }, [ids]);

  return (
    <div className="p-4 text-white">
      <input
        type="text"
        placeholder="Enter comma-separated strain IDs (e.g., 1,2,3)"
        value={ids}
        onChange={e => setIds(e.target.value)}
        className="p-2 mb-4 bg-gray-900 border border-gray-600 w-full"
      />
      {strains.length > 0 && (
        <table className="w-full text-sm">
          <thead>
            <tr>
              <th className="text-left">Strain</th>
              <th>Family</th>
              <th>Effects</th>
              <th>Tags</th>
              <th>Lineage</th>
            </tr>
          </thead>
          <tbody>
            {strains.map((s: any) => (
              <tr key={s.id} className="border-t border-gray-700">
                <td>{s.name}</td>
                <td>{s.family}</td>
                <td>{s.effects}</td>
                <td>{s.tags?.join(', ')}</td>
                <td>{s.lineage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
// This page allows users to compare multiple strains by their IDs.
// Users can enter comma-separated IDs, and the app fetches and displays the relevant strain data in a table format.
// The table includes columns for strain name, family, effects, tags, and lineage.
// This is useful for users who want to quickly compare different strains side by side based on their characteristics.
// The page uses client-side state management to handle the input and fetched data.
// It also includes basic error handling to ensure that only valid IDs are processed.
// The design is kept simple and functional, focusing on usability and clarity for the user.
// The page is styled with Tailwind CSS for a modern and responsive design.
// The input field allows users to easily enter and modify the strain IDs they want to compare.
// The table dynamically updates to show the strains that match the entered IDs, providing a clear comparison view.
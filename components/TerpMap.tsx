'use client';
import { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';

export default function TerpMap() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/terpmap')
      .then(res => res.json())
      .then(setData);
  }, []);

  return (
    <Plot
      data={[{
        x: data.map(d => d.x),
        y: data.map(d => d.y),
        text: data.map(d => d.name),
        mode: 'markers',
        marker: {
          size: 12,
          color: data.map(d => d.color || 'white'),
          opacity: 0.85
        },
        type: 'scattergl'
      }]}
      layout={{
        width: 600,
        height: 400,
        paper_bgcolor: '#000',
        plot_bgcolor: '#000',
        font: { color: '#fff' },
        title: 'Terpene Map of the Stars',
        xaxis: { showgrid: false },
        yaxis: { showgrid: false }
      }}
    />
  );
}
'use client';
import { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';

export default function TerpMap() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    // Fake UMAP-style 2D data; replace with real output from PCA/UMAP later
    setData([
      { x: 0.12, y: -0.97, name: 'Jack Herer', color: 'orange' },
      { x: 0.13, y: -0.95, name: 'Bruce Banner', color: 'lime' },
      { x: 0.90, y: 0.31, name: 'Northern Lights', color: 'blue' }
    ]);
  }, []);

  return (
    <Plot
      data={[
        {
          x: data.map((d) => d.x),
          y: data.map((d) => d.y),
          text: data.map((d) => d.name),
          mode: 'markers',
          marker: {
            size: 12,
            color: data.map((d) => d.color),
            opacity: 0.8
          },
          type: 'scattergl',
        },
      ]}
      layout={{
        width: 600,
        height: 400,
        paper_bgcolor: '#000',
        plot_bgcolor: '#000',
        font: { color: '#fff' },
        title: 'Terpene Map of the Stars',
        xaxis: { showgrid: false },
        yaxis: { showgrid: false },
      }}
    />
  );
}
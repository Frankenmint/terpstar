import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { Scatter } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';
import 'chartjs-plugin-colorschemes';

ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

interface TerpPoint {
  id: number;
  name: string;
  x: number;
  y: number;
  dominantTerpene: string;
  intensity: number; // 0 to 1 scale
}

interface Props {
  data: TerpPoint[];
  highlightId?: number;
  onClickStrain?: (id: number) => void;
}

export default function TerpMapPlot({ data, highlightId, onClickStrain }: Props) {
  const chartRef = useRef(null);
  const router = useRouter();

  const chartData = {
    datasets: [
      {
        label: 'Strains',
        data: data.map((point) => ({ x: point.x, y: point.y })),
        backgroundColor: data.map((point) => {
          const base = terpeneColor(point.dominantTerpene, point.intensity);
          return point.id === highlightId ? 'rgba(255, 255, 255, 1)' : base;
        }),
        pointRadius: data.map((point) => (point.id === highlightId ? 10 : 7)),
        pointHoverRadius: 10,
      },
    ],
  };

  const options = {
    onClick: (_e: any, elements: any[]) => {
      if (elements.length > 0) {
        const index = elements[0].index;
        const strain = data[index];
        if (onClickStrain) onClickStrain(strain.id);
        else router.push(`/strain/${strain.id}`);
      }
    },
    scales: {
      x: { beginAtZero: false, ticks: { color: '#888' }, grid: { color: '#333' } },
      y: { beginAtZero: false, ticks: { color: '#888' }, grid: { color: '#333' } },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#111',
        titleColor: '#0f0',
        bodyColor: '#fff',
        callbacks: {
          label: function (ctx: any) {
            const strain = data[ctx.dataIndex];
            return `${strain.name} (${strain.dominantTerpene})`;
          },
        },
      },
    },
    maintainAspectRatio: false,
  };

  const terpeneLegend = Object.keys(baseColors).map((terpene) => (
    <div key={terpene} className="flex items-center space-x-2">
      <span className="w-4 h-4 rounded-full" style={{ backgroundColor: baseColors[terpene] }}></span>
      <span className="text-sm text-white capitalize">{terpene}</span>
    </div>
  ));

  return (
    <div className="bg-gradient-to-br from-black via-gray-900 to-black rounded-2xl shadow-lg p-4">
      <h2 className="text-xl text-center text-white font-bold mb-4">🌈 TerpStar Map</h2>
      <div className="flex flex-col lg:flex-row">
        <div className="flex-1 h-[600px]">
          <Scatter ref={chartRef} data={chartData} options={options} />
        </div>
        <div className="lg:ml-4 mt-4 lg:mt-0 w-full lg:w-[200px] space-y-2">
          <h3 className="text-white text-md font-semibold">Legend</h3>
          <div className="grid grid-cols-2 gap-2">
            {terpeneLegend}
          </div>
        </div>
      </div>
    </div>
  );
}

const baseColors: { [key: string]: string } = {
  myrcene: '#7B1FA2',
  limonene: '#FBC02D',
  caryophyllene: '#F57C00',
  pinene: '#388E3C',
  linalool: '#7986CB',
  humulene: '#5D4037',
  terpinolene: '#0097A7',
  ocimene: '#E91E63',
  bisabolol: '#FFB300',
  camphene: '#00BCD4',
  valencene: '#CDDC39',
  eucalyptol: '#4CAF50',
  geraniol: '#F06292',
  nerolidol: '#9CCC65',
  borneol: '#A1887F',
  phytol: '#4E342E',
  isopulegol: '#AED581',
  sabinene: '#CE93D8',
};

function terpeneColor(name: string, intensity: number) {
  const hex = baseColors[name.toLowerCase()] || '#BDBDBD';
  return fadeHex(hex, intensity);
}

function fadeHex(hex: string, alpha: number): string {
  const rgb = hex
    .replace('#', '')
    .match(/.{1,2}/g)
    ?.map((x) => parseInt(x, 16)) || [0, 0, 0];
  return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${alpha.toFixed(2)})`;
}

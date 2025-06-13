'use client';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Tooltip } from 'recharts';

export default function TerpRadar({ data }: { data: Record<string, number> }) {
  const chartData = Object.entries(data).map(([key, value]) => ({ terpene: key, value }));

  return (
    <RadarChart outerRadius={90} width={500} height={300} data={chartData}>
      <PolarGrid stroke="#444" />
      <PolarAngleAxis dataKey="terpene" stroke="#ccc" />
      <PolarRadiusAxis angle={30} domain={[0, 1]} stroke="#666" />
      <Radar name="Profile" dataKey="value" stroke="#42f5e3" fill="#42f5e3" fillOpacity={0.6} />
      <Tooltip />
    </RadarChart>
  );
}
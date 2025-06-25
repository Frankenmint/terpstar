import prisma from '@/lib/prisma';
import TerpRadar from '../../../components/TerpRadar';
import { notFound } from 'next/navigation';

export default async function StrainPage({ params, searchParams }: { params: { slug: string }, searchParams: { highlightId?: string } }) {
  const strain = await prisma.strain.findUnique({ where: { slug: params.slug } });
  if (!strain) return notFound();

  let terpeneProfile = {};
  if (strain.terpenes) {
    try {
      terpeneProfile = JSON.parse(strain.terpenes);
    } catch {
      terpeneProfile = {};
    }
  }

  return (
    <div className="p-4 text-white">
      <h1 className="text-2xl font-bold">{strain.name}</h1>
      <p className="text-sm text-gray-400">{strain.family}</p>
      <div className="mt-2">
        <strong>Effects:</strong> {strain.effects || 'N/A'}
      </div>
      <div>
        <strong>Tags:</strong> {strain.tags?.join(', ') || 'N/A'}
      </div>
      <div>
        <strong>Lineage:</strong> {strain.lineage || 'N/A'}
      </div>
      <div className="mt-4">
        <a
          className="inline-block mt-2 text-blue-400 underline"
          href={`https://www.dutchie.com/search?q=${encodeURIComponent(strain.name)}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          🔎 Find {strain.name} near you on Dutchie
        </a>
      </div>
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2">Terpene Profile</h2>
        <TerpRadar data={terpeneProfile} />
      </div>
    </div>
  );
}

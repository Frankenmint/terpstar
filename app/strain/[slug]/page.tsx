// app/strain/[slug]/page.tsx
import prisma from '@/lib/prisma';
import TerpRadar from '@/components/TerpRadar';
import Layout from '@/components/Layout';
import Link from 'next/link';
import DuchieLink from '@/components/DuchieLink';

export default async function StrainPage({ params }: { params: { slug: string } }) {
  const strain = await prisma.strain.findUnique({ where: { slug: params.slug } });
  if (!strain) return <div className="p-4 text-white">Strain not found.</div>;

  let terpeneProfile = {};
  if (strain.terpenes) {
    try {
      terpeneProfile = JSON.parse(strain.terpenes);
    } catch {
      terpeneProfile = {};
    }
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-4 text-white">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">{strain.name}</h1>
        <p className="text-sm text-gray-400 mb-4">{strain.family}</p>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <div>
              <strong>Effects:</strong> {strain.effects || 'N/A'}
            </div>
            <div>
              <strong>Tags:</strong> {strain.tags?.join(', ') || 'N/A'}
            </div>
            <div>
              <strong>Lineage:</strong> {strain.lineage || 'N/A'}
            </div>
            <DuchieLink strainName={strain.name} />
          </div>

          <div className="bg-zinc-900 rounded-xl p-4 shadow-lg">
            <h2 className="text-lg font-semibold mb-2">Terpene Profile</h2>
            <TerpRadar data={terpeneProfile} />
          </div>
        </div>

        <div className="mt-10">
          <Link href="/strains" className="text-sm text-blue-400 hover:underline">← Back to all strains</Link>
        </div>
      </div>
    </Layout>
  );
}

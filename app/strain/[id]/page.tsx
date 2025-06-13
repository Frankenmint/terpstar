import prisma from '@/lib/prisma';

export default async function StrainPage({ params }: { params: { id: string } }) {
  const strain = await prisma.strain.findUnique({ where: { id: parseInt(params.id) } });
  if (!strain) return <div className="p-4">Strain not found.</div>;

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
    </div>
  );
}
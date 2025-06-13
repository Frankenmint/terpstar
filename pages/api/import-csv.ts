// 2. /pages/api/import-csv.ts (CSV or JSON bulk import)
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');

  const payload = Array.isArray(req.body) ? req.body : [req.body];

  try {
    const result = await prisma.strain.createMany({
      data: payload.map(item => ({
        name: item.name,
        cannabinoids: item.cannabinoids || {},
        terpenes: item.terpenes || {},
        compositeProfile: item.compositeProfile || {},
        effects: item.effects || '',
        lineage: item.lineage || '',
        family: item.family || '',
        tags: item.tags || [],
      })),
      skipDuplicates: true,
    });
    return res.status(201).json({ inserted: result.count });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ error: 'Invalid payload or DB error' });
  }
}


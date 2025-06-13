import prisma from '../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const count = await prisma.strain.count();
    return res.status(200).json({ status: 'ok', strainCount: count });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: 'error', message: 'DB connection failed', error: err });
  }
}

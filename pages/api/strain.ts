// TerpStar: Strain API and CSV Import Implementation
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  switch (method) {
    case 'GET': {
      const { query } = req.query;
      const strains = await prisma.strain.findMany({
        where: {
          OR: [
            { name: { contains: String(query), mode: 'insensitive' } },
            { effects: { contains: String(query), mode: 'insensitive' } },
            { tags: { has: String(query) } },
            { family: { contains: String(query), mode: 'insensitive' } },
          ],
        },
      });
      return res.status(200).json(strains);
    }
    case 'POST': {
      const strain = await prisma.strain.create({ data: req.body });
      return res.status(201).json(strain);
    }
    case 'PUT': {
      const { id, ...data } = req.body;
      const updated = await prisma.strain.update({ where: { id }, data });
      return res.status(200).json(updated);
    }
    case 'DELETE': {
      const { id } = req.body;
      await prisma.strain.delete({ where: { id } });
      return res.status(204).end();
    }
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}

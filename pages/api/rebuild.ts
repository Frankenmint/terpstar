import type { NextApiRequest, NextApiResponse } from 'next';
import { exec } from 'child_process';
import path from 'path';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);

  if (!session || !session.user?.email) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const scriptPath = path.resolve(process.cwd(), 'scripts/generate_umap.py');

  exec(`.venv/bin/python3 ${scriptPath}`, (error, stdout, stderr) => {
    if (error) {
      console.error('UMAP generation failed:', error, stderr);
      return res.status(500).json({ error: 'UMAP script execution failed' });
    }

    console.log('UMAP generation output:', stdout);
    res.status(200).json({ message: 'UMAP coordinates updated successfully' });
  });
}

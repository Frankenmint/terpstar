import { PrismaClient } from '@prisma/client';
import { slugify } from '../lib/slugify';

const prisma = new PrismaClient();

async function main() {
  const strains = await prisma.strain.findMany();
  for (const strain of strains) {
    if (!strain.slug) {
      const slug = slugify(strain.name);
      await prisma.strain.update({
        where: { id: strain.id },
        data: { slug },
      });
      console.log(`Updated: ${strain.name} → ${slug}`);
    }
  }
}

main().finally(() => prisma.$disconnect());

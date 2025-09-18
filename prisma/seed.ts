// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import { slugify } from '../lib/slugify';

const prisma = new PrismaClient();

const strains = [
  {
    name: 'Blue Dream',
    family: 'Hybrid',
    effects: 'Uplifting, Creative, Relaxed',
    tags: ['daytime', 'balanced', 'classic'],
    lineage: 'Blueberry x Haze',
    terpenes: {
      myrcene: 0.4,
      pinene: 0.2,
      limonene: 0.15,
      caryophyllene: 0.1,
      linalool: 0.05,
    },
  },
  {
    name: 'Jack Herer',
    family: 'Sativa',
    effects: 'Euphoric, Energetic, Focused',
    tags: ['classic', 'energetic', 'morning'],
    lineage: 'Haze x Northern Lights #5 x Shiva Skunk',
    terpenes: {
      terpinolene: 0.35,
      pinene: 0.25,
      myrcene: 0.15,
      ocimene: 0.1,
      limonene: 0.05,
    },
  },
  {
    name: 'Granddaddy Purple',
    family: 'Indica',
    effects: 'Relaxed, Sleepy, Euphoric',
    tags: ['nighttime', 'relaxing', 'pain relief'],
    lineage: 'Purple Urkle x Big Bud',
    terpenes: {
      myrcene: 0.45,
      caryophyllene: 0.2,
      pinene: 0.1,
      humulene: 0.1,
      linalool: 0.05,
    },
  },
];

async function main() {
  for (const entry of strains) {
    await prisma.strain.upsert({
      where: { name: entry.name },
      update: {},
      create: {
        name: entry.name,
        family: entry.family,
        effects: entry.effects,
        tags: entry.tags || [],
        lineage: entry.lineage || null,
        slug: slugify(entry.name),
        terpenes: entry.terpenes ,
      },
    });
  }
  console.log(`Seeded ${strains.length} strains.`);
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());

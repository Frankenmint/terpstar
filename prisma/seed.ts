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
    cannabinoids: {
      thc: 0.180,
      cbd: 0.012,
      cbg: 0.005,
      cbc: 0.002,
      thcv: 0.001,
    },
    terpenes: {
      myrcene: 0.40,
      pinene: 0.20,
      limonene: 0.15,
      caryophyllene: 0.10,
      linalool: 0.05,
    },
  },
  {
    name: 'Jack Herer',
    family: 'Sativa',
    effects: 'Euphoric, Energetic, Focused',
    tags: ['classic', 'energetic', 'morning'],
    lineage: 'Haze x Northern Lights #5 x Shiva Skunk',
    cannabinoids: {
      thc: 0.200,
      cbd: 0.007,
      cbg: 0.010,
      cbc: 0.003,
      thcv: 0.002,
    },
    terpenes: {
      terpinolene: 0.35,
      pinene: 0.25,
      myrcene: 0.15,
      ocimene: 0.10,
      limonene: 0.05,
    },
  },
  {
    name: 'Granddaddy Purple',
    family: 'Indica',
    effects: 'Relaxed, Sleepy, Euphoric',
    tags: ['nighttime', 'relaxing', 'pain relief'],
    lineage: 'Purple Urkle x Big Bud',
    cannabinoids: {
      thc: 0.210,
      cbd: 0.000,
      cbg: 0.004,
      cbc: 0.002,
      cbn: 0.009,
    },
    terpenes: {
      myrcene: 0.45,
      caryophyllene: 0.20,
      pinene: 0.10,
      humulene: 0.10,
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
        cannabinoids: entry.cannabinoids || null,
        terpenes: entry.terpenes,
        slug: slugify(entry.name)
      },
    });
  }
  console.log(`Seeded ${strains.length} strains.`);
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());

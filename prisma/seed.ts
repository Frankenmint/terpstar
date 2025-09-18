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


{
name: 'Sour Diesel',
family: 'Sativa',
effects: 'Happy, Uplifted, Energetic',
tags: ['creative', 'focused', 'daytime'],
lineage: 'Chemdawg 91 x Super Skunk',
terpenes: { caryophyllene: 0.3, limonene: 0.2, myrcene: 0.15, pinene: 0.1, humulene: 0.05 },
},
{
name: 'OG Kush',
family: 'Hybrid',
effects: 'Relaxed, Happy, Euphoric',
tags: ['classic', 'versatile', 'strong'],
lineage: 'Chemdawg x Hindu Kush',
terpenes: { myrcene: 0.25, limonene: 0.2, caryophyllene: 0.15, linalool: 0.1, pinene: 0.05 },
},
{
name: 'Girl Scout Cookies',
family: 'Hybrid',
effects: 'Relaxed, Euphoric, Happy',
tags: ['popular', 'hybrid', 'creative'],
lineage: 'OG Kush x Durban Poison',
terpenes: { caryophyllene: 0.3, humulene: 0.15, limonene: 0.2, myrcene: 0.1, linalool: 0.05 },
},
{
name: 'Pineapple Express',
family: 'Hybrid',
effects: 'Happy, Uplifted, Energetic',
tags: ['tropical', 'uplifting', 'creative'],
lineage: 'Trainwreck x Hawaiian',
terpenes: { limonene: 0.35, pinene: 0.2, myrcene: 0.15, caryophyllene: 0.1, ocimene: 0.05 },
},
{
name: 'Wedding Cake',
family: 'Indica-dominant Hybrid',
effects: 'Relaxed, Happy, Euphoric',
tags: ['dessert', 'evening', 'strong'],
lineage: 'Triangle Kush x Animal Mints',
terpenes: { caryophyllene: 0.3, limonene: 0.2, linalool: 0.1, humulene: 0.1, myrcene: 0.05 },
},
{
name: 'Gelato',
family: 'Hybrid',
effects: 'Euphoric, Relaxed, Creative',
tags: ['dessert', 'creative', 'evening'],
lineage: 'Sunset Sherbet x Thin Mint GSC',
terpenes: { caryophyllene: 0.25, limonene: 0.2, humulene: 0.1, linalool: 0.1, myrcene: 0.05 },
},
{
name: 'Northern Lights',
family: 'Indica',
effects: 'Relaxed, Sleepy, Happy',
tags: ['nighttime', 'classic', 'relief'],
lineage: 'Afghani x Thai',
terpenes: { myrcene: 0.4, caryophyllene: 0.2, humulene: 0.1, pinene: 0.1, linalool: 0.05 },
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
        cannabinoids: entry.cannabinoids || [],
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

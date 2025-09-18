import prisma from '@/lib/prisma';


const test = await prisma.strain.findUnique({
  where: { name: "Blue Dream" }
})

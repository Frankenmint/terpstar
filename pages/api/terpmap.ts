// pages/api/terpmap.ts (if using Pages router)
// or app/api/terpmap/route.ts (if using App router)

import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const strains = await prisma.strain.findMany();

  // fake x/y for now, later replace with PCA/UMAP embedding
  const points = strains.map((s, i) => ({
    id: s.id,
    name: s.name,
    slug: s.slug,
    x: Math.cos(i) * 10 + Math.random(), 
    y: Math.sin(i) * 10 + Math.random(),
    dominantTerpene: "myrcene", // TODO: calculate from s.terpenes
    intensity: 0.8,
  }));

  return NextResponse.json(points);
}

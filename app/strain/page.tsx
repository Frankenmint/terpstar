// app/strains/page.tsx
import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function StrainsPage() {
  const strains = await prisma.strain.findMany({ orderBy: { name: "asc" } });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">All Strains</h1>
      <ul className="space-y-2">
        {strains.map((strain) => (
          <li key={strain.id}>
            <Link
              href={`/strain/${strain.slug}`}
              className="text-blue-400 hover:underline"
            >
              {strain.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

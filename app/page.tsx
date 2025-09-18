// app/page.tsx
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold">Welcome to TerpStar 🌿</h1>
      <p className="text-gray-300">
        Explore cannabis strains by terpene profiles, cannabinoids, and lineage.
      </p>
      <Link
        href="/strains"
        className="inline-block bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
      >
        Browse Strains
      </Link>
    </div>
  );
}

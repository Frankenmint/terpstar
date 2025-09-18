// components/DuchieLink.tsx
"use client";

import Link from "next/link";

interface DutchieLinkProps {
  strainName: string;
}

export default function DutchieLink({ strainName }: DutchieLinkProps) {
  // Replace this URL with your real Dutchie storefront URL pattern
  const href = `https://dutchie.com/dispensaries/your-store/menu/${encodeURIComponent(
    strainName.toLowerCase().replace(/\s+/g, "-")
  )}`;

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-green-600 underline hover:text-green-800"
    >
      Order {strainName} on Dutchie
    </Link>
  );
}
// components/Header.tsx
"use client";

export default function Header() {
  return (
    <header className="w-full bg-gray-900 text-white p-4">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">TerpStar</h1>
        <nav className="space-x-4">
          <a href="/" className="hover:underline">
            Home
          </a>
          <a href="/strains" className="hover:underline">
            Strains
          </a>
          <a href="/about" className="hover:underline">
            About
          </a>
        </nav>
      </div>
    </header>
  );
}

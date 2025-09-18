// components/Footer.tsx
"use client";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-100 text-gray-600 p-4 mt-8">
      <div className="max-w-5xl mx-auto text-center text-sm">
        <p>
          © {new Date().getFullYear()} TerpStar. All rights reserved.
        </p>
        <p>
          Built with <span className="text-pink-600">♥</span> in TypeScript +
          Next.js
        </p>
      </div>
    </footer>
  );
}

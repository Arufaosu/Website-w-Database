// src/components/BackToHome.tsx
"use client";

import Link from "next/link";

export default function BackToHome() {
  return (
    <div className="mt-4">
      <Link href="/">
        <button className="bg-gray-500 text-white rounded px-4 py-2 hover:bg-gray-600">
          Back to Home
        </button>
      </Link>
    </div>
  );
}

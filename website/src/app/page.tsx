// page.tsx
"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";

export default function LandingPage() {
  const { isSignedIn } = useAuth();
  const router = useRouter();

  if (isSignedIn) {
    router.push("/home");
    return null; // Prevents further rendering
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-700 to-purple-900 text-white">
      <h1 className="text-4xl font-bold">Welcome to HR Administration</h1>
      <p className="mt-4">Simplify your HR management with our platform.</p>
      <a
        href="/sign-in" // Clerk's built-in sign-in page
        className="mt-6 px-6 py-2 bg-white text-blue-700 rounded-full hover:bg-gray-200"
      >
        Sign In
      </a>
    </div>
  );
}
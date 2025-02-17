// app/home/page.tsx
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function HomePage() {
  // Wait for the auth object to resolve
  const { userId } = await auth();

  // If the user is not authenticated, redirect to the sign-in page
  if (!userId) {
    redirect("/sign-in");
    return null; // Avoid rendering anything until the redirect is complete
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-900 space-y-4">
      <h1 className="text-4xl font-bold">Welcome to the Employee Portal</h1>
      <p className="text-lg mt-2">Choose an action below:</p>

      <div className="flex flex-col space-y-4 mt-4">
        <Link href="/employees/list">
          <button className="w-64 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Employee List
          </button>
        </Link>

        <Link href="/employees/create">
          <button className="w-64 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
            Create Employee
          </button>
        </Link>

        <Link href="/departments/list">
          <button className="w-64 px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600">
            Department List
          </button>
        </Link>

        <Link href="/departments/create">
          <button className="w-64 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">
            Create Department
          </button>
        </Link>
      </div>
    </div>
  );
}
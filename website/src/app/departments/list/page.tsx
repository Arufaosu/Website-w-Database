// src/app/department/list/page.tsx
import Link from "next/link";
import { PrismaClient } from '@prisma/client';
import BackToHome from "../../components/BackToHome"; // Import the BackToHome component

const prisma = new PrismaClient();

export default async function DepartmentListPage() {
  const department = await prisma.department.findMany();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Department List</h1>
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Manager</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
            <th className="border border-gray-300 px-4 py-2">Edit</th>
          </tr>
        </thead>
        <tbody>
          {department.map((department) => (
            <tr key={department.id}>
              <td className="border border-gray-300 px-4 py-2">{department.id}</td>
              <td className="border border-gray-300 px-4 py-2">{department.name}</td>
              <td className="border border-gray-300 px-4 py-2">{department.manager}</td>
              <td className="border border-gray-300 px-4 py-2">{department.status}</td>
              <td className="border border-gray-300 px-4 py-2">
                <Link href={`/departments/edit/${department.id}`} className="text-blue-500">
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Back to Home Button */}
      <BackToHome />
    </div>
  );
}

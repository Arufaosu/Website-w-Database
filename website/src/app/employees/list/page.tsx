// src/app/employees/list/page.tsx
import Link from "next/link";
import { PrismaClient } from "@prisma/client";
import BackToHome from "../../components/BackToHome"; // Import the BackToHome component

const prisma = new PrismaClient();

export default async function EmployeeListPage() {
  const employees = await prisma.employee.findMany();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Employee List</h1>
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">First Name</th>
            <th className="border border-gray-300 px-4 py-2">Last Name</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">Telephone</th>
            <th className="border border-gray-300 px-4 py-2">Manager</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
            <th className="border border-gray-300 px-4 py-2">Edit</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td className="border border-gray-300 px-4 py-2">{employee.id}</td>
              <td className="border border-gray-300 px-4 py-2">{employee.firstName}</td>
              <td className="border border-gray-300 px-4 py-2">{employee.lastName}</td>
              <td className="border border-gray-300 px-4 py-2">{employee.email}</td>
              <td className="border border-gray-300 px-4 py-2">{employee.telephone}</td>
              <td className="border border-gray-300 px-4 py-2">{employee.manager}</td>
              <td className="border border-gray-300 px-4 py-2">{employee.status}</td>
              <td className="border border-gray-300 px-4 py-2">
                <Link href={`/employees/edit/${employee.id}`} className="text-blue-500">
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

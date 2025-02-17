import { PrismaClient } from "@prisma/client";
import BackToHome from "../../components/BackToHome";

const prisma = new PrismaClient();

export default async function DepartmentListPage() {
  const departments = await prisma.department.findMany();

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
          </tr>
        </thead>
        <tbody>
          {departments.map((dept) => (
            <tr key={dept.id}>
              <td className="border border-gray-300 px-4 py-2">{dept.id}</td>
              <td className="border border-gray-300 px-4 py-2">{dept.name}</td>
              <td className="border border-gray-300 px-4 py-2">{dept.manager}</td>
              <td className="border border-gray-300 px-4 py-2">{dept.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <BackToHome />
    </div>
  );
}

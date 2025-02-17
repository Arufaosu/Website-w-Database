import { PrismaClient } from "@prisma/client";
import BackToHome from "../../components/BackToHome";

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
              <td className="border border-gray-300 px-4 py-2">{employee.manager || "N/A"}</td>
              <td className="border border-gray-300 px-4 py-2">{employee.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <BackToHome />
    </div>
  );
}
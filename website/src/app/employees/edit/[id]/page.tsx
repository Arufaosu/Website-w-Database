// src/app/employees/edit/[id]/page.tsx

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  telephone: string;
  manager: string | null;
  status: string;
}

const EditEmployeePage = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [formData, setFormData] = useState<Employee | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const res = await fetch(`/api/employees/${params.id}`);
        if (!res.ok) {
          throw new Error('Failed to fetch employee data');
        }
        const data = await res.json();
        setEmployee(data);
        setFormData(data);
      } catch (err) {
        setError('Failed to fetch employee data');
      }
    };

    fetchEmployee();
  }, [params.id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData!,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/employees/${params.id}`, {
        method: 'PUT',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        throw new Error('Failed to update employee');
      }

      const updatedEmployee = await res.json();
      setEmployee(updatedEmployee);
      router.push('/employees/list'); // Redirect to employee list after success
    } catch (error) {
      setError('Failed to update employee data');
    }
  };

  if (error) return <div>{error}</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Edit Employee</h1>
      {employee ? (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="firstName">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData?.firstName || ''}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="lastName">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData?.lastName || ''}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData?.email || ''}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="telephone">
              Telephone
            </label>
            <input
              type="text"
              id="telephone"
              name="telephone"
              value={formData?.telephone || ''}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="status">
              Status
            </label>
            <input
              type="text"
              id="status"
              name="status"
              value={formData?.status || ''}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="manager">
              Manager
            </label>
            <input
              type="text"
              id="manager"
              name="manager"
              value={formData?.manager || ''}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>

          <div className="mb-4">
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded-md"
            >
              Update Employee
            </button>
          </div>
        </form>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default EditEmployeePage;

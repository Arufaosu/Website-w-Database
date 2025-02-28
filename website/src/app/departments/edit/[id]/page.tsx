// src/app/employees/edit/[id]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Department {
  id: number;
  name: string;
  manager: string | null;
  status: string;
}

const EditDepartmentPage = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const [department, setDepartment] = useState<Department | null>(null);
  const [formData, setFormData] = useState<Department | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchDepartment = async () => {
      try {
        const res = await fetch(`/api/departments/${params.id}`);
        if (!res.ok) {
          throw new Error('Failed to fetch department data');
        }
        const data = await res.json();
        setDepartment(data);
        setFormData(data); // Set the form data
      } catch (err) {
        setError('Failed to fetch department data');
      }
    };

    fetchDepartment();
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
      const res = await fetch(`/api/departments/${params.id}`, {
        method: 'PUT',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        throw new Error('Failed to update department');
      }

      const updatedDepartment = await res.json();
      setDepartment(updatedDepartment);
      router.push('/departments/list'); // Redirect to department list after success
    } catch (error) {
      setError('Failed to update department');
    }
  };

  if (error) return <div>{error}</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Edit Department</h1>
      {department ? (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="name">
              Department Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData?.name || ''}
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
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded-md"
            >
              Update Department
            </button>
          </div>
        </form>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default EditDepartmentPage;

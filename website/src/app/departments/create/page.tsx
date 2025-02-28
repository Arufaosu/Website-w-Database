"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import BackToHome from "../../components/BackToHome"; // Assuming this component is correct

interface DepartmentForm {
  name: string;
  manager: string;
  status: string;
}

export default function CreateDepartmentPage() {
  const router = useRouter();
  
  const [form, setForm] = useState<DepartmentForm>({
    name: "",
    manager: "",
    status: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Send POST request to create a new department
      const response = await fetch("/api/departments/0", {  // We use `0` as the "id" for the creation
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        alert("Department created successfully!");
      } else {
        alert("Failed to create department.");
      }
    } catch (error) {
      console.error("Error creating department:", error);
      alert("An error occurred while creating the department.");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Create Department</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        {Object.keys(form).map((key) => (
          <div key={key} className="flex flex-col">
            <label htmlFor={key} className="font-semibold capitalize">
              {key}
            </label>
            <input
              id={key}
              type="text"
              value={form[key as keyof DepartmentForm]}  // TypeScript now knows the keys are valid
              onChange={(e) => setForm({ ...form, [key]: e.target.value })}
              className="border border-gray-300 rounded p-2"
              required={key !== "manager"}
            />
          </div>
        ))}
        <button
          type="submit"
          className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
      <BackToHome />
    </div>
  );
}

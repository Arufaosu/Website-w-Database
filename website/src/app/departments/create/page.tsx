"use client";

import { useState } from "react";
import BackToHome from "../../components/BackToHome";

export default function CreateDepartmentPage() {
  const [form, setForm] = useState({
    name: "",
    manager: "",
    status: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/departments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    alert("Department created successfully!");
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
              value={key}
              onChange={(e) => setForm({ ...form, [key]: e.target.value })}
              className="border border-gray-300 rounded p-2"
              required
            />
          </div>
        ))}
        <button
          type="submit"
          className="bg-green-500 text-white rounded px-4 py-2 hover:bg-green-600"
        >
          Submit
        </button>
      </form>
      <BackToHome />
    </div>
  );
}

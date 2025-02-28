"use client";

import { useState } from "react";
import BackToHome from "../../components/BackToHome";

export default function CreateEmployeePage() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    telephone: "",
    manager: "",
    status: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/employees", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    alert("Employee created successfully!");
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Create Employee</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        {Object.keys(form).map((key) => (
          <div key={key} className="flex flex-col">
            <label htmlFor={key} className="font-semibold capitalize">
              {key}
            </label>
            <input
              id={key}
              type="text"
              value={form[key as keyof typeof form]}
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

   
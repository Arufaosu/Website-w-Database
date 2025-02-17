import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // Ensure you have this file set up

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const employee = await prisma.employee.create({ data });
    return NextResponse.json(employee, { status: 201 });
  } catch (error) {
    console.error("Error creating employee:", error);
    return NextResponse.json({ error: "Failed to create employee" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const employees = await prisma.employee.findMany();
    return NextResponse.json(employees);
  } catch (error) {
    console.error("Error fetching employees:", error);
    return NextResponse.json({ error: "Failed to fetch employees" }, { status: 500 });
  }
}

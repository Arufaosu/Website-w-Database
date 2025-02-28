// src/app/api/employees/[id]/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Fetch employee details by ID (GET request)
export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const employee = await prisma.employee.findUnique({
      where: { id: parseInt(id) },
    });

    if (!employee) {
      return NextResponse.json({ message: 'Employee not found' }, { status: 404 });
    }

    return NextResponse.json(employee);
  } catch (error) {
    console.error('Error fetching employee data:', error);
    return NextResponse.json({ message: 'Error fetching employee data' }, { status: 500 });
  }
}

// Update employee details (PUT request)
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const body = await req.json(); // Get the data to update

  try {
    const updatedEmployee = await prisma.employee.update({
      where: { id: parseInt(id) },
      data: body, // Apply new data to employee
    });

    return NextResponse.json(updatedEmployee);
  } catch (error) {
    console.error('Error updating employee data:', error);
    return NextResponse.json({ message: 'Error updating employee data' }, { status: 500 });
  }
}
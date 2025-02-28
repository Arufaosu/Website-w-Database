// /src/app/api/departments/[id]/route.ts
import { NextResponse } from 'next/server'; 
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Fetch department details by ID (GET request)
export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const department = await prisma.department.findUnique({
      where: { id: parseInt(id) },
    });

    if (!department) {
      return NextResponse.json({ message: 'Department not found' }, { status: 404 });
    }

    return NextResponse.json(department);
  } catch (error) {
    console.error('Error fetching department data:', error);
    return NextResponse.json({ message: 'Error fetching department data' }, { status: 500 });
  }
}

// Update department details (PUT request)
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const body = await req.json(); // Get the data to update

  try {
    const updatedDepartment = await prisma.department.update({
      where: { id: parseInt(id) },
      data: body, // Apply new data to department
    });

    return NextResponse.json(updatedDepartment);
  } catch (error) {
    console.error('Error updating department data:', error);
    return NextResponse.json({ message: 'Error updating department data' }, { status: 500 });
  }
}
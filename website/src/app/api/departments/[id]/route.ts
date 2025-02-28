// src/app/api/departments/[id]/route.ts
import prisma from "../../../../lib/prisma";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  try {
    const department = await prisma.department.findUnique({
      where: { id: parseInt(id) },
    });
    return new Response(JSON.stringify(department), { status: 200 });
  } catch (error) {
    return new Response('Error fetching department data', { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const body = await req.json();
  try {
    const updatedDepartment = await prisma.department.update({
      where: { id: parseInt(id) },
      data: body, // The updated department data
    });
    return new Response(JSON.stringify(updatedDepartment), { status: 200 });
  } catch (error) {
    return new Response('Error updating department', { status: 500 });
  }
}

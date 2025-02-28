// src/app/api/employees/[id]/route.ts
import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
    const { id } = await context.params; // ✅ Awaiting params

    if (!id) {
        return new Response(JSON.stringify({ error: "Missing employee ID" }), { status: 400 });
    }

    try {
        const employee = await prisma.employee.findUnique({
            where: { id: parseInt(id) },
        });

        if (!employee) {
            return new Response(JSON.stringify({ error: "Employee not found" }), { status: 404 });
        }

        return new Response(JSON.stringify(employee), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
    }
  }

export async function PUT(req: Request, context: { params: Promise<{ id: string }> }) {
      const { id } = await context.params;
  
      if (!id) {
          return new Response(JSON.stringify({ error: "Missing employee ID" }), { status: 400 });
      }
  
      try {
          const body = await req.json();
  
          const updatedEmployee = await prisma.employee.update({
              where: { id: parseInt(id) },
              data: body,
          });
  
          return new Response(JSON.stringify(updatedEmployee), { status: 200 });
      } catch (error) {
          return new Response(JSON.stringify({ error: "Update failed" }), { status: 500 });
      }
  }

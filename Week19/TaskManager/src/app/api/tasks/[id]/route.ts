import { NextRequest, NextResponse } from "next/server";
import { withAuth, AuthenticatedRequest } from "@/lib/api";
import { db } from "@/lib/prisma";
import { tasks } from "@/../../db/schema";
import { eq } from "drizzle-orm";

async function handler(
  req: AuthenticatedRequest,
  { params }: { params: { id: string } }
) {
  try {
    const taskId = params.id;

    // Verify task belongs to user
    const taskResult = await db
      .select()
      .from(tasks)
      .where(eq(tasks.id, taskId))
      .limit(1);

    if (taskResult.length === 0 || taskResult[0].userId !== req.userId) {
      return NextResponse.json(
        { error: "Task not found" },
        { status: 404 }
      );
    }

    if (req.method === "GET") {
      return NextResponse.json(taskResult[0]);
    }

    if (req.method === "PUT") {
      const { title, description, status, priority, dueDate, categoryId } = 
        await req.json();

      await db
        .update(tasks)
        .set({
          ...(title && { title }),
          ...(description !== undefined && { description }),
          ...(status && { status }),
          ...(priority && { priority }),
          ...(dueDate !== undefined && { 
            dueDate: dueDate ? new Date(dueDate) : null
          }),
          ...(categoryId !== undefined && { categoryId }),
          updatedAt: new Date(),
        })
        .where(eq(tasks.id, taskId));

      const updatedResult = await db
        .select()
        .from(tasks)
        .where(eq(tasks.id, taskId))
        .limit(1);

      return NextResponse.json({
        message: "Task updated successfully",
        task: updatedResult[0],
      });
    }

    if (req.method === "DELETE") {
      await db.delete(tasks).where(eq(tasks.id, taskId));

      return NextResponse.json({
        message: "Task deleted successfully",
      });
    }

    return NextResponse.json(
      { error: "Method not allowed" },
      { status: 405 }
    );
  } catch (error) {
    console.error("Task detail error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  return withAuth(req, (authReq) => handler(authReq, { params }));
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  return withAuth(req, (authReq) => handler(authReq, { params }));
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  return withAuth(req, (authReq) => handler(authReq, { params }));
}

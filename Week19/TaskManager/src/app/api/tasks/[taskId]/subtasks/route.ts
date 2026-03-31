import { NextRequest, NextResponse } from "next/server";
import { withAuth, AuthenticatedRequest } from "@/lib/api";
import { db } from "@/lib/prisma";
import { tasks, subtasks } from "@/../../db/schema";
import { eq } from "drizzle-orm";
import { nanoid } from "@/lib/utils";

async function handler(
  req: AuthenticatedRequest,
  { params }: { params: { taskId: string } }
) {
  try {
    const { taskId } = params;

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

    if (req.method === "POST") {
      const { title } = await req.json();

      if (!title) {
        return NextResponse.json(
          { error: "Title is required" },
          { status: 400 }
        );
      }

      const subtaskId = nanoid();
      const now = new Date();

      await db.insert(subtasks).values({
        id: subtaskId,
        taskId,
        title,
        completed: false,
        createdAt: now,
        updatedAt: now,
      });

      const newSubtask = await db
        .select()
        .from(subtasks)
        .where(eq(subtasks.id, subtaskId))
        .limit(1);

      return NextResponse.json(newSubtask[0], { status: 201 });
    }

    return NextResponse.json(
      { error: "Method not allowed" },
      { status: 405 }
    );
  } catch (error) {
    console.error("Subtask error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { taskId: string } }
) {
  return withAuth(req, (authReq) => handler(authReq, { params }));
}

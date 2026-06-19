import { NextRequest, NextResponse } from "next/server";
import { withAuth, AuthenticatedRequest } from "@/lib/api";
import { db } from "@/lib/prisma";
import { tasks } from "@/../../db/schema";
import { eq } from "drizzle-orm";

async function handler(req: AuthenticatedRequest) {
  try {
    // Get task statistics
    const userTasks = await db
      .select({
        id: tasks.id,
        status: tasks.status,
        priority: tasks.priority,
        completedAt: tasks.completedAt,
        createdAt: tasks.createdAt
      })
      .from(tasks)
      .where(eq(tasks.userId, req.userId));

    const totalTasks = userTasks.length;
    const completedTasks = userTasks.filter((t: any) => t.status === "COMPLETED").length;
    const inProgressTasks = userTasks.filter((t: any) => t.status === "IN_PROGRESS").length;
    const todoTasks = userTasks.filter((t: any) => t.status === "TODO").length;

    const tasksByPriority = {
      LOW: userTasks.filter((t: any) => t.priority === "LOW").length,
      MEDIUM: userTasks.filter((t: any) => t.priority === "MEDIUM").length,
      HIGH: userTasks.filter((t: any) => t.priority === "HIGH").length,
      URGENT: userTasks.filter((t: any) => t.priority === "URGENT").length
    };

    return NextResponse.json({
      totalTasks,
      completedTasks,
      inProgressTasks,
      todoTasks,
      completionRate: totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0,
      tasksByPriority
    });
  } catch (error) {
    console.error("Stats error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  return withAuth(req, handler);
}

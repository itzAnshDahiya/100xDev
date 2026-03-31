import { NextRequest, NextResponse } from "next/server";
import { withAuth, AuthenticatedRequest } from "@/lib/api";
import { db } from "@/lib/prisma";
import { tasks, categories } from "@/../../db/schema";
import { eq, and } from "drizzle-orm";
import { nanoid } from "@/lib/utils";

async function handler(req: AuthenticatedRequest) {
  try {
    if (req.method === "GET") {
      const { searchParams } = new URL(req.url);
      const status = searchParams.get("status");
      const priority = searchParams.get("priority");
      const categoryId = searchParams.get("categoryId");

      let query = db
        .select()
        .from(tasks)
        .where(eq(tasks.userId, req.userId!));

      if (status) {
        query = query.where(eq(tasks.status, status as any));
      }
      if (priority) {
        query = query.where(eq(tasks.priority, priority as any));
      }
      if (categoryId) {
        query = query.where(eq(tasks.categoryId, categoryId));
      }

      const tasksList = await query;

      // Enrich with categories
      const enrichedTasks = await Promise.all(
        tasksList.map(async (task: any) => {
          if (task.categoryId) {
            const cat = await db
              .select()
              .from(categories)
              .where(eq(categories.id, task.categoryId))
              .limit(1);
            return {
              ...task,
              category: cat.length > 0 ? cat[0] : null,
            };
          }
          return { ...task, category: null };
        })
      );

      return NextResponse.json(enrichedTasks);
    }

    if (req.method === "POST") {
      const { title, description, priority, dueDate, categoryId } = await req.json();

      if (!title) {
        return NextResponse.json(
          { error: "Title is required" },
          { status: 400 }
        );
      }

      const taskId = nanoid();
      const now = new Date();

      await db.insert(tasks).values({
        id: taskId,
        userId: req.userId!,
        title,
        description: description || null,
        priority: priority || "MEDIUM",
        dueDate: dueDate ? new Date(dueDate) : null,
        categoryId: categoryId || null,
        createdAt: now,
        updatedAt: now,
      });

      const newTask = await db
        .select()
        .from(tasks)
        .where(eq(tasks.id, taskId))
        .limit(1);

      return NextResponse.json(newTask[0], { status: 201 });
    }

    return NextResponse.json(
      { error: "Method not allowed" },
      { status: 405 }
    );
  } catch (error) {
    console.error("Tasks error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  return withAuth(req, handler);
}

export async function POST(req: NextRequest) {
  return withAuth(req, handler);
}

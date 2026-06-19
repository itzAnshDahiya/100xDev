import { NextRequest, NextResponse } from "next/server";
import { withAuth, AuthenticatedRequest } from "@/lib/api";
import { db } from "@/lib/prisma";
import { categories, tasks } from "@/../../db/schema";
import { eq, count } from "drizzle-orm";
import { nanoid } from "@/lib/utils";

async function handler(req: AuthenticatedRequest) {
  try {
    if (req.method === "GET") {
      const userCategories = await db
        .select()
        .from(categories)
        .where(eq(categories.userId, req.userId));

      // Get task counts for each category
      const categoriesWithCounts = await Promise.all(
        userCategories.map(async (cat: any) => {
          const taskCountResult = await db
            .select({ count: count() })
            .from(tasks)
            .where(eq(tasks.categoryId, cat.id));
          
          return {
            ...cat,
            _count: {
              tasks: taskCountResult[0].count
            }
          };
        })
      );

      // Sort by createdAt descending
      categoriesWithCounts.sort((a: any, b: any) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      return NextResponse.json(categoriesWithCounts);
    }

    if (req.method === "POST") {
      const { name, color } = await req.json();

      if (!name) {
        return NextResponse.json(
          { error: "Name is required" },
          { status: 400 }
        );
      }

      const categoryId = nanoid();
      const now = new Date();

      await db.insert(categories).values({
        id: categoryId,
        userId: req.userId,
        name,
        color: color || "#3B82F6",
        createdAt: now,
        updatedAt: now,
      });

      const newCategory = await db
        .select()
        .from(categories)
        .where(eq(categories.id, categoryId))
        .limit(1);

      return NextResponse.json({
        ...newCategory[0],
        _count: { tasks: 0 }
      }, { status: 201 });
    }

    return NextResponse.json(
      { error: "Method not allowed" },
      { status: 405 }
    );
  } catch (error) {
    console.error("Categories error:", error);
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

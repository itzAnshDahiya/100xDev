import { NextRequest, NextResponse } from "next/server";
import { withAuth, AuthenticatedRequest } from "@/lib/api";
import { db } from "@/lib/prisma";
import { categories } from "@/../../db/schema";
import { eq } from "drizzle-orm";

async function handler(
  req: AuthenticatedRequest,
  { params }: { params: { id: string } }
) {
  try {
    const categoryId = params.id;

    const categoryResult = await db
      .select()
      .from(categories)
      .where(eq(categories.id, categoryId))
      .limit(1);

    if (categoryResult.length === 0 || categoryResult[0].userId !== req.userId) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    if (req.method === "PUT") {
      const { name, color } = await req.json();

      const updateData: any = { updatedAt: new Date() };
      if (name) updateData.name = name;
      if (color) updateData.color = color;

      await db
        .update(categories)
        .set(updateData)
        .where(eq(categories.id, categoryId));

      const updatedCategory = await db
        .select()
        .from(categories)
        .where(eq(categories.id, categoryId))
        .limit(1);

      return NextResponse.json({
        message: "Category updated successfully",
        category: updatedCategory[0]
      });
    }

    if (req.method === "DELETE") {
      await db.delete(categories).where(eq(categories.id, categoryId));

      return NextResponse.json({
        message: "Category deleted successfully"
      });
    }

    return NextResponse.json(
      { error: "Method not allowed" },
      { status: 405 }
    );
  } catch (error) {
    console.error("Category detail error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
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

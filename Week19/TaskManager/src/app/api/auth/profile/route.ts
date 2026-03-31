import { NextRequest, NextResponse } from "next/server";
import { withAuth, AuthenticatedRequest } from "@/lib/api";
import { db } from "@/lib/prisma";
import { users } from "@/../../db/schema";
import { eq } from "drizzle-orm";

async function handler(req: AuthenticatedRequest) {
  try {
    if (req.method === "GET") {
      const userResult = await db
        .select({
          id: users.id,
          email: users.email,
          name: users.name,
          avatar: users.avatar,
          bio: users.bio,
          createdAt: users.createdAt,
        })
        .from(users)
        .where(eq(users.id, req.userId!))
        .limit(1);

      if (userResult.length === 0) {
        return NextResponse.json(
          { error: "User not found" },
          { status: 404 }
        );
      }

      return NextResponse.json(userResult[0]);
    }

    if (req.method === "PUT") {
      const { name, bio, avatar } = await req.json();

      await db
        .update(users)
        .set({
          ...(name && { name }),
          ...(bio && { bio }),
          ...(avatar && { avatar }),
          updatedAt: new Date(),
        })
        .where(eq(users.id, req.userId!));

      const updatedUserResult = await db
        .select({
          id: users.id,
          email: users.email,
          name: users.name,
          avatar: users.avatar,
          bio: users.bio,
        })
        .from(users)
        .where(eq(users.id, req.userId!))
        .limit(1);

      return NextResponse.json({
        message: "Profile updated successfully",
        user: updatedUserResult[0],
      });
    }

    return NextResponse.json(
      { error: "Method not allowed" },
      { status: 405 }
    );
  } catch (error) {
    console.error("Profile error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  return withAuth(req, handler);
}

export async function PUT(req: NextRequest) {
  return withAuth(req, handler);
}

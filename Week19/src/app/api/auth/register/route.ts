import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/prisma";
import { users } from "@/../../db/schema";
import { hashPassword, validateEmail } from "@/lib/utils";
import { generateToken } from "@/lib/jwt";
import { eq } from "drizzle-orm";
import { nanoid } from "@/lib/utils";

export async function POST(req: NextRequest) {
  try {
    const { email, password, name } = await req.json();

    // Validation
    if (!email || !password || !name) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (!validateEmail(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (existingUser.length > 0) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 }
      );
    }

    // Hash password and create user
    const hashedPassword = await hashPassword(password);
    const userId = nanoid();
    const now = new Date();

    await db.insert(users).values({
      id: userId,
      email,
      password: hashedPassword,
      name,
      createdAt: now,
      updatedAt: now,
    });

    // Generate token
    const token = generateToken({
      userId,
      email,
    });

    return NextResponse.json(
      {
        message: "User registered successfully",
        user: {
          id: userId,
          email,
          name,
        },
        token,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}


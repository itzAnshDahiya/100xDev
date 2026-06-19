import { NextRequest, NextResponse } from "next/server";
import { verifyToken, extractToken } from "@/lib/jwt";

export interface AuthenticatedRequest extends NextRequest {
  userId: string;
  email: string;
  method: string;
  url: string;
  json: () => Promise<any>;
}

export async function withAuth(
  req: NextRequest,
  handler: (req: AuthenticatedRequest) => Promise<NextResponse>
): Promise<NextResponse> {
  const token = extractToken(req.headers.get("authorization") || "");

  if (!token) {
    return NextResponse.json(
      { error: "Unauthorized: No token provided" },
      { status: 401 }
    );
  }

  const payload = verifyToken(token);

  if (!payload) {
    return NextResponse.json(
      { error: "Unauthorized: Invalid token" },
      { status: 401 }
    );
  }

  const authReq = req as AuthenticatedRequest;
  authReq.userId = payload.userId;
  authReq.email = payload.email;

  return handler(authReq);
}

export function createErrorResponse(message: string, status: number = 400) {
  return NextResponse.json({ error: message }, { status });
}

export function createSuccessResponse(data: unknown, status: number = 200) {
  return NextResponse.json(data, { status });
}

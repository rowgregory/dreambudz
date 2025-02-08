import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function GET(req: NextRequest) {
  try {
    const authToken = req.cookies.get("authToken");

    if (!authToken || !authToken.value) {
      return NextResponse.json(
        { message: "Token is missing" },
        { status: 401 }
      );
    }

    const token = authToken.value;
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    const { payload } = await jwtVerify(token, secret);

    const userId: number = Number(payload.id);
    if (!userId) {
      return NextResponse.json(
        { message: "User ID not found in payload" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { username: true, updatedAt: true },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      { username: user.username, updatedAt: user.updatedAt },
      { status: 200 }
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { message: "Payload error", error: error.message },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: "Unknown error occurred" },
      { status: 500 }
    );
  }
}

import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { generateToken } from "@/app/utils/generateToken";

export async function POST(req: NextRequest) {
  try {
    const user = await req.json();
    const existingUser = await prisma.user.findFirst({
      where: { username: user.username },
    });

    if (!existingUser) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 404 }
      );
    }

    const isPasswordValid = await bcrypt.compare(
      user.password,
      existingUser.password
    );

    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const token = generateToken(
      {
        isAdmin: existingUser.isAdmin,
        id: existingUser.id,
        isAuthenticated: true,
      },
      "1d"
    );

    const response = NextResponse.json(
      {
        isAdmin: existingUser.isAdmin,
        id: existingUser.id,
        isAuthenticated: true,
      },
      { status: 200 }
    );

    response.cookies.set("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 1 * 24 * 60 * 60, // 1 day
      path: "/", // Cookie applies to the entire domain
    });

    return response;
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to login", details: error.message },
      { status: 500 }
    );
  }
}

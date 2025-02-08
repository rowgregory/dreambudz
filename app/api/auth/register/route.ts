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

    if (existingUser)
      return NextResponse.json(
        { message: "Invalid credentials", sliceName: "authApi" },
        { status: 404 }
      );

    const hashedPassword = await bcrypt.hash(user.password, 10);

    const createdUser = await prisma.user.create({
      data: {
        username: user.username,
        password: hashedPassword,
        isAdmin: true,
      },
    });

    const token = generateToken(
      { userId: createdUser.id, username: createdUser.username, isAdmin: true },
      "1d"
    );

    const response = NextResponse.json({
      auth: {
        isAuthenticated: true,
        userId: createdUser.id,
        isAdmin: createdUser.isAdmin,
        username: createdUser.username,
      },
    });

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
      { error: "Failed to register user", details: error.message },
      { status: 500 }
    );
  }
}

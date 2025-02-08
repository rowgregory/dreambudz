import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    const userHeader = req.headers.get("x-user")!;

    if (!userHeader) {
      return NextResponse.json(
        { message: "User information is required in the headers" },
        { status: 400 }
      );
    }

    const user = JSON.parse(userHeader);

    const { username } = await req.json();

    if (!username) {
      return NextResponse.json(
        { message: "Username is required" },
        { status: 400 }
      );
    }

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: { username },
      select: {
        username: true,
        updatedAt: true,
      },
    });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Failed to update usuer", name: error.name },
      { status: 500 }
    );
  }
}

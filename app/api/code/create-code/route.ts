import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { code } = await req.json();

    if (!code) {
      return NextResponse.json(
        { message: "Invalid request data" },
        { status: 404 }
      );
    }

    await prisma.code.create({ data: { code } });

    return NextResponse.json(
      {
        message: "Code created successfully",
        codeCreated: true,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: "Failed to create code", codeIsValid: false },
      { status: 404 }
    );
  }
}

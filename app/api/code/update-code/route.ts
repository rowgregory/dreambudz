import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    const code = await req.json();

    if (!code) {
      return NextResponse.json(
        { message: "Invalid request data", sliceName: "codeApi" },
        { status: 404 }
      );
    }

    await prisma.code.update({
      where: { id: code.id },
      data: { code: code.code },
    });

    return NextResponse.json(
      {
        message: "Code updated successfully",
        codeUpdated: true,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "Failed to update code.",
        name: error.name,
      },
      { status: 500 }
    );
  }
}

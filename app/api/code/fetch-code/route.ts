import prisma from "@/prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const code = await prisma.code.findFirst({});

    return NextResponse.json(
      {
        code,
        codeFetched: true,
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "Code could not be fetched", codeIsValid: false },
      { status: 404 }
    );
  }
}

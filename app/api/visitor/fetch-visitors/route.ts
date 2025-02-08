import prisma from "@/prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const visitors = await prisma.visitor.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(
      {
        visitors,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "Error fetching visitors",
        name: error.name,
      },
      { status: 500 }
    );
  }
}

import prisma from "@/prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const products = await prisma.product.findMany();

    return NextResponse.json(
      {
        products,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "Error fetching products",
        name: error.name,
      },
      { status: 500 }
    );
  }
}

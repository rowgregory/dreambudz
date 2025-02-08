import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const product = await req.json();

    if (!product) {
      return NextResponse.json(
        { message: "Error creating product: Product data is missing" },
        { status: 404 }
      );
    }

    await prisma.product.create({
      data: product,
    });

    return NextResponse.json(
      { message: "Product created successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: "Error creating product", name: error.name },
      { status: 500 }
    );
  }
}

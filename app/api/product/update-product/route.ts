import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    const product = await req.json();

    if (!product) {
      return NextResponse.json(
        { message: "Error updating product" },
        { status: 404 }
      );
    }

    await prisma.product.update({
      where: { id: Number(product.id) },
      data: product,
    });

    return NextResponse.json(
      { message: "Product updated successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: "Error updating product", name: error.name },
      { status: 500 }
    );
  }
}

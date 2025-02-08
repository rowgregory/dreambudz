import deleteFileFromFirebase from "@/app/utils/deleteFileFromFirebase";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

/**
 * @desc    Delete product
 * @route   DELETE /api/product
 * @access  Public
 */
export async function DELETE(req: NextRequest) {
  {
    try {
      const { id, fileName, mimeType } = await req.json();

      if (!id || !fileName || !mimeType) {
        return NextResponse.json(
          {
            message: `Missing parameter: id:${id}, fileName:${fileName}, mimeType:${mimeType}`,
          },
          { status: 400 }
        );
      }

      const product = await prisma.product.findUnique({
        where: { id: parseInt(id, 10) },
      });

      if (!product) {
        return NextResponse.json(
          { message: "Product not found" },
          { status: 404 }
        );
      }

      await deleteFileFromFirebase(fileName, mimeType);

      await prisma.product.delete({
        where: { id: parseInt(id, 10) },
      });

      return NextResponse.json(
        { message: "Product deleted successfully" },
        { status: 200 }
      );
    } catch (error: any) {
      return NextResponse.json(
        { message: "Error deleting product", name: error.name },
        { status: 500 }
      );
    }
  }
}

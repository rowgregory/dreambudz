import { NextResponse } from "next/server";
import prisma from "../../../prisma/client.ts";
import { URL } from "url";

export async function GET(req) {
  const url = new URL(req.url);
  const query = url.searchParams.get("endpoint");
  try {
    if (query === "FETCH_PRODUCTS") {
      const products = await prisma.product.findMany();

      return NextResponse.json(
        {
          products,
        },
        { status: 200 }
      );
    }

    return NextResponse.json({ message: "Invalid endpoint" }, { status: 400 });
  } catch (err) {
    console.error("Error fetching products: ", err);

    return NextResponse.json(
      {
        message: "Error fetching products",
        error: err.message,
      },
      { status: 500 }
    );
  }
}

export async function PATCH(req) {
  const url = new URL(req.url);
  const query = url.searchParams.get("endpoint");

  if (query === "UPDATE_PRODUCT") {
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
    } catch (err) {
      return NextResponse.json(
        { message: "Error updating product", err },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json({ message: "Invalid endpoint" }, { status: 400 });
  }
}

export async function POST(req) {
  const url = new URL(req.url);
  const query = url.searchParams.get("endpoint");

  if (query === "CREATE_PRODUCT") {
    try {
      const product = await req.json();

      if (!product) {
        return NextResponse.json(
          { message: "Error creating product: Product data is missing" },
          { status: 400 }
        );
      }

      const createdProduct = await prisma.product.create({
        data: product,
      });

      return NextResponse.json(
        { message: "Product created successfully", product: createdProduct },
        { status: 201 }
      );
    } catch (err) {
      console.error("Error creating product:", err);
      return NextResponse.json(
        { message: "Error creating product", error: err.message },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json({ message: "Invalid endpoint" }, { status: 400 });
  }
}

/**
 * @desc    Delete product
 * @route   DELETE /api/product/[id]
 * @access  Public
 */
export async function DELETE(req) {
  const url = new URL(req.url);
  const query = url.searchParams.get("endpoint");
  const id = await req.json();

  if (query === "DELETE_PRODUCT") {
    try {
      if (!id) {
        return NextResponse.json(
          { message: "Product ID is required" },
          { status: 400 }
        );
      }

      const product = await prisma.product.delete({
        where: { id: parseInt(id, 10) },
      });

      if (!product) {
        return NextResponse.json(
          { message: "Product not found" },
          { status: 404 }
        );
      }

      return NextResponse.json(
        { message: "Product deleted successfully" },
        { status: 200 }
      );
    } catch (err) {
      console.error(err.message);
      return NextResponse.json(
        { message: "Internal server error" },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json({ message: "Invalid endpoint" }, { status: 400 });
  }
}

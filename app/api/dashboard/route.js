import { NextResponse } from "next/server";
import prisma from "../../../prisma/client.ts";
import { URL } from "url";

export async function GET(req) {
  const url = new URL(req.url);
  const query = url.searchParams.get("endpoint");
  try {
    if (query === "DASHBOARD") {
      const productsCount = await prisma.product.count();

      const mostRecentProduct = await prisma.product.findFirst({
        orderBy: {
          createdAt: "desc",
        },
      });

      const code = await prisma.code.findFirst();

      const mostRecentProductDate = mostRecentProduct
        ? mostRecentProduct.createdAt
        : null;

      return NextResponse.json(
        {
          info: {
            productsCount,
            code,
            createdAt: mostRecentProductDate,
          },
        },
        { status: 200 }
      );
    }

    return NextResponse.json({ message: "Invalid endpoint" }, { status: 400 });
  } catch (err) {
    console.error("Error fetching dashboard info:", err);

    return NextResponse.json(
      {
        message: "Error fetching dashboard info",
        error: err.message,
      },
      { status: 500 }
    );
  }
}

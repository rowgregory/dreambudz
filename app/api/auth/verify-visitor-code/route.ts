import { createVisitor } from "@/app/lib/db/createVisitor";
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

    const codeFound = await prisma.code.findFirst({ where: { code } });
    if (!codeFound) {
      return NextResponse.json(
        {
          message: "Failed to verify code.",
        },
        { status: 404 }
      );
    }

    const userAgent = req.headers.get("user-agent") || "unknown";

    // Get the IP address from the x-forwarded-for header
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0] ||
      req.headers.get("remote-address") ||
      "unknown";

    await createVisitor({
      device: /Mobi|Android|iPhone|iPad/i.test(userAgent)
        ? "Mobile"
        : "Desktop",
      browser:
        userAgent.match(/(Chrome|Safari|Firefox|Edge|Opera)/)?.[0] || "Unknown",
      ip,
    });

    const products = await prisma.product.findMany();

    const response = NextResponse.json({
      visitorCodeVerified: true,
      products,
    });

    response.cookies.set("visitorToken", JSON.stringify({ ip, userAgent }), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 1 * 2 * 60 * 60, // 2 hours
      path: "/", // Cookie applies to the entire domain
    });

    return response;
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "Failed to verify code.",
        name: error.name,
      },
      { status: 500 }
    );
  }
}

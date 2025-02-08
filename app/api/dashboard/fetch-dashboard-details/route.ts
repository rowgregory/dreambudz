import prisma from "@/prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const productsCount = await prisma.product.count();
    const code = await prisma.code.findFirst();

    const now = new Date();
    const past24Hours = new Date(now);
    past24Hours.setDate(now.getDate() - 1);

    const pastWeek = new Date(now);
    pastWeek.setDate(now.getDate() - 7);

    const [visitorsLastWeek, totalVisitors] = await Promise.all([
      prisma.visitor.findMany({
        where: { createdAt: { gte: pastWeek } },
        select: { createdAt: true },
      }),
      prisma.visitor.count(),
    ]);

    // Count visitors in JS instead of multiple DB calls
    const visitorsLast24Hours = visitorsLastWeek.filter(
      (v) => v.createdAt >= past24Hours
    ).length;

    return NextResponse.json(
      {
        code: {
          code,
        },
        product: {
          productsCount,
        },
        visitor: {
          last24Hours: visitorsLast24Hours,
          lastWeek: visitorsLastWeek.length,
          total: totalVisitors,
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "Error fetching dashboard details",
        name: error.name,
      },
      { status: 500 }
    );
  }
}

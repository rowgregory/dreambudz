import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createVisitor({
  device,
  browser,
  ip,
}: {
  device: string;
  browser: string;
  ip: string;
}) {
  const visitor = await prisma.visitor.create({
    data: {
      device,
      browser,
      ip,
    },
  });

  return visitor;
}

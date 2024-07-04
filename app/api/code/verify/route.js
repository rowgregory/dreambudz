"use server";

import { NextResponse } from "next/server.js";
import prisma from "../../../../prisma/client.ts";
import { generateToken } from "../../../utils/generateToken.js";

export async function POST(req) {
  const url = new URL(req.url);
  const query = url.searchParams.get("endpoint");

  if (query === "VERIFY_CODE") {
    const { code } = await req.json();

    try {
      if (!code) {
        return NextResponse.json(
          { message: "Invalid request data" },
          { status: 404 }
        );
      }

      const codeRecord = await prisma.code.findFirst({ where: { code } });

      if (codeRecord) {
        const token = generateToken(null, "15m");

        return NextResponse.json(
          {
            message: "Code validated and token generated",
            codeIsValid: true,
            token,
          },
          { status: 200 }
        );
      } else {
        return NextResponse.json({ message: "Invalid code" }, { status: 404 });
      }
    } catch (err) {
      return NextResponse.json(
        {
          message: err.message,
          name: err.name,
        },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json({ message: "Invalid endpoint" }, { status: 400 });
  }
}

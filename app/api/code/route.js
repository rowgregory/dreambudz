"use server";

import { NextResponse } from "next/server.js";
import prisma from "../../../prisma/client.ts";

export async function GET(req) {
  const url = new URL(req.url);
  const query = url.searchParams.get("endpoint");

  try {
    if (query === "FETCH_CODE") {
      const code = await prisma.code.findFirst({});

      return NextResponse.json(
        {
          code,
          codeFetched: true,
        },
        { status: 200 }
      );
    }
  } catch (err) {
    return NextResponse.json(
      { message: "Invalid endpoint", codeIsValid: false },
      { status: 404 }
    );
  }
}

export async function POST(req) {
  const url = new URL(req.url);
  const query = url.searchParams.get("endpoint");

  try {
    if (query === "CREATE_CODE") {
      const { code } = await req.json();

      if (!code) {
        return NextResponse.json(
          { message: "Invalid request data", sliceName: "codeApi" },
          { status: 404 }
        );
      }

      await prisma.code.create({ data: { code } });

      return NextResponse.json(
        {
          message: "Code created successfully",
          codeCreated: true,
        },
        { status: 200 }
      );
    }
  } catch (err) {
    return NextResponse.json(
      { message: "Invalid endpoint", codeIsValid: false },
      { status: 404 }
    );
  }
}

export async function PATCH(req) {
  const url = new URL(req.url);
  const query = url.searchParams.get("endpoint");

  if (query === "UPDATE_CODE") {
    const code = await req.json();

    try {
      if (!code) {
        return NextResponse.json(
          { message: "Invalid request data", sliceName: "codeApi" },
          { status: 404 }
        );
      }

      await prisma.code.update({
        where: { id: code.id },
        data: { code: code.code },
      });

      return NextResponse.json(
        {
          message: "Code updated successfully",
          codeUpdated: true,
        },
        { status: 200 }
      );
    } catch (err) {
      return NextResponse.json(
        {
          message: err.message,
          name: err.name,
          sliceName: "codeApi",
        },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json({ message: "Invalid endpoint" }, { status: 400 });
  }
}

"use server";

import { NextResponse } from "next/server.js";
import bcrypt from "bcrypt";
import { generateToken } from "../../utils/generateToken.js";
import prisma from "../../../prisma/client.ts";

export async function POST(req) {
  const url = new URL(req.url);
  const query = url.searchParams.get("endpoint");

  if (query === "REGISTER") {
    const user = await req.json();

    try {
      const existingUser = await prisma.user.findFirst({
        where: { username: user.username },
      });

      if (existingUser)
        return NextResponse.json(
          { message: "Invalid credentials", sliceName: "authApi" },
          { status: 404 }
        );

      const hashedPassword = await bcrypt.hash(user.password, 10);

      const createdUser = await prisma.user.create({
        data: {
          username: user.username,
          password: hashedPassword,
          isAdmin: true,
        },
      });

      const token = generateToken(
        { username: createdUser.username, isAdmin: true },
        "1d"
      );

      req.user = {
        id: createdUser.id,
        username: createdUser.username,
        token,
      };

      return NextResponse.json(
        { accountWasCreated: true, token, isAdmin: createdUser.isAdmin },
        { status: 201 }
      );
    } catch (err) {
      return NextResponse.json({
        message: err.message,
        name: err.name,
        sliceName: "authApi",
      });
    }
  }

  if (query === "LOGIN") {
    try {
      const user = await req.json();
      const existingUser = await prisma.user.findFirst({
        where: { username: user.username },
      });

      if (!existingUser) {
        return NextResponse.json(
          { message: "Invalid credentials", sliceName: "authApi" },
          { status: 404 }
        );
      }

      const isPasswordValid = await bcrypt.compare(
        user.password,
        existingUser.password
      );

      if (!isPasswordValid) {
        return NextResponse.json(
          { message: "Invalid credentials", sliceName: "authApi" },
          { status: 401 }
        );
      }

      const token = generateToken(
        {
          username: existingUser.username,
          isAdmin: existingUser.isAdmin,
          id: existingUser.id,
        },
        "1d"
      );

      req.user = {
        id: existingUser.id,
        username: existingUser.username,
        token,
        isAdmin: existingUser.isAdmin,
      };

      return NextResponse.json(
        { isAuthenticated: true, token, isAdmin: existingUser.isAdmin },
        { status: 200 }
      );
    } catch (err) {
      return NextResponse.json(
        {
          message: err.message,
          name: err.name,
          sliceName: "authApi",
        },
        { status: 500 }
      );
    }
  }
}

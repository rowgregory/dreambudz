import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { code } = await req.json();
    const codeToMatch = process.env.NEXT_PUBLIC_REGISTER_CODE;

    if (code !== codeToMatch) {
      return NextResponse.json(
        { message: "Invalid Code", codeValidated: false },
        { status: 404 }
      );
    }

    return NextResponse.json({ codeValidated: true }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "Failed to verify code",
        name: error.name,
      },
      { status: 500 }
    );
  }
}

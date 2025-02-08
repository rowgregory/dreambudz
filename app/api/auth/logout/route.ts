import { NextResponse } from "next/server.js";

export async function POST() {
  try {
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict" as const, // Explicitly set the type to 'strict'
      expires: new Date(0), // Set the expiration date to the past to remove the cookie
      path: "/", // Ensure the cookie is cleared for the entire domain
    };

    const response = NextResponse.json(
      { success: true, message: "Logged out successfully" },
      { status: 200 }
    );

    // Clear cookies
    response.cookies.set("authToken", "", cookieOptions);
    response.cookies.set("visitorToken", "", cookieOptions);

    return response;
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to logout",
        errorCode: "n/a",
      },
      { status: 500 }
    );
  }
}

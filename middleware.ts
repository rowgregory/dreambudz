import { NextRequest, NextResponse } from "next/server";
import { authMiddleware } from "./app/middleware/authMiddleware";

export async function middleware(req: NextRequest) {
  const start = performance.now();

  // Extract tokens from cookies
  const authToken = req.cookies.get("authToken");
  const visitorToken = req.cookies.get("visitorToken");

  // If an admin is logged in, proceed with authentication
  if (authToken) {
    const authResponse = await authMiddleware(req, start, authToken);
    if (authResponse) return authResponse;
    return NextResponse.next();
  }

  // If it's a visitor, restrict access to only "/products"
  if (visitorToken) {
    if (req.nextUrl.pathname.startsWith("/products"))
      return NextResponse.next();
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Default response if no authentication is found
  return NextResponse.redirect(new URL("/", req.url));
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/code/create-code",
    "/api/code/fetch-code",
    "/api/code/update-code",
    "/api/dashboard/fetch-dashboard-details",
    "/api/product/create-product",
    "/api/product/delete-product",
    "/api/product/update-product",
    "/api/user/fetch-users",
    "/api/user/system-status",
    "/api/user/update-user",
    "/products",
  ],
};

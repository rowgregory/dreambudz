import { NextRequest } from "next/server";

export async function responseTimeMiddleware(req: NextRequest, start: number) {
  const elapsed = performance.now() - start; // Calculate elapsed time in milliseconds
  console.log(`Request to ${req.url} took ${elapsed.toFixed(2)}ms`);
}

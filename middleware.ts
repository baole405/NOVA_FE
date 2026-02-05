import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(_request: NextRequest) {
  // Placeholder for future auth check (e.g. cookie check)
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Protected routes requiring authentication
    "/account/:path*",
    "bills/:path*",
    "/dashboard/:path*",
    "/profile/:path*",
    "history/:path*",
    "/((?!api|_next/static|_next/image|favicon.ico|auth|login|$).*)",
    // Add more protected routes here
  ],
};

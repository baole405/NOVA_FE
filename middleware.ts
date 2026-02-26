import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value;

  if (!token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/bills/:path*",
    "/profile/:path*",
    "/history/:path*",
    "/booking/:path*",
    "/announcements/:path*",
    "/complaints/:path*",
    "/notifications/:path*",
    "/settings/:path*",
    "/manager/:path*",
    "/account/:path*",
  ],
};

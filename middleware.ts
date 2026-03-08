import { decodeJwt } from "jose";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// Role constants — duplicated here because middleware runs at edge
// and cannot import from src/lib (non-edge module)
const ROLES = {
  MANAGER: "manager",
  RESIDENT: "resident",
} as const;

const MANAGER_ROUTE_PREFIX = "/manager";
const RESIDENT_DEFAULT_ROUTE = "/dashboard";
const MANAGER_DEFAULT_ROUTE = "/manager";
const LOGIN_ROUTE = "/login";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value;
  const { pathname } = request.nextUrl;

  // No token → redirect to login
  if (!token) {
    const loginUrl = new URL(LOGIN_ROUTE, request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Decode JWT payload (no signature verification — backend is source of truth)
  try {
    const payload = decodeJwt(token);
    const role = payload.role as string | undefined;

    const isManagerRoute = pathname.startsWith(MANAGER_ROUTE_PREFIX);

    // Manager accessing resident routes → redirect to manager dashboard
    if (!isManagerRoute && role === ROLES.MANAGER) {
      return NextResponse.redirect(new URL(MANAGER_DEFAULT_ROUTE, request.url));
    }

    // Resident accessing manager routes → redirect to resident dashboard
    if (isManagerRoute && role !== ROLES.MANAGER) {
      return NextResponse.redirect(
        new URL(RESIDENT_DEFAULT_ROUTE, request.url),
      );
    }
  } catch {
    // Invalid token → redirect to login
    const loginUrl = new URL(LOGIN_ROUTE, request.url);
    loginUrl.searchParams.set("redirect", pathname);
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

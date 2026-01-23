import { neonAuthMiddleware } from "@neondatabase/auth/next/server";

export default neonAuthMiddleware({
  // Redirects unauthenticated users to sign-in page
  loginUrl: "/login",
});

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

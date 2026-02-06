import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  // Trỏ về đúng port bạn đang chạy (5000)
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "http://localhost:5000",
});

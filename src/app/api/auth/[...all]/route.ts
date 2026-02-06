import { toNextJsHandler } from "better-auth/next-js";
import { auth } from "@/lib/auth"; // Import "Bộ não" vừa tạo ở trên

// Chuyển đổi Better Auth thành Next.js Route Handlers (GET và POST)
export const { GET, POST } = toNextJsHandler(auth);

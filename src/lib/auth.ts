import { betterAuth } from "better-auth";
import { Pool } from "pg"; // Driver kết nối PostgreSQL

// 1. Khởi tạo kết nối tới Neon DB
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Bạn cần biến này trong .env
});

// 2. Cấu hình Better Auth
export const auth = betterAuth({
  // Cấu hình Database
  database: pool,

  // Cấu hình đăng nhập mạng xã hội
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },

  // Cấu hình đường dẫn cơ sở (Rất quan trọng để tránh lỗi Connection Refused)
  // Nếu đang chạy port 5000, cái này phải là http://localhost:5000
  baseURL: process.env.BETTER_AUTH_URL,

  // Các cấu hình nâng cao khác (nếu cần)
  // advanced: { ... }
});

import type { NextConfig } from "next";
import { dirname } from "node:path";

const nextConfig: NextConfig = {
  output: "standalone", // For Docker deployment
  turbopack: {
    root: dirname(__filename),
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com", // Cho phép ảnh từ Unsplash
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "github.com", // (Optional) Cho phép ảnh avatar Github nếu dùng
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;

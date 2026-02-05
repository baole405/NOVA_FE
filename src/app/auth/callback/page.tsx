"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

function AuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");

    if (token) {
      // 1. Lưu token vào localStorage (hoặc cookie nếu muốn bảo mật hơn)
      localStorage.setItem("accessToken", token);

      // 2. (Optional) Set cookie sử dụng Cookie API
      if (typeof window !== "undefined") {
        // Create a more secure cookie path using native API if available
        try {
          // Fallback: Use document.cookie with proper encoding
          const encodedToken = encodeURIComponent(token);
          // biome-ignore lint/suspicious/noDocumentCookie: Required for auth token persistence
          document.cookie = `accessToken=${encodedToken}; path=/; max-age=86400; SameSite=Lax`; // 1 day
        } catch {}
      }

      // 3. Redirect về Dashboard
      router.push("/dashboard");
    } else {
      // Nếu không có token, quay về login
      router.push("/login?error=missing_token");
    }
  }, [router, searchParams]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="animate-pulse text-lg font-medium">Authenticating...</div>
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthCallbackContent />
    </Suspense>
  );
}

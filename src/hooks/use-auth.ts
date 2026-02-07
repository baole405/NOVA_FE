"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

interface User {
  id: number;
  username: string;
  email: string;
  fullName?: string;
  role?: string;
  phoneNumber?: string;
  image?: string; // Add if backend supports avatar
}

interface LoginPayload {
  usernameOrEmail: string;
  password: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

  const signOut = useCallback(() => {
    localStorage.removeItem("accessToken");
    // biome-ignore lint/suspicious/noDocumentCookie: Required for auth token cleanup
    document.cookie = "accessToken=; path=/; max-age=0";
    setUser(null);
    router.push("/login");
    router.refresh();
  }, [router]);

  const fetchUser = useCallback(
    async (token: string) => {
      try {
        const res = await fetch(`${API_URL}/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          const data = await res.json();
          setUser(data);
        } else {
          signOut();
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
        signOut();
      } finally {
        setLoading(false);
      }
    },
    [API_URL, signOut],
  );

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      fetchUser(token);
    } else {
      setLoading(false);
    }
  }, [fetchUser]); // Run once on mount

  const signIn = useCallback(
    async (payload: LoginPayload) => {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          throw new Error("Login failed");
        }

        const data = await res.json();
        const token = data.access_token;

        // Save token
        localStorage.setItem("accessToken", token);
        // biome-ignore lint/suspicious/noDocumentCookie: Required for auth token persistence
        document.cookie = `accessToken=${token}; path=/; max-age=86400; SameSite=Lax`;

        // Fetch user data
        await fetchUser(token);

        return true;
      } catch (error) {
        console.error("Login error:", error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [API_URL, fetchUser],
  );

  return { user, loading, signIn, signOut };
}

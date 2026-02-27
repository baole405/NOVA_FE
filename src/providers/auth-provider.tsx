"use client";

import { useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { LoginPayload, User } from "@/types/api";

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  signIn: (payload: LoginPayload) => Promise<boolean>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
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
            "ngrok-skip-browser-warning": "true",
          },
        });

        if (res.ok) {
          const data = await res.json();
          setUser(data);
        } else {
          signOut();
        }
      } catch (error) {
        console.log("Failed to fetch user:", error);
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
  }, [fetchUser]);

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
        console.log("Login error:", error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [API_URL, fetchUser],
  );

  const value = useMemo(
    () => ({ user, loading, signIn, signOut }),
    [user, loading, signIn, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

"use client";

import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { GoogleSignInButton } from "@/components/auth/google-button";
import { PolicyDialog } from "@/components/policy-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const router = useRouter();
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await signIn({
        usernameOrEmail: email,
        password,
      });
      router.push("/dashboard");
      router.refresh();
      // biome-ignore lint/suspicious/noExplicitAny: Generic error handling
    } catch (err: any) {
      setError(err.message || "Đăng nhập thất bại");
      setIsLoading(false);
    }
  };

  const [showPolicy, setShowPolicy] = useState(false);
  const [policyTab, setPolicyTab] = useState<"terms" | "privacy">("terms");

  const _openPolicy = (tab: "terms" | "privacy") => {
    setPolicyTab(tab);
    setShowPolicy(true);
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="border-border bg-card text-card-foreground shadow-sm">
        <CardHeader>
          <CardTitle>Đăng nhập</CardTitle>
          <CardDescription>Bằng Email và Mật khẩu</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-6">
            {error && (
              <div className="bg-destructive/15 text-destructive px-4 py-3 rounded-md text-sm">
                {error}
              </div>
            )}

            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
                className="bg-background"
              />
            </div>

            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Mật khẩu</Label>
                <a
                  href="/auth/forgot-password"
                  className="ml-auto text-sm text-muted-foreground underline-offset-4 hover:underline hover:text-primary"
                >
                  Quên mật khẩu?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
                className="bg-background"
              />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
            </Button>

            <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
              <span className="relative z-10 bg-card px-2 text-muted-foreground">
                Hoặc tiếp tục với
              </span>
            </div>

            <GoogleSignInButton />
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-4 border-t pt-6">
          <p className="text-sm text-muted-foreground text-center">
            Chưa có tài khoản?{" "}
            <a
              href="/auth/sign-up"
              className="text-primary underline underline-offset-4 hover:text-primary/80"
            >
              Đăng ký tại đây
            </a>
          </p>
        </CardFooter>
      </Card>
      {showPolicy && (
        <PolicyDialog
          open={showPolicy}
          onOpenChange={setShowPolicy}
          defaultTab={policyTab}
        />
      )}
    </div>
  );
}

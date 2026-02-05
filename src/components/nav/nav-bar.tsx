"use client";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { UserNav } from "./user-nav";

const mainNavItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
];

export function NavBar() {
  const pathname = usePathname();
  // Simplified auth check (Client side)
  // In real app, use a Context. Here checking localStorage for MVP/Build fix.
  // We need to suppress hydration mismatch so we use useEffect or just render
  // different content after mount.

  // Quick fix: assume guest for SSR, then check client side.
  const [isClient, setIsClient] = useState(false);
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const token = localStorage.getItem("accessToken");
    setHasToken(!!token);
  }, []);

  return (
    // Thay đổi: dùng bg-background/95 thay vì bg-white/95 để hỗ trợ dark mode
    <div className="w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link
            href="/"
            // Thay đổi: text-primary thay vì text-blue-600
            className="font-bold text-xl tracking-tight text-primary flex items-center gap-2"
          >
            NOVA
          </Link>

          {isClient && hasToken && (
            <div className="hidden md:block">
              <NavigationMenu>
                <NavigationMenuList>
                  {mainNavItems.map((item) => (
                    <NavigationMenuItem key={item.href}>
                      <NavigationMenuLink asChild>
                        <Link
                          href={item.href}
                          className={cn(
                            navigationMenuTriggerStyle(),
                            // Thay đổi: Sử dụng các biến ngữ nghĩa (muted-foreground, accent, primary)
                            "bg-transparent text-muted-foreground",
                            "hover:text-primary hover:bg-accent",
                            "data-[active]:bg-accent data-[active]:text-primary",
                            pathname === item.href &&
                              "bg-accent text-primary font-medium",
                          )}
                        >
                          <div className="flex items-center gap-2">
                            <item.icon className="w-4 h-4" />
                            <span>{item.title}</span>
                          </div>
                        </Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          )}
        </div>

        <div className="flex items-center gap-4">
          {isClient && !hasToken && (
            <div className="flex items-center gap-2">
              <Button asChild variant="ghost" size="sm">
                <Link href="/login">Sign in</Link>
              </Button>
              <Button
                asChild
                size="sm"
                // Button mặc định đã dùng bg-primary từ globals.css nên không cần hardcode bg-blue-600
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Link href="/auth/sign-up">Sign up</Link>
              </Button>
            </div>
          )}

          {isClient && hasToken && <UserNav />}
        </div>
      </div>
    </div>
  );
}

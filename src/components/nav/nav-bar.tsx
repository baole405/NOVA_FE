"use client";

import { LayoutDashboard, Loader2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";
import { UserNav } from "./user-nav";

const mainNavItems = [
  {
    title: "Bảng điều khiển",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
];

export function NavBar() {
  const pathname = usePathname();
  const { user, loading } = useAuth();

  return (
    <div className="w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="font-bold text-xl tracking-tight text-primary flex items-center gap-2"
          >
            NOVA
          </Link>

          {!loading && user && (
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
          {loading ? (
            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
          ) : !user ? (
            <div className="flex items-center gap-2">
              <Button asChild variant="ghost" size="sm">
                <Link href="/login">Đăng nhập</Link>
              </Button>
              <Button
                asChild
                size="sm"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Link href="/auth/sign-up">Đăng ký</Link>
              </Button>
            </div>
          ) : (
            <UserNav />
          )}
        </div>
      </div>
    </div>
  );
}

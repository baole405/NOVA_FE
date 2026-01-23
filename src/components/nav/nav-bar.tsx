"use client";

import { SignedIn, SignedOut, UserButton } from "@neondatabase/auth/react";
import { History, LayoutDashboard, Receipt } from "lucide-react";
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
import { cn } from "@/lib/utils";

const mainNavItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Bills",
    href: "/bills",
    icon: Receipt,
  },
  {
    title: "History",
    href: "/history",
    icon: History,
  },
];

export function NavBar() {
  const pathname = usePathname();

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

          <SignedIn>
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
          </SignedIn>
        </div>

        <div className="flex items-center gap-4">
          <SignedOut>
            <div className="flex items-center gap-2">
              <Button asChild variant="ghost" size="sm">
                <Link href="/auth/sign-in">Sign in</Link>
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
          </SignedOut>

          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </div>
  );
}

"use client";

import { Loader2, Menu } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useAuth } from "@/hooks/use-auth";
import {
  LOGIN_ROUTE,
  MANAGER_DEFAULT_ROUTE,
  MANAGER_ROUTE_PREFIX,
  RESIDENT_DEFAULT_ROUTE,
  ROLES,
} from "@/lib/constants";

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading } = useAuth();
  const isManagerRoute = pathname?.startsWith(MANAGER_ROUTE_PREFIX);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push(`${LOGIN_ROUTE}?redirect=${pathname}`);
    }
  }, [loading, user, router, pathname]);

  // Role-based redirect
  useEffect(() => {
    if (loading || !user) return;

    if (isManagerRoute && user.role !== ROLES.MANAGER) {
      router.replace(RESIDENT_DEFAULT_ROUTE);
    } else if (!isManagerRoute && user.role === ROLES.MANAGER) {
      router.replace(MANAGER_DEFAULT_ROUTE);
    }
  }, [loading, user, router, isManagerRoute]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  // Block render if wrong role (prevent flash while redirecting)
  if (isManagerRoute && user.role !== ROLES.MANAGER) {
    return null;
  }
  if (!isManagerRoute && user.role === ROLES.MANAGER) {
    return null;
  }

  // Manager routes have their own layout, so just render children
  if (isManagerRoute) {
    return <>{children}</>;
  }

  // Customer routes get the dashboard sidebar
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <div className="md:hidden flex items-center justify-between p-4 border-b bg-background sticky top-0 z-50">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>

          <SheetContent side="left" className="p-0 w-64">
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>

            <DashboardSidebar className="border-none" />
          </SheetContent>
        </Sheet>
      </div>

      <div className="hidden md:block w-64 shrink-0 border-r bg-muted/10 min-h-screen">
        <DashboardSidebar className="sticky top-0 h-screen" />
      </div>

      <main className="flex-1 overflow-x-hidden p-4 md:p-8">{children}</main>
    </div>
  );
}

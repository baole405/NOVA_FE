"use client";

import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isManagerRoute = pathname?.startsWith("/manager");

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

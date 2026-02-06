"use client";

import { History, LayoutDashboard, Receipt, User } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

// Định nghĩa các mục menu
const sidebarItems = [
  {
    title: "Tổng quan",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Hồ sơ",
    href: "/profile",
    icon: User,
  },
  {
    title: "Hóa đơn",
    href: "/bills",
    icon: Receipt,
  },
  {
    title: "Lịch sử",
    href: "/history",
    icon: History,
  },
];

interface DashboardSidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function DashboardSidebar({
  className,
  ...props
}: DashboardSidebarProps) {
  const pathname = usePathname();
  const _router = useRouter();

  return (
    <div
      className={cn("flex flex-col h-full border-r bg-card", className)}
      {...props}
    >
      <div className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
        {sidebarItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.title}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

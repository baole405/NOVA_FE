"use client";

import { History, LayoutDashboard, Receipt, User } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

// Định nghĩa các mục menu
const sidebarItems = [
  {
    title: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Profile",
    href: "/profile",
    icon: User,
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
      {/* --- Main Navigation --- */}
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
                  ? "bg-primary text-primary-foreground shadow-sm" // Active state: Màu nền chủ đạo
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground", // Inactive state
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

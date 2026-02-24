"use client";

import { cn } from "@/lib/utils";
import { Calendar, LayoutDashboard, Receipt, User, Users } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

// Định nghĩa các mục menu
interface SidebarItem {
  title: string;
  href: string;
  icon: any; // Using any for Lucide icon to avoid complex type issues
  children?: { title: string; href: string }[];
}

const sidebarItems: SidebarItem[] = [
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
    title: "Đặt chỗ",
    href: "#",
    icon: Calendar,
    children: [
      { title: "Bãi đậu xe", href: "/booking?tab=parking" },
      { title: "Khu BBQ", href: "/booking?tab=bbq" },
      { title: "Hồ bơi", href: "/booking?tab=pool" },
      { title: "Khách ra vào", href: "/booking?tab=guest" },
    ],
  },
  {
    title: "Cộng đồng",
    href: "/community",
    icon: Users,
  },
];

interface DashboardSidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function DashboardSidebar({
  className,
  ...props
}: DashboardSidebarProps) {
  const pathname = usePathname();
  const _router = useRouter();

  // Helper to check if a main item is active (including its children)
  const isItemActive = (item: any) => {
    if (item.href === pathname) return true;
    if (item.children) {
      return item.children.some((child: any) => {
        // Handle query params in href (e.g., /booking?tab=parking)
        const [childPath, _childQuery] = child.href.split("?");
        if (pathname !== childPath) return false;
        // Simple check: if path matches, consider it active for parent highlighting
        // For precise query param matching, we'd need useSearchParams
        return true;
      });
    }
    return false;
  };

  return (
    <div
      className={cn("flex flex-col h-full border-r bg-card", className)}
      {...props}
    >
      <div className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
        {sidebarItems.map((item) => {
          const isActive = isItemActive(item);

          if (item.children) {
            return (
              <div key={item.title} className="space-y-1">
                <div
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors text-muted-foreground cursor-default",
                    isActive && "text-foreground",
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.title}
                </div>
                <div className="pl-9 space-y-1">
                  {item.children.map((child: any) => {
                    // Check exact match for children including query if needed,
                    // but for sidebar highlighting usually path match is enough or we use useSearchParams.
                    // Here we just use simple link.
                    return (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={cn(
                          "block px-3 py-2 rounded-md text-sm transition-colors",
                          // We can't easily highlight based on query params without useSearchParams hook here
                          // So we settle for hover effects for now, or we can make this component client-heavy.
                          "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                        )}
                      >
                        {child.title}
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          }

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

"use client";

import {
  Building2,
  FileText,
  Home,
  Settings,
  TrendingUp,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

// Manager-specific menu items
const managerMenuItems = [
  {
    title: "Tổng quan",
    href: "/manager",
    icon: Home,
  },
  {
    title: "Quản lý cư dân",
    href: "/manager/customers",
    icon: Users,
  },
  {
    title: "Quản lý căn hộ",
    href: "/manager/apartments",
    icon: Building2,
  },
  {
    title: "Báo cáo & Thống kê",
    href: "/manager/reports",
    icon: TrendingUp,
  },
  {
    title: "Hóa đơn & Phí",
    href: "/manager/billing",
    icon: FileText,
  },
  {
    title: "Cài đặt",
    href: "/manager/settings",
    icon: Settings,
  },
];

interface ManagerSidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function ManagerSidebar({
  className,
  ...props
}: Readonly<ManagerSidebarProps>) {
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "flex flex-col h-full bg-gradient-to-b from-primary/5 to-background border-r",
        className,
      )}
      {...props}
    >
      {/* Sidebar Header */}
      <div className="px-6 py-5 border-b bg-primary/10">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-primary rounded-lg">
            <Building2 className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-foreground">
              Quản lý tòa nhà
            </h2>
            <p className="text-xs text-muted-foreground">NOVA System</p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {managerMenuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-primary text-primary-foreground shadow-md scale-[1.02]"
                  : "text-muted-foreground hover:bg-primary/10 hover:text-foreground hover:scale-[1.01]",
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.title}
            </Link>
          );
        })}
      </nav>

      {/* Sidebar Footer */}
      <div className="px-3 py-4 border-t bg-muted/30">
        <div className="px-3 py-2 rounded-lg bg-primary/5 border border-primary/20">
          <p className="text-xs font-medium text-foreground">Manager Mode</p>
          <p className="text-xs text-muted-foreground mt-0.5">Chế độ quản lý</p>
        </div>
      </div>
    </div>
  );
}

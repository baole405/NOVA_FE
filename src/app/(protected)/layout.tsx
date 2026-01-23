import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar cố định bên trái (ẩn trên mobile) */}
      <div className="hidden md:block w-64 shrink-0">
        <DashboardSidebar className="h-screen sticky top-0" />
      </div>

      {/* Nội dung chính bên phải */}
      <main className="flex-1 overflow-x-hidden">{children}</main>
    </div>
  );
}

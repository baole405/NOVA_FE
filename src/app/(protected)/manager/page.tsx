import type { Metadata } from "next";
import { ManagerDashboardClient } from "@/components/manager/dashboard/manager-dashboard-client";

export const metadata: Metadata = {
  title: "Manager Dashboard | NOVA",
  description: "Bảng điều khiển quản lý tòa nhà",
};

export default function ManagerDashboardPage() {
  return <ManagerDashboardClient />;
}

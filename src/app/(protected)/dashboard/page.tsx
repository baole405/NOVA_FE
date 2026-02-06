"use client";

import { AlertCircle, Building2, CheckCircle2, Wallet } from "lucide-react";
import { useEffect, useState } from "react";
import { StatsCard } from "@/components/dashboard/stats-card";
import { UpcomingBills } from "@/components/dashboard/upcoming-bills";
import { authClient } from "@/lib/auth/client";
import { mockBills, mockUser } from "@/lib/mock-data"; // Import Mock Data
import type { Bill } from "@/types";

export default function DashboardPage() {
  const [bills, _setBills] = useState<Bill[]>(mockBills);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<{
    name: string;
    apartment?: { unitNumber: string; block: string };
  }>({
    name: mockUser.name,
    apartment: {
      unitNumber: mockUser.apartment?.unitNumber || "N/A",
      block: mockUser.apartment?.block || "N/A",
    },
  });

  useEffect(() => {
    async function loadData() {
      try {
        const { data } = await authClient.getSession();

        if (data?.user) {
          setUser((prev) => ({
            ...prev,
            name: data.user.name || mockUser.name,
          }));
        }
      } catch (_e) {
        console.warn("Session check failed, using full mock user");
      } finally {
        setTimeout(() => setLoading(false), 500);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);

  const totalDue = bills
    .filter((b) => b.status === "pending" || b.status === "overdue")
    .reduce((sum, b) => sum + b.amount, 0);

  const pendingCount = bills.filter((b) => b.status === "pending").length;
  const overdueCount = bills.filter((b) => b.status === "overdue").length;

  return (
    <div className="space-y-8 animate-in fade-in duration-500 my-8 p-4 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-primary">
            Tổng quan
          </h2>
          <p className="text-muted-foreground mt-1">Xin chào, {user.name} 👋</p>
        </div>

        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border shadow-sm">
          <Building2 className="w-5 h-5 text-primary" />
          <div className="text-sm">
            <p className="font-medium text-foreground">
              Phòng {user.apartment?.unitNumber}
            </p>
            <p className="text-xs text-muted-foreground">
              Tòa nhà {user.apartment?.block}
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Còn nợ"
          value={formatCurrency(totalDue)}
          description="Bao gồm phí quá hạn"
          icon={Wallet}
          trend={totalDue > 0 ? "negative" : "positive"}
        />

        <StatsCard
          title="Hóa đơn chờ"
          value={`${pendingCount} Hóa đơn`}
          description="Chờ thanh toán"
          icon={AlertCircle}
          trend="neutral"
        />

        <StatsCard
          title="Quá hạn"
          value={`${overdueCount} Hóa đơn`}
          description="Cần tài khoản"
          icon={AlertCircle}
          className="border-destructive/50 bg-destructive/5"
          trend="negative"
        />

        <StatsCard
          title="Đã thanh toán tháng này"
          value="1.2M"
          description="Cảm ơn!"
          icon={CheckCircle2}
          trend="positive"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-7">
        <div className="col-span-7">
          <UpcomingBills bills={bills} />
        </div>
      </div>
    </div>
  );
}

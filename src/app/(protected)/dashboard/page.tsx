"use client";

import { StatsCard } from "@/components/dashboard/stats-card";
import { UpcomingBills } from "@/components/dashboard/upcoming-bills";
import { useAuth } from "@/hooks/use-auth";
import type { Bill } from "@/types";
import { AlertCircle, Building2, CheckCircle2, Wallet } from "lucide-react";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const [bills, setBills] = useState<Bill[]>([]);
  const [loadingBills, setLoadingBills] = useState(true);

  // Fallback to mock user if not logged in (or handle redirect)
  const displayUser: any = user || {};

  useEffect(() => {
    async function fetchBills() {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) return;

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api"}/bills`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        if (res.ok) {
          const data = await res.json();
          setBills(data);
        }
      } catch (error) {
        console.error("Failed to fetch bills:", error);
      } finally {
        setLoadingBills(false);
      }
    }

    if (user) {
      fetchBills();
    } else {
      setLoadingBills(false);
    }
  }, [user]);

  if (loading || loadingBills) {
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
    .reduce((sum, b) => Number(b.amount) + sum, 0);

  const pendingCount = bills.filter((b) => b.status === "pending").length;
  const overdueCount = bills.filter((b) => b.status === "overdue").length;

  return (
    <div className="space-y-8 animate-in fade-in duration-500 my-8 p-4 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-primary">
            Tổng quan
          </h2>
          <p className="text-muted-foreground mt-1">
            Xin chào,{" "}
            {displayUser.fullName ||
              displayUser.name ||
              displayUser.username ||
              "Cư dân"}{" "}
            👋
          </p>
        </div>

        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border shadow-sm">
          <Building2 className="w-5 h-5 text-primary" />
          <div className="text-sm">
            <p className="font-medium text-foreground">
              Phòng {displayUser.apartment?.unitNumber || "N/A"}
            </p>
            <p className="text-xs text-muted-foreground">
              Tòa nhà {displayUser.apartment?.block || "N/A"}
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
          value="0M"
          description="Cảm ơn!"
          icon={CheckCircle2}
          trend="positive"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-7">
        <div className="col-span-7">
          {bills.length > 0 ? (
            <UpcomingBills bills={bills} />
          ) : (
            <div className="text-center p-8 text-muted-foreground">
              Không có hóa đơn nào.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

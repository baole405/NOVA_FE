"use client";

import { StatsCard } from "@/components/dashboard/stats-card";
import { UpcomingBills } from "@/components/dashboard/upcoming-bills";
import { BackendBill, fetchApi, mapBillFromApi } from "@/lib/api-client";
import { authClient } from "@/lib/auth/client";
import type { Bill } from "@/types";
import { AlertCircle, Building2, CheckCircle2, Wallet } from "lucide-react";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [bills, setBills] = useState<Bill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<{
    name: string;
    apartment?: { unitNumber: string; block: string };
  } | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const { data } = await authClient.getSession();
        setUser({
          name: data?.user?.email || "Resident",
          apartment: { unitNumber: "...", block: "..." },
        });

        // Fetch Bills
        const billsData = await fetchApi<BackendBill[]>("/bills");
        const mappedBills = billsData.map(mapBillFromApi);
        setBills(mappedBills);

        // Fetch Apartment (Optional - for unit info)
        try {
          const apt = await fetchApi<any>("/apartments/my");
          if (apt) {
            setUser((prev) => ({
              ...prev!,
              apartment: { unitNumber: apt.unitNumber, block: apt.blockName },
            }));
          }
        } catch (err) {
          console.warn("Could not fetch apartment info", err);
        }
      } catch (e: any) {
        console.error("Dashboard Load Error", e);
        setError("Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return <div className="p-8 text-center">Loading dashboard...</div>;
  }

  if (error) {
    return <div className="p-8 text-center text-red-500">{error}</div>;
  }

  // --- Logic tính toán Stats ---

  // 1. Tổng tiền cần đóng (Pending + Overdue)
  const totalDue = bills
    .filter((b) => b.status === "pending" || b.status === "overdue")
    .reduce((acc, curr) => acc + curr.amount, 0);

  // 2. Số hóa đơn quá hạn
  const overdueCount = bills.filter((b) => b.status === "overdue").length;

  // 3. Số hóa đơn chờ thanh toán (Pending only)
  const pendingCount = bills.filter((b) => b.status === "pending").length;

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);

  return (
    <div className="space-y-8 animate-in fade-in duration-500 my-8 p-4 p-4 md:p-8">
      {/* --- HEADER SECTION --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-primary">
            Overview
          </h2>
          <p className="text-muted-foreground mt-1">
            Welcome back, {user?.name} 👋
          </p>
        </div>

        {/* Apartment Info Badge */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border shadow-sm">
          <Building2 className="w-5 h-5 text-primary" />
          <div className="text-sm">
            <p className="font-medium text-foreground">
              Unit {user?.apartment?.unitNumber || "N/A"}
            </p>
            <p className="text-xs text-muted-foreground">
              Block {user?.apartment?.block || "N/A"}
            </p>
          </div>
        </div>
      </div>

      {/* --- STATS CARDS GRID --- */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Card 1: Total Due */}
        <StatsCard
          title="Total Due"
          value={formatCurrency(totalDue)}
          description="Includes overdue fees"
          icon={Wallet}
          trend={totalDue > 0 ? "negative" : "positive"}
        />

        {/* Card 2: Pending Bills */}
        <StatsCard
          title="Pending Bills"
          value={`${pendingCount} Bills`}
          description="Awaiting payment"
          icon={AlertCircle}
          trend="neutral"
        />

        {/* Card 3: Overdue (Highlighted) */}
        <StatsCard
          title="Overdue"
          value={`${overdueCount} Bills`}
          description="Action required"
          icon={AlertCircle}
          className="border-destructive/50 bg-destructive/5"
          trend="negative"
        />

        {/* Card 4: Paid (Mock) */}
        <StatsCard
          title="Paid this month"
          value="1.2M" // TODO: Calculate this from transaction history
          description="Thank you!"
          icon={CheckCircle2}
          trend="positive"
        />
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-7">
        <div className="col-span-7">
          <UpcomingBills bills={bills} />
        </div>
      </div>
    </div>
  );
}

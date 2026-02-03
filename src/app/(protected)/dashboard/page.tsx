"use client";

import { AlertCircle, Building2, CheckCircle2, Wallet } from "lucide-react";
import { useEffect, useState } from "react";
import { StatsCard } from "@/components/dashboard/stats-card";
import { UpcomingBills } from "@/components/dashboard/upcoming-bills";
import { type BackendBill, fetchApi, mapBillFromApi } from "@/lib/api-client";
import { authClient } from "@/lib/auth/client";
import { mockBills, mockUser } from "@/lib/mock-data";
import type { Bill } from "@/types";

export default function DashboardPage() {
  const [bills, setBills] = useState<Bill[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<{
    name: string;
    apartment?: { unitNumber: string; block: string };
  } | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const { data } = await authClient.getSession();

        const billsData = await fetchApi<BackendBill[]>("/bills");
        const mappedBills = billsData.map(mapBillFromApi);
        setBills(mappedBills);

        let apartmentInfo = { unitNumber: "...", block: "..." };
        try {
          const apt = await fetchApi<any>("/apartments/my");
          if (apt) {
            apartmentInfo = {
              unitNumber: apt.unitNumber,
              block: apt.blockName,
            };
          }
        } catch {}

        setUser({
          name: data?.user?.name || "Resident",
          apartment: apartmentInfo,
        });
      } catch (e) {
        setBills(mockBills);
        setUser({
          name: mockUser.name,
          apartment: {
            unitNumber: mockUser.apartment?.unitNumber || "N/A",
            block: mockUser.apartment?.block || "N/A",
          },
        });
      } finally {
        setLoading(false);
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

  const totalDue = bills
    .filter((b) => b.status === "pending" || b.status === "overdue")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const overdueCount = bills.filter((b) => b.status === "overdue").length;

  const pendingCount = bills.filter((b) => b.status === "pending").length;

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);

  return (
    <div className="space-y-8 animate-in fade-in duration-500 my-8 p-4 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-primary">
            Overview
          </h2>
          <p className="text-muted-foreground mt-1">
            Welcome back, {user?.name} 👋
          </p>
        </div>

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

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Due"
          value={formatCurrency(totalDue)}
          description="Includes overdue fees"
          icon={Wallet}
          trend={totalDue > 0 ? "negative" : "positive"}
        />

        <StatsCard
          title="Pending Bills"
          value={`${pendingCount} Bills`}
          description="Awaiting payment"
          icon={AlertCircle}
          trend="neutral"
        />

        <StatsCard
          title="Overdue"
          value={`${overdueCount} Bills`}
          description="Action required"
          icon={AlertCircle}
          className="border-destructive/50 bg-destructive/5"
          trend="negative"
        />

        <StatsCard
          title="Paid this month"
          value="1.2M"
          description="Thank you!"
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

import { AlertCircle, Building2, CheckCircle2, Wallet } from "lucide-react";
import { StatsCard } from "@/components/dashboard/stats-card";
import { UpcomingBills } from "@/components/dashboard/upcoming-bills";
import { mockBills, mockUser } from "@/lib/mock-data";
// import { authClient } from "@/lib/auth/client"; // Use later for real auth

export default async function DashboardPage() {
  // --- Logic tính toán Stats ---

  // 1. Tổng tiền cần đóng (Pending + Overdue)
  const totalDue = mockBills
    .filter((b) => b.status === "pending" || b.status === "overdue")
    .reduce((acc, curr) => acc + curr.amount, 0);

  // 2. Số hóa đơn quá hạn
  const overdueCount = mockBills.filter((b) => b.status === "overdue").length;

  // 3. Số hóa đơn chờ thanh toán (Pending only)
  const pendingCount = mockBills.filter((b) => b.status === "pending").length;

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
            Welcome back, {mockUser.name} 👋
          </p>
        </div>

        {/* Apartment Info Badge */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border shadow-sm">
          <Building2 className="w-5 h-5 text-primary" />
          <div className="text-sm">
            <p className="font-medium text-foreground">
              Unit {mockUser.apartment?.unitNumber}
            </p>
            <p className="text-xs text-muted-foreground">
              Block {mockUser.apartment?.block}
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
          value="1.2M"
          description="Thank you!"
          icon={CheckCircle2}
          trend="positive"
        />
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-7">
        <div className="col-span-7">
          <UpcomingBills bills={mockBills} />
        </div>
      </div>
    </div>
  );
}

import { Wallet, AlertCircle, CheckCircle2, Building2 } from "lucide-react";
import { mockBills, mockUser } from "@/lib/mock-data";
import { StatsCard } from "@/components/dashboard/stats-card";
import { UpcomingBills } from "@/components/dashboard/upcoming-bills";
import { authClient } from "@/lib/auth/client"; // Nếu cần lấy user thật từ session

export default async function DashboardPage() {
  // Logic tính toán thống kê từ Mock Data
  // 1. Tổng tiền cần đóng (Pending + Overdue)
  const totalDue = mockBills
    .filter((b) => b.status === "pending" || b.status === "overdue")
    .reduce((acc, curr) => acc + curr.amount, 0);

  // 2. Số hóa đơn quá hạn
  const overdueCount = mockBills.filter((b) => b.status === "overdue").length;

  // 3. Số hóa đơn chờ thanh toán (chưa quá hạn)
  const pendingCount = mockBills.filter((b) => b.status === "pending").length;

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* --- HEADER SECTION --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-primary">
            Tổng quan
          </h2>
          <p className="text-muted-foreground mt-1">
            Chào mừng trở lại, {mockUser.name} 👋
          </p>
        </div>

        {/* Apartment Info Badge */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border shadow-sm">
          <Building2 className="w-5 h-5 text-primary" />
          <div className="text-sm">
            <p className="font-medium text-foreground">
              Căn hộ {mockUser.apartment?.unitNumber}
            </p>
            <p className="text-xs text-muted-foreground">
              Block {mockUser.apartment?.block}
            </p>
          </div>
        </div>
      </div>

      {/* --- STATS CARDS --- */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Card 1: Tổng nợ */}
        <StatsCard
          title="Tổng phí cần đóng"
          value={formatCurrency(totalDue)}
          description="Bao gồm cả phí quá hạn"
          icon={Wallet}
          trend={totalDue > 0 ? "negative" : "positive"} // Nếu nợ > 0 thì màu đỏ cảnh báo
        />

        {/* Card 2: Số hóa đơn chờ */}
        <StatsCard
          title="Hóa đơn sắp tới"
          value={`${pendingCount} hóa đơn`}
          description="Đang chờ thanh toán"
          icon={AlertCircle}
          trend="neutral"
        />

        {/* Card 3: Quá hạn */}
        <StatsCard
          title="Quá hạn"
          value={`${overdueCount} hóa đơn`}
          description="Cần thanh toán ngay"
          icon={AlertCircle}
          className="border-destructive/50 bg-destructive/5" // Highlight nhẹ nền đỏ
          trend="negative"
        />

        {/* Card 4: Đã đóng (Mock stat) */}
        <StatsCard
          title="Đã thanh toán"
          value="1.2M" // Mock value
          description="Trong tháng này"
          icon={CheckCircle2}
          trend="positive"
        />
      </div>

      {/* --- MAIN CONTENT SECTION --- */}
      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-7">
        {/* List Bills chiếm 7 phần chiều rộng trên màn hình lớn nếu có chart, hiện tại để full */}
        <div className="col-span-7">
          <UpcomingBills bills={mockBills} />
        </div>
      </div>
    </div>
  );
}

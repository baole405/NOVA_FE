import {
  AlertCircle,
  Building2,
  DollarSign,
  TrendingUp,
  Users,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Manager Dashboard | NOVA",
  description: "Bảng điều khiển quản lý tòa nhà",
};

export default function ManagerDashboardPage() {
  // Mock data - replace with actual data from database
  const stats = {
    totalResidents: 248,
    totalApartments: 120,
    occupancyRate: 87,
    pendingBills: 32,
    monthlyRevenue: 450000000,
    unpaidAmount: 85000000,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Bảng điều khiển quản lý
        </h1>
        <p className="text-muted-foreground">
          Tổng quan hoạt động và quản lý tòa nhà NOVA
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Tổng cư dân"
          value={stats.totalResidents.toString()}
          icon={<Users className="h-5 w-5 text-blue-600" />}
          bgColor="bg-blue-50 dark:bg-blue-950"
          href="/manager/customers"
        />
        <StatsCard
          title="Tổng căn hộ"
          value={stats.totalApartments.toString()}
          description={`Lấp đầy: ${stats.occupancyRate}%`}
          icon={<Building2 className="h-5 w-5 text-green-600" />}
          bgColor="bg-green-50 dark:bg-green-950"
          href="/manager/apartments"
        />
        <StatsCard
          title="Doanh thu tháng"
          value={formatCurrency(stats.monthlyRevenue)}
          icon={<DollarSign className="h-5 w-5 text-purple-600" />}
          bgColor="bg-purple-50 dark:bg-purple-950"
          href="/manager/reports"
        />
        <StatsCard
          title="Hóa đơn chưa thanh toán"
          value={stats.pendingBills.toString()}
          description={formatCurrency(stats.unpaidAmount)}
          icon={<AlertCircle className="h-5 w-5 text-orange-600" />}
          bgColor="bg-orange-50 dark:bg-orange-950"
          href="/manager/billing"
        />
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Thao tác nhanh
          </CardTitle>
          <CardDescription>
            Các tác vụ quản lý thường xuyên
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            <Link href="/manager/customers/create">
              <Button
                variant="outline"
                className="w-full justify-start h-auto py-4"
              >
                <Users className="mr-2 h-4 w-4" />
                <div className="text-left">
                  <div className="font-semibold">Thêm cư dân mới</div>
                  <div className="text-xs text-muted-foreground">
                    Tạo tài khoản cho khách hàng
                  </div>
                </div>
              </Button>
            </Link>

            <Button
              variant="outline"
              className="w-full justify-start h-auto py-4"
            >
              <Building2 className="mr-2 h-4 w-4" />
              <div className="text-left">
                <div className="font-semibold">Quản lý căn hộ</div>
                <div className="text-xs text-muted-foreground">
                  Xem và cập nhật thông tin
                </div>
              </div>
            </Button>

            <Button
              variant="outline"
              className="w-full justify-start h-auto py-4"
            >
              <DollarSign className="mr-2 h-4 w-4" />
              <div className="text-left">
                <div className="font-semibold">Tạo hóa đơn</div>
                <div className="text-xs text-muted-foreground">
                  Phát hành phí dịch vụ
                </div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Hoạt động gần đây</CardTitle>
            <CardDescription>
              Các thay đổi và sự kiện mới nhất
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <ActivityItem
                title="Cư dân mới đăng ký"
                description="Nguyễn Văn A - Căn hộ A101"
                time="2 giờ trước"
              />
              <ActivityItem
                title="Thanh toán hóa đơn"
                description="Trần Thị B - 2.500.000 VNĐ"
                time="4 giờ trước"
              />
              <ActivityItem
                title="Cập nhật thông tin căn hộ"
                description="B205 - Thay đổi chủ sở hữu"
                time="1 ngày trước"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cảnh báo</CardTitle>
            <CardDescription>
              Các vấn đề cần chú ý
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <AlertItem
                title="Hóa đơn quá hạn"
                description="15 căn hộ chưa thanh toán phí tháng 1"
                severity="high"
              />
              <AlertItem
                title="Căn hộ trống"
                description="8 căn hộ chưa có cư dân"
                severity="medium"
              />
              <AlertItem
                title="Bảo trì định kỳ"
                description="Kiểm tra hệ thống điện vào tuần tới"
                severity="low"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Helper Components
function StatsCard({
  title,
  value,
  description,
  icon,
  bgColor,
  href,
}: {
  title: string;
  value: string;
  description?: string;
  icon: React.ReactNode;
  bgColor: string;
  href?: string;
}) {
  const content = (
    <Card className="hover:shadow-lg transition-all duration-200 hover:scale-[1.02] cursor-pointer">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
            {description && (
              <p className="text-xs text-muted-foreground">{description}</p>
            )}
          </div>
          <div className={`p-3 rounded-full ${bgColor}`}>{icon}</div>
        </div>
      </CardContent>
    </Card>
  );

  return href ? <Link href={href}>{content}</Link> : content;
}

function ActivityItem({
  title,
  description,
  time,
}: Readonly<{
  title: string;
  description: string;
  time: string;
}>) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
      <div className="p-2 bg-primary/10 rounded-full mt-0.5">
        <div className="h-2 w-2 bg-primary rounded-full" />
      </div>
      <div className="flex-1 space-y-1">
        <p className="text-sm font-medium">{title}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
        <p className="text-xs text-muted-foreground">{time}</p>
      </div>
    </div>
  );
}

function AlertItem({
  title,
  description,
  severity,
}: Readonly<{
  title: string;
  description: string;
  severity: "high" | "medium" | "low";
}>) {
  const severityColors = {
    high: "bg-red-100 dark:bg-red-950 border-red-200 dark:border-red-800",
    medium:
      "bg-yellow-100 dark:bg-yellow-950 border-yellow-200 dark:border-yellow-800",
    low: "bg-blue-100 dark:bg-blue-950 border-blue-200 dark:border-blue-800",
  };

  return (
    <div
      className={`p-3 rounded-lg border ${severityColors[severity]} space-y-1`}
    >
      <p className="text-sm font-medium">{title}</p>
      <p className="text-xs text-muted-foreground">{description}</p>
    </div>
  );
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
}

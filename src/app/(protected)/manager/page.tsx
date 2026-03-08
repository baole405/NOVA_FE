"use client";

import {
  AlertCircle,
  Building2,
  DollarSign,
  TrendingUp,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getStatsActivity, getStatsOverview } from "@/lib/stats";
import type { StatsActivity, StatsOverview } from "@/types/stats";

export default function ManagerDashboardPage() {
  const [overview, setOverview] = useState<StatsOverview | null>(null);
  const [activity, setActivity] = useState<StatsActivity | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const [ov, act] = await Promise.all([
        getStatsOverview(),
        getStatsActivity(),
      ]);
      setOverview(ov);
      setActivity(act);
    } catch (error) {
      console.log("Failed to fetch stats:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Bảng điều khiển quản lý
        </h1>
        <p className="text-muted-foreground">
          Tổng quan hoạt động và quản lý tòa nhà NOVA
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Tổng cư dân"
          value={overview?.totalResidents.toString() ?? "—"}
          icon={<Users className="h-5 w-5 text-blue-600" />}
          bgColor="bg-blue-50 dark:bg-blue-950"
          href="/manager/customers"
        />
        <StatsCard
          title="Tổng căn hộ"
          value={overview?.totalApartments.toString() ?? "—"}
          icon={<Building2 className="h-5 w-5 text-green-600" />}
          bgColor="bg-green-50 dark:bg-green-950"
          href="/manager/apartments"
        />
        <StatsCard
          title="Doanh thu tháng"
          value={formatCurrency(overview?.paidThisMonth ?? 0)}
          description={`${overview?.paidThisMonthCount ?? 0} giao dịch`}
          icon={<DollarSign className="h-5 w-5 text-purple-600" />}
          bgColor="bg-purple-50 dark:bg-purple-950"
          href="/manager/reports"
        />
        <StatsCard
          title="Hóa đơn chưa thanh toán"
          value={(overview?.pendingCount ?? 0).toString()}
          description={`Quá hạn: ${overview?.overdueCount ?? 0} | Nợ: ${formatCurrency(overview?.totalDue ?? 0)}`}
          icon={<AlertCircle className="h-5 w-5 text-orange-600" />}
          bgColor="bg-orange-50 dark:bg-orange-950"
          href="/manager/billing"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Thao tác nhanh
          </CardTitle>
          <CardDescription>Các tác vụ quản lý thường xuyên</CardDescription>
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

            <Link href="/manager/apartments">
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
            </Link>

            <Link href="/manager/billing">
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
            </Link>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Giao dịch gần đây</CardTitle>
            <CardDescription>Thanh toán mới nhất</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {activity?.recentTransactions.length ? (
                activity.recentTransactions.map((tx) => (
                  <ActivityItem
                    key={tx.id}
                    title={tx.billTitle ?? "Giao dịch"}
                    description={formatCurrency(Number(tx.amount))}
                    time={formatDate(tx.paymentDate)}
                  />
                ))
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">
                  Chưa có giao dịch nào.
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Hóa đơn mới</CardTitle>
            <CardDescription>Hóa đơn được tạo gần đây</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {activity?.recentBills.length ? (
                activity.recentBills.map((bill) => (
                  <ActivityItem
                    key={bill.id}
                    title={bill.title}
                    description={`${formatCurrency(Number(bill.amount))} — ${bill.status}`}
                    time={formatDate(bill.createdAt)}
                  />
                ))
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">
                  Chưa có hóa đơn nào.
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

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

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

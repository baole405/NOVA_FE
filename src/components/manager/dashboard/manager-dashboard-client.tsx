"use client";

import { Building2, DollarSign, TrendingUp, Users } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useStats } from "@/hooks/use-stats";
import type { RevenuePeriod } from "@/types/stats";
import { RecentActivity } from "./recent-activity";
import { RevenueChart } from "./revenue-chart";
import { SectionCards } from "./section-cards";

export function ManagerDashboardClient() {
  const { overview, revenue, activity, loading, error, setRevenuePeriod } =
    useStats();
  const [period, setPeriod] = useState<RevenuePeriod>("6-months");

  const handlePeriodChange = (newPeriod: RevenuePeriod) => {
    setPeriod(newPeriod);
    setRevenuePeriod(newPeriod);
  };

  if (error) {
    return (
      <div className="space-y-6">
        <DashboardHeader />
        <Card className="border-destructive">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-destructive font-medium">
              Không thể tải dữ liệu thống kê
            </p>
            <p className="text-sm text-muted-foreground mt-1">{error}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <DashboardHeader />

      {/* Stats Cards */}
      {loading || !overview ? (
        <StatsCardsSkeleton />
      ) : (
        <SectionCards data={overview} />
      )}

      {/* Revenue Chart */}
      {loading || !revenue ? (
        <Skeleton className="h-[400px] w-full rounded-xl" />
      ) : (
        <RevenueChart
          data={revenue}
          period={period}
          onPeriodChange={handlePeriodChange}
        />
      )}

      {/* Quick Actions */}
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

      {/* Recent Activity */}
      {loading || !activity ? (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Skeleton className="h-[350px] rounded-xl" />
          <Skeleton className="h-[350px] rounded-xl" />
        </div>
      ) : (
        <RecentActivity data={activity} />
      )}
    </div>
  );
}

function DashboardHeader() {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-3xl font-bold tracking-tight">
        Bảng điều khiển quản lý
      </h1>
      <p className="text-muted-foreground">
        Tổng quan hoạt động và quản lý tòa nhà NOVA
      </p>
    </div>
  );
}

function StatsCardsSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Skeleton className="h-[140px] rounded-xl" />
      <Skeleton className="h-[140px] rounded-xl" />
      <Skeleton className="h-[140px] rounded-xl" />
      <Skeleton className="h-[140px] rounded-xl" />
    </div>
  );
}

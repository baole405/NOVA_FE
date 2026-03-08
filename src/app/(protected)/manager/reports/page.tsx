"use client";

import {
  BadgeDollarSign,
  FileText,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { ChartPlaceholder } from "@/components/manager/reports/chart-placeholder";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getStatsOverview, getStatsRevenue } from "@/lib/stats";
import type { RevenueMonth, StatsOverview } from "@/types/stats";

const periodMap: Record<string, string> = {
  this_month: "this-month",
  last_month: "last-month",
  this_quarter: "3-months",
  this_year: "year",
};

export default function ManagerReportsPage() {
  const [period, setPeriod] = useState("this_quarter");
  const [overview, setOverview] = useState<StatsOverview | null>(null);
  const [months, setMonths] = useState<RevenueMonth[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [ov, rev] = await Promise.all([
        getStatsOverview(),
        getStatsRevenue(periodMap[period]),
      ]);
      setOverview(ov);
      setMonths(rev.months);
    } catch (error) {
      console.log("Failed to fetch report stats:", error);
    } finally {
      setLoading(false);
    }
  }, [period]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const totalCollected = months.reduce((sum, m) => sum + m.total, 0);
  const totalTransactions = months.reduce((sum, m) => sum + m.count, 0);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <TrendingUp className="h-8 w-8 text-primary" />
            Báo cáo & Thống kê
          </h1>
          <p className="text-muted-foreground mt-2">
            Tổng quan hoạt động thu chi tòa nhà
          </p>
        </div>
        <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="this_month">Tháng này</SelectItem>
            <SelectItem value="last_month">Tháng trước</SelectItem>
            <SelectItem value="this_quarter">Quý này</SelectItem>
            <SelectItem value="this_year">Năm nay</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {loading ? (
        <div className="flex h-32 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">
                      Tổng đã thu
                    </p>
                    <p className="text-2xl font-bold">
                      {formatCurrency(totalCollected)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {totalTransactions} giao dịch
                    </p>
                  </div>
                  <div className="p-3 rounded-full bg-green-50 dark:bg-green-950">
                    <Wallet className="h-5 w-5 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">
                      Thu tháng này
                    </p>
                    <p className="text-2xl font-bold">
                      {formatCurrency(overview?.paidThisMonth ?? 0)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {overview?.paidThisMonthCount ?? 0} giao dịch
                    </p>
                  </div>
                  <div className="p-3 rounded-full bg-blue-50 dark:bg-blue-950">
                    <BadgeDollarSign className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">
                      Còn nợ
                    </p>
                    <p className="text-2xl font-bold">
                      {formatCurrency(overview?.totalDue ?? 0)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {overview?.pendingCount ?? 0} chờ thanh toán
                    </p>
                  </div>
                  <div className="p-3 rounded-full bg-orange-50 dark:bg-orange-950">
                    <Wallet className="h-5 w-5 text-orange-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">
                      Hóa đơn quá hạn
                    </p>
                    <p className="text-2xl font-bold text-destructive">
                      {overview?.overdueCount ?? 0}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Cần nhắc thanh toán
                    </p>
                  </div>
                  <div className="p-3 rounded-full bg-red-50 dark:bg-red-950">
                    <FileText className="h-5 w-5 text-red-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartPlaceholder
              title="Doanh thu theo tháng"
              description="Biểu đồ cột doanh thu — sẽ tích hợp sau khi có đủ dữ liệu"
            />
            <ChartPlaceholder
              title="Tỷ lệ thu phí"
              description="Biểu đồ tròn — cần dữ liệu revenue by fee type"
            />
          </div>

          {months.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Doanh thu theo tháng</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Tháng</TableHead>
                        <TableHead>Đã thu</TableHead>
                        <TableHead>Số giao dịch</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {months.map((row) => (
                        <TableRow key={row.month}>
                          <TableCell className="font-medium">
                            {row.month}
                          </TableCell>
                          <TableCell>{formatCurrency(row.total)}</TableCell>
                          <TableCell>{row.count}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                    <TableFooter>
                      <TableRow>
                        <TableCell className="font-bold">Tổng cộng</TableCell>
                        <TableCell className="font-bold">
                          {formatCurrency(totalCollected)}
                        </TableCell>
                        <TableCell className="font-bold">
                          {totalTransactions}
                        </TableCell>
                      </TableRow>
                    </TableFooter>
                  </Table>
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
}

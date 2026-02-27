"use client";

import {
  BadgeDollarSign,
  Building2,
  FileText,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { useState } from "react";
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

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
}

// Mock report data
const revenueData = [
  { feeType: "Phí quản lý", expected: 90000000, collected: 78000000 },
  { feeType: "Tiền điện", expected: 120000000, collected: 95000000 },
  { feeType: "Tiền nước", expected: 25000000, collected: 22000000 },
  { feeType: "Phí gửi xe", expected: 35000000, collected: 33000000 },
  { feeType: "Phí internet", expected: 15000000, collected: 14500000 },
  { feeType: "Phí dịch vụ", expected: 20000000, collected: 18000000 },
];

const totalExpected = revenueData.reduce((sum, r) => sum + r.expected, 0);
const totalCollected = revenueData.reduce((sum, r) => sum + r.collected, 0);

export default function ManagerReportsPage() {
  const [period, setPeriod] = useState("this_month");

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

      {/* Stats overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  Tổng doanh thu
                </p>
                <p className="text-2xl font-bold">
                  {formatCurrency(totalCollected)}
                </p>
                <p className="text-xs text-muted-foreground">
                  Mục tiêu: {formatCurrency(totalExpected)}
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
                  Tỷ lệ thu
                </p>
                <p className="text-2xl font-bold">
                  {Math.round((totalCollected / totalExpected) * 100)}%
                </p>
                <p className="text-xs text-muted-foreground">
                  Còn thiếu: {formatCurrency(totalExpected - totalCollected)}
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
                  Tỷ lệ lấp đầy
                </p>
                <p className="text-2xl font-bold">87%</p>
                <p className="text-xs text-muted-foreground">
                  104/120 căn hộ có người ở
                </p>
              </div>
              <div className="p-3 rounded-full bg-purple-50 dark:bg-purple-950">
                <Building2 className="h-5 w-5 text-purple-600" />
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
                <p className="text-2xl font-bold text-destructive">15</p>
                <p className="text-xs text-muted-foreground">
                  Tổng giá trị: {formatCurrency(4530000)}
                </p>
              </div>
              <div className="p-3 rounded-full bg-red-50 dark:bg-red-950">
                <FileText className="h-5 w-5 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartPlaceholder
          title="Doanh thu theo tháng"
          description="Biểu đồ cột doanh thu 12 tháng gần nhất"
        />
        <ChartPlaceholder
          title="Tỷ lệ thu phí"
          description="Biểu đồ tròn tỷ lệ thu theo loại phí"
        />
      </div>

      {/* Revenue summary table */}
      <Card>
        <CardHeader>
          <CardTitle>Bảng tổng hợp thu chi</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Loại phí</TableHead>
                  <TableHead>Dự kiến thu</TableHead>
                  <TableHead>Đã thu</TableHead>
                  <TableHead>Tỷ lệ</TableHead>
                  <TableHead>Còn thiếu</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {revenueData.map((row) => {
                  const rate = Math.round((row.collected / row.expected) * 100);
                  return (
                    <TableRow key={row.feeType}>
                      <TableCell className="font-medium">
                        {row.feeType}
                      </TableCell>
                      <TableCell>{formatCurrency(row.expected)}</TableCell>
                      <TableCell>{formatCurrency(row.collected)}</TableCell>
                      <TableCell>
                        <span
                          className={
                            rate >= 90
                              ? "text-green-600 font-medium"
                              : rate >= 70
                                ? "text-amber-600 font-medium"
                                : "text-destructive font-medium"
                          }
                        >
                          {rate}%
                        </span>
                      </TableCell>
                      <TableCell className="text-destructive">
                        {formatCurrency(row.expected - row.collected)}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell className="font-bold">Tổng cộng</TableCell>
                  <TableCell className="font-bold">
                    {formatCurrency(totalExpected)}
                  </TableCell>
                  <TableCell className="font-bold">
                    {formatCurrency(totalCollected)}
                  </TableCell>
                  <TableCell className="font-bold">
                    {Math.round((totalCollected / totalExpected) * 100)}%
                  </TableCell>
                  <TableCell className="font-bold text-destructive">
                    {formatCurrency(totalExpected - totalCollected)}
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

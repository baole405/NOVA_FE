"use client";

import {
  AlertCircle,
  Building2,
  CreditCard,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { StatsOverview } from "@/types/stats";

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
}

interface SectionCardsProps {
  data: StatsOverview;
}

export function SectionCards({ data }: SectionCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {/* Total Residents */}
      <Link href="/manager/customers">
        <Card className="hover:shadow-lg transition-all duration-200 hover:scale-[1.02]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Tổng cư dân
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="pb-2">
            <div className="text-2xl font-bold">{data.totalResidents}</div>
          </CardContent>
          <CardFooter className="text-xs text-muted-foreground">
            Tổng số cư dân đang hoạt động
          </CardFooter>
        </Card>
      </Link>

      {/* Total Apartments */}
      <Link href="/manager/apartments">
        <Card className="hover:shadow-lg transition-all duration-200 hover:scale-[1.02]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Tổng căn hộ
            </CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="pb-2">
            <div className="text-2xl font-bold">{data.totalApartments}</div>
          </CardContent>
          <CardFooter className="text-xs text-muted-foreground">
            Tổng số căn hộ trong tòa nhà
          </CardFooter>
        </Card>
      </Link>

      {/* Pending Bills */}
      <Link href="/manager/billing">
        <Card className="hover:shadow-lg transition-all duration-200 hover:scale-[1.02]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Hóa đơn chờ thanh toán
            </CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="pb-2">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">{data.pendingCount}</span>
              {data.overdueCount > 0 && (
                <Badge variant="destructive" className="text-xs">
                  <TrendingDown className="h-3 w-3" />
                  {data.overdueCount} quá hạn
                </Badge>
              )}
            </div>
          </CardContent>
          <CardFooter className="text-xs text-muted-foreground">
            Tổng nợ: {formatCurrency(data.totalDue)}
          </CardFooter>
        </Card>
      </Link>

      {/* Paid This Month */}
      <Link href="/manager/reports">
        <Card className="hover:shadow-lg transition-all duration-200 hover:scale-[1.02]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Đã thu tháng này
            </CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="pb-2">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">
                {formatCurrency(data.paidThisMonth)}
              </span>
              {data.paidThisMonthCount > 0 && (
                <Badge
                  variant="outline"
                  className="text-xs text-green-600 border-green-200"
                >
                  <TrendingUp className="h-3 w-3" />
                  {data.paidThisMonthCount} hóa đơn
                </Badge>
              )}
            </div>
          </CardContent>
          <CardFooter className="text-xs text-muted-foreground">
            Tổng thu nhập trong tháng
          </CardFooter>
        </Card>
      </Link>
    </div>
  );
}

"use client";

import { useMemo } from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { RevenuePeriod, StatsRevenue } from "@/types/stats";

const chartConfig = {
  total: {
    label: "Doanh thu",
    color: "var(--chart-1)",
  },
  count: {
    label: "Số hóa đơn",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

function formatMonthLabel(monthStr: string): string {
  const [year, month] = monthStr.split("-");
  return `T${month}/${year}`;
}

function formatCurrencyShort(value: number): string {
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1)}tr`;
  }
  if (value >= 1_000) {
    return `${(value / 1_000).toFixed(0)}k`;
  }
  return value.toString();
}

const periodLabels: Record<RevenuePeriod, string> = {
  "this-month": "Tháng này",
  "last-month": "Tháng trước",
  "3-months": "3 tháng",
  "6-months": "6 tháng",
  year: "1 năm",
};

interface RevenueChartProps {
  data: StatsRevenue;
  period: RevenuePeriod;
  onPeriodChange: (period: RevenuePeriod) => void;
}

export function RevenueChart({
  data,
  period,
  onPeriodChange,
}: RevenueChartProps) {
  const chartData = useMemo(
    () =>
      [...data.months]
        .sort((a, b) => a.month.localeCompare(b.month))
        .map((m) => ({
          month: formatMonthLabel(m.month),
          total: m.total,
          count: m.count,
        })),
    [data.months],
  );

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="space-y-1">
          <CardTitle>Doanh thu theo tháng</CardTitle>
          <CardDescription>
            Biểu đồ doanh thu {periodLabels[period].toLowerCase()}
          </CardDescription>
        </div>
        <Select
          value={period}
          onValueChange={(v) => onPeriodChange(v as RevenuePeriod)}
        >
          <SelectTrigger className="w-[140px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="3-months">3 tháng</SelectItem>
            <SelectItem value="6-months">6 tháng</SelectItem>
            <SelectItem value="year">1 năm</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        {chartData.length === 0 ? (
          <div className="flex h-[300px] items-center justify-center text-muted-foreground">
            Không có dữ liệu doanh thu cho khoảng thời gian này
          </div>
        ) : (
          <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <AreaChart data={chartData} accessibilityLayer>
              <defs>
                <linearGradient id="fillRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--chart-1)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--chart-1)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={formatCurrencyShort}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    labelFormatter={(label) => `Tháng: ${label}`}
                    formatter={(value, name) => {
                      if (name === "total") {
                        return [
                          new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(value as number),
                          "Doanh thu",
                        ];
                      }
                      return [value, "Số hóa đơn"];
                    }}
                  />
                }
              />
              <Area
                dataKey="total"
                type="monotone"
                fill="url(#fillRevenue)"
                stroke="var(--chart-1)"
                strokeWidth={2}
              />
            </AreaChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}

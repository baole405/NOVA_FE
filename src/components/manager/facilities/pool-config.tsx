"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { mockPoolSchedules } from "@/lib/mock-data";
import type { PoolScheduleConfig } from "@/types";

const dayOfWeekLabels = {
  all: "Tất cả",
  weekday: "Ngày thường",
  weekend: "Cuối tuần",
};

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(amount);
}

export function PoolConfig() {
  const [schedules] = useState<PoolScheduleConfig[]>(mockPoolSchedules);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Tổng: <strong className="text-foreground">{schedules.length}</strong> khung giờ
        </p>
        <Button size="sm">Thêm khung giờ</Button>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Khung giờ</TableHead>
              <TableHead>Ngày áp dụng</TableHead>
              <TableHead>Sức chứa</TableHead>
              <TableHead>Đã đặt</TableHead>
              <TableHead>Giá/lượt</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead className="text-right">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {schedules.map((schedule) => {
              const occupancyRate = Math.round(
                (schedule.currentBookings / schedule.maxCapacity) * 100,
              );
              return (
                <TableRow key={schedule.id}>
                  <TableCell className="font-medium">
                    {schedule.timeSlot}
                  </TableCell>
                  <TableCell>{dayOfWeekLabels[schedule.dayOfWeek]}</TableCell>
                  <TableCell>{schedule.maxCapacity} người</TableCell>
                  <TableCell>
                    <span
                      className={
                        occupancyRate >= 80
                          ? "text-destructive font-medium"
                          : ""
                      }
                    >
                      {schedule.currentBookings}/{schedule.maxCapacity} (
                      {occupancyRate}%)
                    </span>
                  </TableCell>
                  <TableCell>
                    {formatCurrency(schedule.pricePerSession)}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={
                        schedule.status === "active"
                          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                          : "bg-slate-100 text-slate-700 dark:bg-slate-900/30 dark:text-slate-400"
                      }
                    >
                      {schedule.status === "active"
                        ? "Hoạt động"
                        : "Tạm ngưng"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">Sửa</Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

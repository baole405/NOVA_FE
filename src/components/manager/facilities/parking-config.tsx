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
import { mockParkingSlots } from "@/lib/mock-data";
import type { ParkingSlotConfig, ParkingSlotStatus } from "@/types";

const statusConfig: Record<
  ParkingSlotStatus,
  { label: string; className: string }
> = {
  available: {
    label: "Trống",
    className:
      "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  },
  occupied: {
    label: "Đã thuê",
    className:
      "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  },
  maintenance: {
    label: "Bảo trì",
    className:
      "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  },
};

const typeLabels = { car: "Ô tô", motorbike: "Xe máy", bicycle: "Xe đạp" };

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
}

export function ParkingConfig() {
  const [slots] = useState<ParkingSlotConfig[]>(mockParkingSlots);

  const available = slots.filter((s) => s.status === "available").length;
  const occupied = slots.filter((s) => s.status === "occupied").length;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-4 text-sm">
          <span className="text-muted-foreground">
            Tổng: <strong className="text-foreground">{slots.length}</strong>
          </span>
          <span className="text-muted-foreground">
            Trống: <strong className="text-green-600">{available}</strong>
          </span>
          <span className="text-muted-foreground">
            Đã thuê: <strong className="text-blue-600">{occupied}</strong>
          </span>
        </div>
        <Button size="sm">Thêm vị trí</Button>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Vị trí</TableHead>
              <TableHead>Tầng</TableHead>
              <TableHead>Loại xe</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead>Giá/tháng</TableHead>
              <TableHead>Căn hộ</TableHead>
              <TableHead className="text-right">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {slots.map((slot) => {
              const status = statusConfig[slot.status];
              return (
                <TableRow key={slot.id}>
                  <TableCell className="font-medium">
                    {slot.slotNumber}
                  </TableCell>
                  <TableCell>{slot.floor}</TableCell>
                  <TableCell>{typeLabels[slot.type]}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={status.className}>
                      {status.label}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatCurrency(slot.monthlyPrice)}</TableCell>
                  <TableCell>
                    {slot.assignedTo || (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      Sửa
                    </Button>
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

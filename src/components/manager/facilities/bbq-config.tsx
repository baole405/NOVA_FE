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
import { mockBBQAreas } from "@/lib/mock-data";
import type { BBQAreaConfig } from "@/types";

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(amount);
}

export function BBQConfig() {
  const [areas] = useState<BBQAreaConfig[]>(mockBBQAreas);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Tổng: <strong className="text-foreground">{areas.length}</strong> khu BBQ
        </p>
        <Button size="sm">Thêm khu BBQ</Button>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tên khu vực</TableHead>
              <TableHead>Sức chứa</TableHead>
              <TableHead>Giá/giờ</TableHead>
              <TableHead>Giờ mở cửa</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead className="text-right">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {areas.map((area) => (
              <TableRow key={area.id}>
                <TableCell className="font-medium">{area.name}</TableCell>
                <TableCell>{area.capacity} người</TableCell>
                <TableCell>{formatCurrency(area.pricePerHour)}</TableCell>
                <TableCell>
                  {area.openTime} - {area.closeTime}
                </TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className={
                      area.status === "available"
                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400"
                    }
                  >
                    {area.status === "available" ? "Hoạt động" : "Bảo trì"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">Sửa</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

"use client";

import { Building2, Pencil, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { ApartmentStatus, ManagerApartment } from "@/types";

const statusConfig: Record<
  ApartmentStatus,
  { label: string; className: string }
> = {
  occupied: {
    label: "Đang ở",
    className:
      "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  },
  vacant: {
    label: "Trống",
    className:
      "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  },
  maintenance: {
    label: "Bảo trì",
    className: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  },
};

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
}

interface ApartmentTableProps {
  apartments: ManagerApartment[];
  onEdit: (apartment: ManagerApartment) => void;
  onDelete: (apartment: ManagerApartment) => void;
}

export function ApartmentTable({
  apartments,
  onEdit,
  onDelete,
}: ApartmentTableProps) {
  if (apartments.length === 0) {
    return (
      <EmptyState
        icon={Building2}
        title="Không có căn hộ"
        description="Không tìm thấy căn hộ nào phù hợp với bộ lọc."
      />
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Căn hộ</TableHead>
            <TableHead>Tòa</TableHead>
            <TableHead>Tầng</TableHead>
            <TableHead>Diện tích</TableHead>
            <TableHead>Cư dân</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead>Phí quản lý</TableHead>
            <TableHead className="text-right">Thao tác</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {apartments.map((apt) => {
            const status = statusConfig[apt.status];
            return (
              <TableRow key={apt.id}>
                <TableCell className="font-medium">{apt.unitNumber}</TableCell>
                <TableCell>{apt.block}</TableCell>
                <TableCell>{apt.floor}</TableCell>
                <TableCell>{apt.area} m²</TableCell>
                <TableCell>
                  {apt.residentName || (
                    <span className="text-muted-foreground">—</span>
                  )}
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className={status.className}>
                    {status.label}
                  </Badge>
                </TableCell>
                <TableCell>{formatCurrency(apt.monthlyFee)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => onEdit(apt)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:text-destructive"
                      onClick={() => onDelete(apt)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

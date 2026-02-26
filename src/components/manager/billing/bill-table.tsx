"use client";

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
import { EmptyState } from "@/components/ui/empty-state";
import { FileText } from "lucide-react";
import type { BillStatus, FeeType, ManagerBill } from "@/types";

const feeTypeLabels: Record<FeeType, string> = {
  management: "Quản lý",
  parking: "Gửi xe",
  water: "Nước",
  electricity: "Điện",
  internet: "Internet",
  service: "Dịch vụ",
};

const statusConfig: Record<BillStatus, { label: string; className: string }> = {
  pending: {
    label: "Chờ thanh toán",
    className:
      "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  },
  paid: {
    label: "Đã thanh toán",
    className:
      "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  },
  overdue: {
    label: "Quá hạn",
    className: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  },
  cancelled: {
    label: "Đã hủy",
    className:
      "bg-slate-100 text-slate-700 dark:bg-slate-900/30 dark:text-slate-400",
  },
};

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
}

interface BillTableProps {
  bills: ManagerBill[];
}

export function BillTable({ bills }: BillTableProps) {
  if (bills.length === 0) {
    return (
      <EmptyState
        icon={FileText}
        title="Không có hóa đơn"
        description="Không tìm thấy hóa đơn nào phù hợp với bộ lọc."
      />
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Căn hộ</TableHead>
            <TableHead>Cư dân</TableHead>
            <TableHead>Tiêu đề</TableHead>
            <TableHead>Loại phí</TableHead>
            <TableHead>Số tiền</TableHead>
            <TableHead>Kỳ</TableHead>
            <TableHead>Hạn</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead className="text-right">Thao tác</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bills.map((bill) => {
            const status = statusConfig[bill.status];
            return (
              <TableRow key={bill.id}>
                <TableCell className="font-medium">
                  {bill.apartmentUnit} - {bill.apartmentBlock}
                </TableCell>
                <TableCell>{bill.residentName}</TableCell>
                <TableCell className="max-w-[200px] truncate">
                  {bill.title}
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{feeTypeLabels[bill.feeType]}</Badge>
                </TableCell>
                <TableCell className="font-medium">
                  {formatCurrency(bill.amount)}
                </TableCell>
                <TableCell>{bill.period}</TableCell>
                <TableCell>
                  {new Date(bill.dueDate).toLocaleDateString("vi-VN")}
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className={status.className}>
                    {status.label}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">
                    Chi tiết
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

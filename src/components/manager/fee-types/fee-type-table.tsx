"use client";

import { Pencil, Trash2 } from "lucide-react";
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
import type { BackendFeeType } from "@/types/fee-types";

interface FeeTypeTableProps {
  feeTypes: BackendFeeType[];
  onEdit: (feeType: BackendFeeType) => void;
  onDelete: (feeType: BackendFeeType) => void;
}

export function FeeTypeTable({
  feeTypes,
  onEdit,
  onDelete,
}: FeeTypeTableProps) {
  if (feeTypes.length === 0) {
    return (
      <div className="flex items-center justify-center py-12 text-muted-foreground">
        Chưa có loại phí nào
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Tên loại phí</TableHead>
          <TableHead>Mô tả</TableHead>
          <TableHead>Đơn giá</TableHead>
          <TableHead>Đơn vị</TableHead>
          <TableHead>Định kỳ</TableHead>
          <TableHead className="text-right">Hành động</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {feeTypes.map((ft) => (
          <TableRow key={ft.id}>
            <TableCell className="font-medium">{ft.name}</TableCell>
            <TableCell className="max-w-[200px] truncate">
              {ft.description ?? "—"}
            </TableCell>
            <TableCell>
              {ft.unitPrice
                ? Number(ft.unitPrice).toLocaleString("vi-VN")
                : "—"}
            </TableCell>
            <TableCell>{ft.measureUnit ?? "—"}</TableCell>
            <TableCell>
              {ft.isRecurring ? (
                <Badge variant="default">Định kỳ</Badge>
              ) : (
                <Badge variant="secondary">Một lần</Badge>
              )}
            </TableCell>
            <TableCell className="text-right">
              <div className="flex items-center justify-end gap-1">
                <Button variant="ghost" size="icon" onClick={() => onEdit(ft)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDelete(ft)}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

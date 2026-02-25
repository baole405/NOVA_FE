"use client";

import { useState, useMemo } from "react";
import { FileText, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BillTable } from "@/components/manager/billing/bill-table";
import { CreateBillDialog } from "@/components/manager/billing/create-bill-dialog";
import { mockManagerBills } from "@/lib/mock-data";

export default function ManagerBillingPage() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [feeTypeFilter, setFeeTypeFilter] = useState("all");
  const [createOpen, setCreateOpen] = useState(false);

  const filteredBills = useMemo(() => {
    return mockManagerBills.filter((bill) => {
      if (statusFilter !== "all" && bill.status !== statusFilter) return false;
      if (feeTypeFilter !== "all" && bill.feeType !== feeTypeFilter)
        return false;
      return true;
    });
  }, [statusFilter, feeTypeFilter]);

  const totalAmount = filteredBills.reduce((sum, b) => sum + b.amount, 0);
  const unpaidAmount = filteredBills
    .filter((b) => b.status !== "paid")
    .reduce((sum, b) => sum + b.amount, 0);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <FileText className="h-8 w-8 text-primary" />
            Hóa đơn & Phí
          </h1>
          <p className="text-muted-foreground mt-2">
            Quản lý hóa đơn và phí dịch vụ cho tất cả căn hộ
          </p>
        </div>
        <Button
          size="lg"
          className="w-full sm:w-auto"
          onClick={() => setCreateOpen(true)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Tạo hóa đơn
        </Button>
      </div>

      {/* Stats summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Tổng hóa đơn</p>
            <p className="text-2xl font-bold">{filteredBills.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Tổng giá trị</p>
            <p className="text-2xl font-bold">
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(totalAmount)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Chưa thanh toán</p>
            <p className="text-2xl font-bold text-destructive">
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(unpaidAmount)}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-44">
            <SelectValue placeholder="Trạng thái" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả trạng thái</SelectItem>
            <SelectItem value="pending">Chờ thanh toán</SelectItem>
            <SelectItem value="paid">Đã thanh toán</SelectItem>
            <SelectItem value="overdue">Quá hạn</SelectItem>
          </SelectContent>
        </Select>

        <Select value={feeTypeFilter} onValueChange={setFeeTypeFilter}>
          <SelectTrigger className="w-44">
            <SelectValue placeholder="Loại phí" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả loại phí</SelectItem>
            <SelectItem value="electricity">Tiền điện</SelectItem>
            <SelectItem value="water">Tiền nước</SelectItem>
            <SelectItem value="management">Phí quản lý</SelectItem>
            <SelectItem value="parking">Phí gửi xe</SelectItem>
            <SelectItem value="internet">Phí internet</SelectItem>
            <SelectItem value="service">Phí dịch vụ</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>Danh sách hóa đơn</CardTitle>
          <CardDescription>
            Hiển thị {filteredBills.length} / {mockManagerBills.length} hóa đơn
          </CardDescription>
        </CardHeader>
        <CardContent>
          <BillTable bills={filteredBills} />
        </CardContent>
      </Card>

      <CreateBillDialog open={createOpen} onOpenChange={setCreateOpen} />
    </div>
  );
}

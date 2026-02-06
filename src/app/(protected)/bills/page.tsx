"use client";

import { AlertCircle, ArrowRight, CheckCircle2, Clock } from "lucide-react";
import { useState } from "react";
import { BillDetailDialog } from "@/components/bills/bill-detail-dialog";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button"; // Import thêm buttonVariants
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockBills } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import type { Bill } from "@/types";

export default function BillsPage() {
  const [selectedBill, setSelectedBill] = useState<Bill | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-GB");

  const unpaidBills = mockBills.filter(
    (b) => b.status === "pending" || b.status === "overdue",
  );

  const handleOpenDetail = (bill: Bill) => {
    setSelectedBill(bill);
    setIsModalOpen(true);
  };

  const BillItem = ({ bill }: { bill: Bill }) => (
    <button
      type="button"
      onClick={() => handleOpenDetail(bill)}
      className="w-full text-left flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg bg-card hover:bg-accent/50 transition-colors gap-4 cursor-pointer group focus:outline-none focus:ring-2 focus:ring-primary/50"
    >
      <div className="flex items-start gap-4">
        <div
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border",
            bill.status === "overdue"
              ? "bg-destructive/10 text-destructive border-destructive/20"
              : bill.status === "paid"
                ? "bg-green-100 text-green-600 border-green-200"
                : "bg-primary/10 text-primary border-primary/20",
          )}
        >
          {bill.status === "overdue" ? (
            <AlertCircle className="h-5 w-5" />
          ) : bill.status === "paid" ? (
            <CheckCircle2 className="h-5 w-5" />
          ) : (
            <Clock className="h-5 w-5" />
          )}
        </div>
        <div className="space-y-1">
          <h4 className="font-semibold leading-none group-hover:text-primary transition-colors">
            {bill.title}
          </h4>
          <p className="text-sm text-muted-foreground">Period: {bill.period}</p>
          <div className="flex items-center gap-2 mt-1">
            <Badge
              variant={bill.status === "overdue" ? "destructive" : "secondary"}
              className="capitalize"
            >
              {bill.status}
            </Badge>
            <span className="text-xs text-muted-foreground">
              Due: {formatDate(bill.dueDate)}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto mt-2 sm:mt-0">
        <div className="text-right">
          <p className="font-bold text-lg">{formatCurrency(bill.amount)}</p>
          <p className="text-xs text-muted-foreground capitalize">
            {bill.feeType}
          </p>
        </div>
        {bill.status !== "paid" && (
          <div className={cn(buttonVariants({ size: "sm" }))}>
            Thanh toán <ArrowRight className="ml-1 h-4 w-4" />
          </div>
        )}
      </div>
    </button>
  );

  return (
    <div className="space-y-6 p-4 md:p-8 max-w-5xl mx-auto">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-primary">
          Hóa đơn
        </h2>
        <p className="text-muted-foreground">
          Quản lý và thanh toán các khoản phí dịch vụ hàng tháng.
        </p>
      </div>

      <Tabs defaultValue="unpaid" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2 mb-4">
          <TabsTrigger value="unpaid">
            Chêu thanh toán ({unpaidBills.length})
          </TabsTrigger>
          <TabsTrigger value="all">Tất cả Hóa đơn</TabsTrigger>
        </TabsList>

        <TabsContent value="unpaid" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Đang chờ Thanh toán</CardTitle>
              <CardDescription>
                Các khoản phí cần đưa đấu lưu ý.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {unpaidBills.length > 0 ? (
                unpaidBills.map((bill) => (
                  <BillItem key={bill.id} bill={bill} />
                ))
              ) : (
                <div className="text-center py-10 text-muted-foreground">
                  Không có hóa đơn chờm. Bạn đã hoàn thành tất cả!
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>Lịch sử & Lưu trữ</CardTitle>
              <CardDescription>
                Danh sách tất cả hóa đơn của bạn.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockBills.map((bill) => (
                <BillItem key={bill.id} bill={bill} />
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <BillDetailDialog
        bill={selectedBill}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </div>
  );
}

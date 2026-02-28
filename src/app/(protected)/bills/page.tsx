"use client";

import {
  AlertCircle,
  ArrowRight,
  ArrowUpDown,
  CheckCircle2,
  Clock,
  FileX,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { BillDetailDialog } from "@/components/bills/bill-detail-dialog";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/use-auth";
import { getBills } from "@/lib/bills";
import { cn } from "@/lib/utils";
import type { BackendBill } from "@/types/api";

function getDateRange(preset: string): { from?: string; to?: string } {
  if (preset === "all") return {};
  const now = new Date();
  const to = now.toISOString().split("T")[0];
  const from = new Date(now);
  if (preset === "1m") from.setMonth(from.getMonth() - 1);
  else if (preset === "3m") from.setMonth(from.getMonth() - 3);
  else if (preset === "6m") from.setMonth(from.getMonth() - 6);
  return { from: from.toISOString().split("T")[0], to };
}

export default function BillsPage() {
  const { user } = useAuth();
  const [bills, setBills] = useState<BackendBill[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBill, setSelectedBill] = useState<BackendBill | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [periodPreset, setPeriodPreset] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"dueDate" | "amount">("dueDate");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const fetchBills = useCallback(async () => {
    try {
      setLoading(true);
      const { from, to } = getDateRange(periodPreset);
      const res = await getBills({
        sortBy,
        sortOrder,
        dueDateFrom: from,
        dueDateTo: to,
      });
      setBills(res.data);
    } catch (err) {
      console.log(
        "Failed to fetch bills:",
        err instanceof Error ? err.message : "Unknown error",
      );
    } finally {
      setLoading(false);
    }
  }, [periodPreset, sortBy, sortOrder]);

  useEffect(() => {
    if (user) {
      fetchBills();
    }
  }, [user, fetchBills]);

  const formatCurrency = (amount: number | string) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(Number(amount));

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-GB");

  const unpaidBills = bills.filter(
    (b) => b.status === "pending" || b.status === "overdue",
  );

  const handleOpenDetail = (bill: BackendBill) => {
    setSelectedBill(bill);
    setIsModalOpen(true);
  };

  const LoadingSpinner = () => (
    <div className="flex py-10 items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
    </div>
  );

  const BillItem = ({ bill }: { bill: BackendBill }) => (
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
            {bill.feeType?.name ?? "N/A"}
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

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {[
            { value: "1m", label: "Tháng này" },
            { value: "3m", label: "3 tháng" },
            { value: "6m", label: "6 tháng" },
            { value: "all", label: "Tất cả" },
          ].map((preset) => (
            <button
              key={preset.value}
              type="button"
              onClick={() => setPeriodPreset(preset.value)}
              className={cn(
                "px-3 py-1.5 text-sm rounded-md border transition-colors",
                periodPreset === preset.value
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background hover:bg-accent border-input",
              )}
            >
              {preset.label}
            </button>
          ))}
        </div>

        <Select
          value={`${sortBy}-${sortOrder}`}
          onValueChange={(v) => {
            const [field, order] = v.split("-") as [
              "dueDate" | "amount",
              "asc" | "desc",
            ];
            setSortBy(field);
            setSortOrder(order);
          }}
        >
          <SelectTrigger className="w-[200px]" size="sm">
            <ArrowUpDown className="h-4 w-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="dueDate-desc">Hạn đóng (mới nhất)</SelectItem>
            <SelectItem value="dueDate-asc">Hạn đóng (cũ nhất)</SelectItem>
            <SelectItem value="amount-desc">Số tiền (cao → thấp)</SelectItem>
            <SelectItem value="amount-asc">Số tiền (thấp → cao)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="unpaid" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2 mb-4">
          <TabsTrigger value="unpaid">
            Chờ thanh toán ({unpaidBills.length})
          </TabsTrigger>
          <TabsTrigger value="all">Tất cả Hóa đơn</TabsTrigger>
        </TabsList>

        <TabsContent value="unpaid" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Đang chờ Thanh toán</CardTitle>
              <CardDescription>Các khoản phí cần được lưu ý.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {loading ? (
                <LoadingSpinner />
              ) : unpaidBills.length > 0 ? (
                unpaidBills.map((bill) => (
                  <BillItem key={bill.id} bill={bill} />
                ))
              ) : (
                <EmptyState
                  icon={FileX}
                  title="Không có hóa đơn chờ"
                  description="Bạn đã hoàn thành tất cả!"
                />
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
              {loading ? (
                <LoadingSpinner />
              ) : bills.length > 0 ? (
                bills.map((bill) => <BillItem key={bill.id} bill={bill} />)
              ) : (
                <EmptyState
                  icon={FileX}
                  title="Không tìm thấy hóa đơn"
                  description="Thử thay đổi bộ lọc để xem thêm hóa đơn."
                />
              )}
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

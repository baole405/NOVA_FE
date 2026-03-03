"use client";

import { FileX, History, Loader2 } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAuth } from "@/hooks/use-auth";
import { getTransactions } from "@/lib/transactions";
import { cn } from "@/lib/utils";
import type { BackendTransaction } from "@/types/transactions";

const PAYMENT_METHOD_LABELS: Record<string, string> = {
  bank_transfer: "Chuyển khoản",
  momo: "MoMo",
  vnpay: "VNPay",
  payos: "PayOS",
  cash: "Tiền mặt",
};

const PERIOD_PRESETS = [
  { value: "1m", label: "Tháng này" },
  { value: "3m", label: "3 tháng" },
  { value: "6m", label: "6 tháng" },
  { value: "all", label: "Tất cả" },
];

function getCutoffDate(preset: string): Date | null {
  if (preset === "all") return null;
  const now = new Date();
  if (preset === "1m") now.setMonth(now.getMonth() - 1);
  else if (preset === "3m") now.setMonth(now.getMonth() - 3);
  else if (preset === "6m") now.setMonth(now.getMonth() - 6);
  return now;
}

export default function HistoryPage() {
  const { user } = useAuth();
  const [allTransactions, setAllTransactions] = useState<BackendTransaction[]>(
    [],
  );
  const [loading, setLoading] = useState(true);
  const [periodPreset, setPeriodPreset] = useState<string>("all");

  const fetchTransactions = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getTransactions({ limit: 200 });
      setAllTransactions(res.data);
    } catch (err) {
      console.log(
        "Failed to fetch transactions:",
        err instanceof Error ? err.message : "Unknown error",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user) {
      fetchTransactions();
    }
  }, [user, fetchTransactions]);

  const transactions = useMemo(() => {
    const cutoff = getCutoffDate(periodPreset);
    if (!cutoff) return allTransactions;
    return allTransactions.filter((t) => new Date(t.paymentDate) >= cutoff);
  }, [allTransactions, periodPreset]);

  const formatCurrency = (amount: number | string) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(Number(amount));

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  const formatPaymentMethod = (method: string | null) => {
    if (!method) return "—";
    return PAYMENT_METHOD_LABELS[method] ?? method;
  };

  return (
    <div className="space-y-6 p-4 md:p-8 max-w-5xl mx-auto">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-primary">
          Lịch sử Giao dịch
        </h2>
        <p className="text-muted-foreground">
          Theo dõi các khoản thanh toán của bạn.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {PERIOD_PRESETS.map((preset) => (
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

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="h-5 w-5" />
            Giao dịch gần đây
            {!loading && (
              <Badge variant="secondary" className="ml-2">
                {transactions.length}
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex py-10 items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : transactions.length === 0 ? (
            <EmptyState
              icon={FileX}
              title="Không có giao dịch"
              description={
                periodPreset === "all"
                  ? "Bạn chưa có giao dịch nào."
                  : "Không có giao dịch trong khoảng thời gian này."
              }
            />
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Mã giao dịch</TableHead>
                    <TableHead>Dịch vụ</TableHead>
                    <TableHead>Ngày</TableHead>
                    <TableHead>Phương thức</TableHead>
                    <TableHead className="text-right">Số tiền</TableHead>
                    <TableHead className="text-right">Trạng thái</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((trans) => (
                    <TableRow key={trans.id}>
                      <TableCell className="font-medium font-mono text-xs text-muted-foreground">
                        {trans.transactionRef ?? "—"}
                      </TableCell>
                      <TableCell className="font-medium">
                        {trans.billTitle ?? "—"}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {formatDate(trans.paymentDate)}
                      </TableCell>
                      <TableCell>
                        {formatPaymentMethod(trans.paymentMethod)}
                      </TableCell>
                      <TableCell className="text-right font-bold">
                        {formatCurrency(trans.amount)}
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge
                          variant="outline"
                          className="bg-green-50 text-green-700 border-green-200"
                        >
                          Thành công
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

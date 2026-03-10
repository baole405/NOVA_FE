"use client";

import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { ArrowUpRight, CreditCard, FileText } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { StatsActivity } from "@/types/stats";

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
}

function formatDate(dateStr: string): string {
  return format(new Date(dateStr), "dd/MM/yyyy", { locale: vi });
}

const paymentMethodLabels: Record<string, string> = {
  momo: "MoMo",
  bank_transfer: "Chuyển khoản",
  vnpay: "VNPay",
  cash: "Tiền mặt",
};

const billStatusConfig: Record<
  string,
  {
    label: string;
    variant: "default" | "secondary" | "destructive" | "outline";
  }
> = {
  paid: { label: "Đã thanh toán", variant: "default" },
  pending: { label: "Chờ thanh toán", variant: "secondary" },
  overdue: { label: "Quá hạn", variant: "destructive" },
};

interface RecentActivityProps {
  data: StatsActivity;
}

export function RecentActivity({ data }: RecentActivityProps) {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      {/* Recent Transactions */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Giao dịch gần đây
            </CardTitle>
            <CardDescription>
              {data.recentTransactions.length} giao dịch mới nhất
            </CardDescription>
          </div>
          <Link href="/manager/reports">
            <Button variant="outline" size="sm">
              Xem tất cả
              <ArrowUpRight className="ml-1 h-3 w-3" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Hóa đơn</TableHead>
                <TableHead>Phương thức</TableHead>
                <TableHead className="text-right">Số tiền</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.recentTransactions.map((tx) => (
                <TableRow key={tx.id}>
                  <TableCell>
                    <div className="font-medium text-sm">{tx.billTitle}</div>
                    <div className="text-xs text-muted-foreground">
                      {formatDate(tx.paymentDate)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs">
                      {paymentMethodLabels[tx.paymentMethod] ??
                        tx.paymentMethod}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-medium text-sm">
                    {formatCurrency(Number.parseFloat(tx.amount))}
                  </TableCell>
                </TableRow>
              ))}
              {data.recentTransactions.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={3}
                    className="text-center text-muted-foreground py-8"
                  >
                    Chưa có giao dịch nào
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Recent Bills */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Hóa đơn gần đây
            </CardTitle>
            <CardDescription>
              {data.recentBills.length} hóa đơn mới nhất
            </CardDescription>
          </div>
          <Link href="/manager/billing">
            <Button variant="outline" size="sm">
              Xem tất cả
              <ArrowUpRight className="ml-1 h-3 w-3" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Hóa đơn</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="text-right">Số tiền</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.recentBills.map((bill) => {
                const statusCfg = billStatusConfig[bill.status] ?? {
                  label: bill.status,
                  variant: "outline" as const,
                };
                return (
                  <TableRow key={bill.id}>
                    <TableCell>
                      <div className="font-medium text-sm">{bill.title}</div>
                      <div className="text-xs text-muted-foreground">
                        Hạn: {formatDate(bill.dueDate)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={statusCfg.variant} className="text-xs">
                        {statusCfg.label}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-medium text-sm">
                      {formatCurrency(Number.parseFloat(bill.amount))}
                    </TableCell>
                  </TableRow>
                );
              })}
              {data.recentBills.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={3}
                    className="text-center text-muted-foreground py-8"
                  >
                    Chưa có hóa đơn nào
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTransactions } from "@/hooks/use-transactions";

export default function HistoryPage() {
  const { transactions, loading } = useTransactions();

  const formatCurrency = (amount: number | string) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(Number(amount));

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 md:p-8 max-w-5xl mx-auto">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-primary">
          Lịch sử Giao dịch
        </h2>
        <p className="text-muted-foreground">
          Đánh giá các khoản thanh toán của bạn.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Đơn vị giao dịch gần đây</CardTitle>
        </CardHeader>
        <CardContent>
          {transactions.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground">
              Chưa có giao dịch nào.
            </div>
          ) : (
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
                      {trans.transactionRef ?? "-"}
                    </TableCell>
                    <TableCell className="font-medium">
                      {trans.bill.title}
                    </TableCell>
                    <TableCell>{formatDate(trans.createdAt)}</TableCell>
                    <TableCell className="capitalize">
                      {trans.method.replace("_", " ")}
                    </TableCell>
                    <TableCell className="text-right font-bold">
                      {formatCurrency(trans.amount)}
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-700 border-green-200"
                      >
                        Success
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

import { AlertCircle, ArrowRight, Clock } from "lucide-react";
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
import { cn } from "@/lib/utils";
import type { Bill } from "@/types";

// Format tiền tệ VND
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
};

export function UpcomingBills({ bills }: { bills: Bill[] }) {
  // Chỉ lấy tối đa 5 hóa đơn chưa thanh toán
  const pendingBills = bills.filter((b) => b.status !== "paid").slice(0, 5);

  return (
    <Card className="col-span-1 md:col-span-2 lg:col-span-3">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="space-y-1">
          <CardTitle>Hóa đơn cần thanh toán</CardTitle>
          <CardDescription>
            Bạn có {pendingBills.length} khoản phí đang chờ xử lý.
          </CardDescription>
        </div>
        <Button
          variant="ghost"
          size="sm"
          asChild
          className="text-primary hover:bg-accent"
        >
          <Link href="/bills" className="flex items-center gap-1">
            Xem tất cả <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {pendingBills.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              Tuyệt vời! Bạn không có hóa đơn nào cần đóng.
            </div>
          ) : (
            pendingBills.map((bill) => (
              <div
                key={bill.id}
                className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={cn(
                      "flex h-9 w-9 items-center justify-center rounded-full border",
                      bill.status === "overdue"
                        ? "bg-destructive/10 border-destructive/20 text-destructive"
                        : "bg-primary/10 border-primary/20 text-primary",
                    )}
                  >
                    {bill.status === "overdue" ? (
                      <AlertCircle className="h-5 w-5" />
                    ) : (
                      <Clock className="h-5 w-5" />
                    )}
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {bill.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Hạn đóng:{" "}
                      {new Date(bill.dueDate).toLocaleDateString("vi-VN")}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right hidden sm:block">
                    <p className="text-sm font-bold">
                      {formatCurrency(bill.amount)}
                    </p>
                    <p className="text-xs text-muted-foreground capitalize">
                      {bill.feeType}
                    </p>
                  </div>
                  <Badge
                    variant={
                      bill.status === "overdue" ? "destructive" : "secondary"
                    }
                    className={cn(
                      bill.status === "pending" &&
                        "bg-amber-100 text-amber-700 hover:bg-amber-100 border-amber-200",
                    )}
                  >
                    {bill.status === "overdue" ? "Quá hạn" : "Chờ đóng"}
                  </Badge>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}

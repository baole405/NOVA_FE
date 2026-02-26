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
import type { BackendBill } from "@/types/api";

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
};

export function UpcomingBills({ bills }: { bills: BackendBill[] }) {
  // Lọc lấy tối đa 5 hóa đơn chưa thanh toán (Pending hoặc Overdue)
  const pendingBills = bills.filter((b) => b.status !== "paid").slice(0, 5);

  return (
    <Card className="col-span-1 md:col-span-2 lg:col-span-3">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="space-y-1">
          <CardTitle>Upcoming Bills</CardTitle>
          <CardDescription>
            You have {pendingBills.length} pending bills to pay.
          </CardDescription>
        </div>
        <Button
          variant="ghost"
          size="sm"
          asChild
          className="text-primary hover:bg-accent group"
        >
          <Link href="/bills" className="flex items-center gap-1">
            View All{" "}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {pendingBills.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              Great! You have no pending bills.
            </div>
          ) : (
            pendingBills.map((bill) => (
              <div
                key={bill.id}
                className="flex items-center justify-between p-4 rounded-lg border border-border bg-card hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  {/* Icon trạng thái: Đỏ nếu quá hạn, Xanh nếu chờ đóng */}
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
                      Due date:{" "}
                      {new Date(bill.dueDate).toLocaleDateString("en-GB")}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right hidden sm:block">
                    <p className="text-sm font-bold">
                      {formatCurrency(Number(bill.amount))}
                    </p>
                    <p className="text-xs text-muted-foreground capitalize">
                      {bill.feeType?.name ?? "N/A"}
                    </p>
                  </div>
                  <Badge
                    variant={
                      bill.status === "overdue" ? "destructive" : "secondary"
                    }
                    className={cn(
                      // Custom style cho badge Pending (màu vàng cam)
                      bill.status === "pending" &&
                        "bg-amber-100 text-amber-700 hover:bg-amber-100 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800",
                    )}
                  >
                    {bill.status === "overdue" ? "Overdue" : "Pending"}
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

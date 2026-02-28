"use client";

import {
  Building2,
  Calendar,
  CreditCard,
  Download,
  Loader2,
  ShieldCheck,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { getBillById } from "@/lib/bills";
import type {
  BackendBill,
  BackendBillDetail,
  BackendBillItem,
} from "@/types/api";

interface BillDetailDialogProps {
  bill: BackendBill | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function ItemBreakdown({ item }: { item: BackendBillItem }) {
  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);

  const unit = item.measureUnit?.replace("VND/", "") ?? "";

  return (
    <div className="space-y-1.5 py-3 first:pt-0 last:pb-0">
      <div className="flex justify-between text-sm font-medium">
        <span>{item.title}</span>
        <span>{formatCurrency(Number(item.amount))}</span>
      </div>
      {item.usage && item.unitPrice ? (
        <p className="text-xs text-muted-foreground">
          {formatCurrency(Number(item.unitPrice))}/{unit} x {item.usage} {unit}
        </p>
      ) : (
        <p className="text-xs text-muted-foreground">Phí cố định</p>
      )}
    </div>
  );
}

export function BillDetailDialog({
  bill,
  open,
  onOpenChange,
}: BillDetailDialogProps) {
  const [detail, setDetail] = useState<BackendBillDetail | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!bill || !open) {
      setDetail(null);
      return;
    }

    const billId = bill.id;

    async function fetchDetail() {
      setLoading(true);
      try {
        const data = await getBillById(billId);
        setDetail(data);
      } catch {
        setDetail(null);
      } finally {
        setLoading(false);
      }
    }

    fetchDetail();
  }, [bill, open]);

  if (!bill) return null;

  const amount = Number(bill.amount);

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <div className="mx-auto mb-4 bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center">
            <CreditCard className="h-6 w-6 text-primary" />
          </div>
          <DialogTitle className="text-center text-xl">
            {bill.title}
          </DialogTitle>
          <DialogDescription className="text-center">
            Kỳ thanh toán: {bill.period}
          </DialogDescription>
          <div className="flex justify-center mt-2">
            <Badge
              variant={bill.status === "overdue" ? "destructive" : "secondary"}
              className="uppercase"
            >
              {bill.status}
            </Badge>
          </div>
        </DialogHeader>

        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <div className="py-4 space-y-6">
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground flex items-center gap-2">
                  <Building2 className="h-4 w-4" /> Căn hộ
                </span>
                <span className="font-medium">
                  {detail?.apartment
                    ? `${detail.apartment.block} - ${detail.apartment.unitNumber}`
                    : "N/A"}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground flex items-center gap-2">
                  <Calendar className="h-4 w-4" /> Hạn đóng
                </span>
                <span>
                  {new Date(bill.dueDate).toLocaleDateString("en-GB")}
                </span>
              </div>
            </div>

            <Separator />

            <div className="bg-muted/30 p-4 rounded-lg">
              <p className="text-sm font-medium mb-3">Chi tiết phí</p>
              {detail?.items && detail.items.length > 0 ? (
                <div className="divide-y">
                  {detail.items.map((item) => (
                    <ItemBreakdown key={item.id} item={item} />
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Không có chi tiết
                </p>
              )}
              <Separator className="my-3" />
              <div className="flex justify-between font-bold text-lg text-primary">
                <span>Thành tiền</span>
                <span>{formatCurrency(amount)}</span>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-md flex gap-3 items-start text-xs text-blue-700 dark:text-blue-300">
              <ShieldCheck className="h-4 w-4 shrink-0 mt-0.5" />
              <p>
                Thanh toán được xử lý an toàn qua PayOS. Lịch sử giao dịch sẽ
                được cập nhật ngay sau khi thanh toán.
              </p>
            </div>
          </div>
        )}

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button variant="outline" className="w-full sm:w-auto">
            <Download className="mr-2 h-4 w-4" /> PDF
          </Button>
          {bill.status !== "paid" && (
            <Button className="w-full sm:w-auto shadow-lg shadow-primary/20">
              Thanh toán {formatCurrency(amount)}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

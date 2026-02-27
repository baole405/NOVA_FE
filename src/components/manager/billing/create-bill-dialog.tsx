"use client";

import { Loader2, Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockAllApartments } from "@/lib/mock-data";
import type { FeeType } from "@/types";

const feeTypeLabels: Record<FeeType, string> = {
  management: "Phí quản lý",
  parking: "Phí gửi xe",
  water: "Tiền nước",
  electricity: "Tiền điện",
  internet: "Phí internet",
  service: "Phí dịch vụ",
};

interface CreateBillDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateBillDialog({
  open,
  onOpenChange,
}: CreateBillDialogProps) {
  const [formData, setFormData] = useState({
    apartmentId: "",
    feeType: "" as FeeType | "",
    amount: "",
    period: "",
    dueDate: "",
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (
      !formData.apartmentId ||
      !formData.feeType ||
      !formData.amount ||
      !formData.dueDate
    ) {
      setError("Vui lòng điền đầy đủ thông tin bắt buộc.");
      return;
    }

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    onOpenChange(false);
    setFormData({
      apartmentId: "",
      feeType: "",
      amount: "",
      period: "",
      dueDate: "",
      description: "",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Tạo hóa đơn mới</DialogTitle>
          <DialogDescription>
            Tạo hóa đơn cho căn hộ trong tòa nhà
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-destructive/15 text-destructive px-4 py-3 rounded-md text-sm">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <Label>
              Căn hộ <span className="text-destructive">*</span>
            </Label>
            <Select
              value={formData.apartmentId}
              onValueChange={(v) =>
                setFormData((prev) => ({ ...prev, apartmentId: v }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Chọn căn hộ" />
              </SelectTrigger>
              <SelectContent>
                {mockAllApartments.map((apt) => (
                  <SelectItem key={apt.id} value={apt.id}>
                    {apt.unitNumber} - Tòa {apt.block}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>
                Loại phí <span className="text-destructive">*</span>
              </Label>
              <Select
                value={formData.feeType}
                onValueChange={(v: FeeType) =>
                  setFormData((prev) => ({ ...prev, feeType: v }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn loại phí" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(feeTypeLabels).map(([key, label]) => (
                    <SelectItem key={key} value={key}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">
                Số tiền (VNĐ) <span className="text-destructive">*</span>
              </Label>
              <Input
                id="amount"
                type="number"
                placeholder="0"
                value={formData.amount}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, amount: e.target.value }))
                }
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="period">Kỳ thanh toán</Label>
              <Input
                id="period"
                placeholder="MM/YYYY"
                value={formData.period}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, period: e.target.value }))
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dueDate">
                Hạn thanh toán <span className="text-destructive">*</span>
              </Label>
              <Input
                id="dueDate"
                type="date"
                value={formData.dueDate}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, dueDate: e.target.value }))
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Ghi chú</Label>
            <Input
              id="description"
              placeholder="Ghi chú thêm (tùy chọn)"
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Hủy
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Plus className="mr-2 h-4 w-4" />
              )}
              {isSubmitting ? "Đang tạo..." : "Tạo hóa đơn"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

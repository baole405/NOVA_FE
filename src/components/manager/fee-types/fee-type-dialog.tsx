"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { createFeeType, updateFeeType } from "@/lib/fee-types";
import type { BackendFeeType } from "@/types/fee-types";

interface FeeTypeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  feeType?: BackendFeeType | null;
  onSuccess: () => void;
}

export function FeeTypeDialog({
  open,
  onOpenChange,
  feeType,
  onSuccess,
}: FeeTypeDialogProps) {
  const isEdit = !!feeType;

  const [name, setName] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [measureUnit, setMeasureUnit] = useState("");
  const [description, setDescription] = useState("");
  const [isRecurring, setIsRecurring] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (feeType) {
      setName(feeType.name);
      setUnitPrice(feeType.unitPrice ?? "");
      setMeasureUnit(feeType.measureUnit ?? "");
      setDescription(feeType.description ?? "");
      setIsRecurring(feeType.isRecurring ?? true);
    } else {
      setName("");
      setUnitPrice("");
      setMeasureUnit("");
      setDescription("");
      setIsRecurring(true);
    }
  }, [feeType]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        name,
        unitPrice,
        ...(measureUnit ? { measureUnit } : {}),
        ...(description ? { description } : {}),
        isRecurring,
      };

      if (isEdit && feeType) {
        await updateFeeType(feeType.id, payload);
      } else {
        await createFeeType(payload);
      }

      onSuccess();
      onOpenChange(false);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Đã xảy ra lỗi";
      alert(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Chỉnh sửa loại phí" : "Thêm loại phí"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fee-name">Tên loại phí *</Label>
            <Input
              id="fee-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ví dụ: Phí quản lý"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fee-unit-price">Đơn giá *</Label>
            <Input
              id="fee-unit-price"
              type="number"
              value={unitPrice}
              onChange={(e) => setUnitPrice(e.target.value)}
              placeholder="Ví dụ: 50000"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fee-measure-unit">Đơn vị tính</Label>
            <Input
              id="fee-measure-unit"
              value={measureUnit}
              onChange={(e) => setMeasureUnit(e.target.value)}
              placeholder="Ví dụ: VND/m²"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fee-description">Mô tả</Label>
            <Textarea
              id="fee-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Mô tả chi tiết về loại phí"
              rows={3}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="fee-recurring">Phí định kỳ</Label>
            <Switch
              id="fee-recurring"
              checked={isRecurring}
              onCheckedChange={setIsRecurring}
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
            <Button type="submit" disabled={loading}>
              {loading ? "Đang xử lý..." : isEdit ? "Cập nhật" : "Thêm mới"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

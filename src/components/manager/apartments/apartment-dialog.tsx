"use client";

import { Building2, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
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
import type { ApartmentStatus, ManagerApartment } from "@/types";

const statusOptions: { value: ApartmentStatus; label: string }[] = [
  { value: "occupied", label: "Đang ở" },
  { value: "vacant", label: "Trống" },
  { value: "maintenance", label: "Bảo trì" },
];

const blockOptions = ["A", "B", "C", "F04"];

interface ApartmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  apartment?: ManagerApartment;
  onSave: (data: Omit<ManagerApartment, "id">) => void;
}

export function ApartmentDialog({
  open,
  onOpenChange,
  apartment,
  onSave,
}: ApartmentDialogProps) {
  const isEditMode = !!apartment;

  const [formData, setFormData] = useState({
    unitNumber: "",
    block: "",
    floor: "",
    area: "",
    status: "" as ApartmentStatus | "",
    residentName: "",
    monthlyFee: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (apartment) {
      setFormData({
        unitNumber: apartment.unitNumber,
        block: apartment.block,
        floor: String(apartment.floor),
        area: String(apartment.area),
        status: apartment.status,
        residentName: apartment.residentName || "",
        monthlyFee: String(apartment.monthlyFee),
      });
    } else {
      setFormData({
        unitNumber: "",
        block: "",
        floor: "",
        area: "",
        status: "",
        residentName: "",
        monthlyFee: "",
      });
    }
    setError("");
  }, [apartment]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (
      !formData.unitNumber.trim() ||
      !formData.block ||
      !formData.floor ||
      !formData.area ||
      !formData.status
    ) {
      setError("Vui lòng điền đầy đủ thông tin bắt buộc.");
      return;
    }

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    onSave({
      unitNumber: formData.unitNumber.trim(),
      block: formData.block,
      floor: Number.parseInt(formData.floor, 10),
      area: Number.parseFloat(formData.area),
      status: formData.status as ApartmentStatus,
      residentName: formData.residentName.trim() || undefined,
      monthlyFee: Number.parseInt(formData.monthlyFee, 10) || 0,
    });
    setIsSubmitting(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Chỉnh sửa căn hộ" : "Thêm căn hộ mới"}
          </DialogTitle>
          <DialogDescription>
            {isEditMode
              ? "Cập nhật thông tin căn hộ."
              : "Thêm căn hộ mới vào hệ thống."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-destructive/15 text-destructive px-4 py-3 rounded-md text-sm">
              {error}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="apt-unit">
                Số căn hộ <span className="text-destructive">*</span>
              </Label>
              <Input
                id="apt-unit"
                placeholder="0101"
                value={formData.unitNumber}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    unitNumber: e.target.value,
                  }))
                }
                disabled={isSubmitting}
              />
            </div>

            <div className="space-y-2">
              <Label>
                Tòa nhà <span className="text-destructive">*</span>
              </Label>
              <Select
                value={formData.block}
                onValueChange={(v) =>
                  setFormData((prev) => ({ ...prev, block: v }))
                }
                disabled={isSubmitting}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn tòa" />
                </SelectTrigger>
                <SelectContent>
                  {blockOptions.map((b) => (
                    <SelectItem key={b} value={b}>
                      Tòa {b}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="apt-floor">
                Tầng <span className="text-destructive">*</span>
              </Label>
              <Input
                id="apt-floor"
                type="number"
                placeholder="1"
                min="1"
                value={formData.floor}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, floor: e.target.value }))
                }
                disabled={isSubmitting}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="apt-area">
                Diện tích (m²) <span className="text-destructive">*</span>
              </Label>
              <Input
                id="apt-area"
                type="number"
                placeholder="65.5"
                min="1"
                step="0.1"
                value={formData.area}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, area: e.target.value }))
                }
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>
                Trạng thái <span className="text-destructive">*</span>
              </Label>
              <Select
                value={formData.status}
                onValueChange={(v) =>
                  setFormData((prev) => ({
                    ...prev,
                    status: v as ApartmentStatus,
                  }))
                }
                disabled={isSubmitting}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="apt-fee">Phí quản lý (VNĐ/tháng)</Label>
              <Input
                id="apt-fee"
                type="number"
                placeholder="0"
                value={formData.monthlyFee}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    monthlyFee: e.target.value,
                  }))
                }
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="apt-resident">Tên cư dân</Label>
            <Input
              id="apt-resident"
              placeholder="Tên cư dân (nếu có)"
              value={formData.residentName}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  residentName: e.target.value,
                }))
              }
              disabled={isSubmitting || formData.status !== "occupied"}
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
                <Building2 className="mr-2 h-4 w-4" />
              )}
              {isSubmitting
                ? "Đang lưu..."
                : isEditMode
                  ? "Cập nhật"
                  : "Thêm căn hộ"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

"use client";

import { Car, Loader2 } from "lucide-react";
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
import type { Vehicle } from "@/types";

const vehicleTypeOptions = [
  { value: "car", label: "Ô tô" },
  { value: "motorbike", label: "Xe máy" },
  { value: "bicycle", label: "Xe đạp" },
] as const;

interface VehicleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  vehicle?: Vehicle;
  onSave: (data: Omit<Vehicle, "id" | "ownerId">) => void;
}

export function VehicleDialog({
  open,
  onOpenChange,
  vehicle,
  onSave,
}: VehicleDialogProps) {
  const isEditMode = !!vehicle;

  const [formData, setFormData] = useState({
    type: "" as Vehicle["type"] | "",
    licensePlate: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (vehicle) {
      setFormData({
        type: vehicle.type,
        licensePlate: vehicle.licensePlate,
      });
    } else {
      setFormData({ type: "", licensePlate: "" });
    }
    setError("");
  }, [vehicle]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.type || !formData.licensePlate.trim()) {
      setError("Vui lòng chọn loại xe và nhập biển số.");
      return;
    }

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    onSave({
      type: formData.type as Vehicle["type"],
      licensePlate: formData.licensePlate.trim().toUpperCase(),
    });
    setIsSubmitting(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[420px]">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Chỉnh sửa phương tiện" : "Thêm phương tiện"}
          </DialogTitle>
          <DialogDescription>
            {isEditMode
              ? "Cập nhật thông tin phương tiện."
              : "Đăng ký phương tiện mới cho căn hộ."}
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
              Loại xe <span className="text-destructive">*</span>
            </Label>
            <Select
              value={formData.type}
              onValueChange={(v) =>
                setFormData((prev) => ({
                  ...prev,
                  type: v as Vehicle["type"],
                }))
              }
              disabled={isSubmitting}
            >
              <SelectTrigger>
                <SelectValue placeholder="Chọn loại xe" />
              </SelectTrigger>
              <SelectContent>
                {vehicleTypeOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="license-plate">
              Biển số <span className="text-destructive">*</span>
            </Label>
            <Input
              id="license-plate"
              placeholder="30A-12345"
              value={formData.licensePlate}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  licensePlate: e.target.value,
                }))
              }
              disabled={isSubmitting}
              className="uppercase"
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
                <Car className="mr-2 h-4 w-4" />
              )}
              {isSubmitting ? "Đang lưu..." : isEditMode ? "Cập nhật" : "Thêm"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

"use client";

import { Loader2, UserPlus } from "lucide-react";
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
import type { FamilyMember } from "@/types";

const relationOptions = [
  { value: "Vợ/Chồng", label: "Vợ/Chồng" },
  { value: "Con", label: "Con" },
  { value: "Bố/Mẹ", label: "Bố/Mẹ" },
  { value: "Anh/Chị/Em", label: "Anh/Chị/Em" },
  { value: "Khác", label: "Khác" },
];

interface FamilyMemberDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  member?: FamilyMember;
  onSave: (data: Omit<FamilyMember, "id" | "userId">) => void;
}

export function FamilyMemberDialog({
  open,
  onOpenChange,
  member,
  onSave,
}: FamilyMemberDialogProps) {
  const isEditMode = !!member;

  const [formData, setFormData] = useState({
    name: "",
    relation: "",
    dob: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (member) {
      setFormData({
        name: member.name,
        relation: member.relation,
        dob: member.dob || "",
      });
    } else {
      setFormData({ name: "", relation: "", dob: "" });
    }
    setError("");
  }, [member]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.name.trim() || !formData.relation) {
      setError("Vui lòng điền đầy đủ họ tên và mối quan hệ.");
      return;
    }

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    onSave({
      name: formData.name.trim(),
      relation: formData.relation,
      dob: formData.dob || undefined,
    });
    setIsSubmitting(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Chỉnh sửa thành viên" : "Thêm thành viên"}
          </DialogTitle>
          <DialogDescription>
            {isEditMode
              ? "Cập nhật thông tin thành viên gia đình."
              : "Thêm thành viên mới vào hộ gia đình."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-destructive/15 text-destructive px-4 py-3 rounded-md text-sm">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="member-name">
              Họ và tên <span className="text-destructive">*</span>
            </Label>
            <Input
              id="member-name"
              placeholder="Nguyễn Văn A"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              disabled={isSubmitting}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>
                Mối quan hệ <span className="text-destructive">*</span>
              </Label>
              <Select
                value={formData.relation}
                onValueChange={(v) =>
                  setFormData((prev) => ({ ...prev, relation: v }))
                }
                disabled={isSubmitting}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn" />
                </SelectTrigger>
                <SelectContent>
                  {relationOptions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="member-dob">Ngày sinh</Label>
              <Input
                id="member-dob"
                type="date"
                value={formData.dob}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, dob: e.target.value }))
                }
                disabled={isSubmitting}
              />
            </div>
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
                <UserPlus className="mr-2 h-4 w-4" />
              )}
              {isSubmitting ? "Đang lưu..." : isEditMode ? "Cập nhật" : "Thêm"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

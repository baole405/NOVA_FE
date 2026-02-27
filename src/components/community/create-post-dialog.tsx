"use client";

import { Loader2, Send } from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";
import type { CommunityCategory } from "@/types";

const categoryOptions: { value: CommunityCategory; label: string }[] = [
  { value: "general", label: "Chung" },
  { value: "buy_sell", label: "Mua bán" },
  { value: "qa", label: "Hỏi đáp" },
  { value: "events", label: "Sự kiện" },
];

interface CreatePostDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: {
    title: string;
    content: string;
    category: CommunityCategory;
  }) => void;
}

export function CreatePostDialog({
  open,
  onOpenChange,
  onSubmit,
}: CreatePostDialogProps) {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "" as CommunityCategory | "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (
      !formData.title.trim() ||
      !formData.content.trim() ||
      !formData.category
    ) {
      setError("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    onSubmit({
      title: formData.title.trim(),
      content: formData.content.trim(),
      category: formData.category as CommunityCategory,
    });
    setFormData({ title: "", content: "", category: "" });
    setIsSubmitting(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[520px]">
        <DialogHeader>
          <DialogTitle>Tạo bài viết mới</DialogTitle>
          <DialogDescription>
            Chia sẻ thông tin, hỏi đáp hoặc đăng tin cho cộng đồng cư dân.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-destructive/15 text-destructive px-4 py-3 rounded-md text-sm">
              {error}
            </div>
          )}

          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 space-y-2">
              <Label htmlFor="post-title">
                Tiêu đề <span className="text-destructive">*</span>
              </Label>
              <Input
                id="post-title"
                placeholder="Tiêu đề bài viết"
                value={formData.title}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, title: e.target.value }))
                }
                disabled={isSubmitting}
              />
            </div>

            <div className="space-y-2">
              <Label>
                Danh mục <span className="text-destructive">*</span>
              </Label>
              <Select
                value={formData.category}
                onValueChange={(v) =>
                  setFormData((prev) => ({
                    ...prev,
                    category: v as CommunityCategory,
                  }))
                }
                disabled={isSubmitting}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn" />
                </SelectTrigger>
                <SelectContent>
                  {categoryOptions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="post-content">
              Nội dung <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="post-content"
              placeholder="Viết nội dung bài viết..."
              rows={5}
              value={formData.content}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, content: e.target.value }))
              }
              disabled={isSubmitting}
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
                <Send className="mr-2 h-4 w-4" />
              )}
              {isSubmitting ? "Đang đăng..." : "Đăng bài"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

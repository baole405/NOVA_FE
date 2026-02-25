"use client";

import { useState } from "react";
import { Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { ComplaintCategory, ComplaintUrgency } from "@/types";

interface ComplaintFormProps {
  onSubmit: (data: {
    title: string;
    category: ComplaintCategory;
    description: string;
    urgency: ComplaintUrgency;
  }) => void;
}

export function ComplaintForm({ onSubmit }: ComplaintFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    category: "" as ComplaintCategory | "",
    description: "",
    urgency: "" as ComplaintUrgency | "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (
      !formData.title ||
      !formData.category ||
      !formData.description ||
      !formData.urgency
    ) {
      setError("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    onSubmit({
      title: formData.title,
      category: formData.category as ComplaintCategory,
      description: formData.description,
      urgency: formData.urgency as ComplaintUrgency,
    });

    setSuccess(true);
    setFormData({ title: "", category: "", description: "", urgency: "" });
    setIsSubmitting(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gửi phản ánh mới</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-destructive/15 text-destructive px-4 py-3 rounded-md text-sm">
              {error}
            </div>
          )}
          {success && (
            <div className="bg-green-500/15 text-green-600 dark:text-green-400 px-4 py-3 rounded-md text-sm">
              Phản ánh đã được gửi thành công!
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="title">
              Tiêu đề <span className="text-destructive">*</span>
            </Label>
            <Input
              id="title"
              placeholder="Mô tả ngắn gọn vấn đề"
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>
                Danh mục <span className="text-destructive">*</span>
              </Label>
              <Select
                value={formData.category}
                onValueChange={(value: ComplaintCategory) =>
                  setFormData((prev) => ({ ...prev, category: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn danh mục" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="plumbing">Ống nước</SelectItem>
                  <SelectItem value="electrical">Điện</SelectItem>
                  <SelectItem value="elevator">Thang máy</SelectItem>
                  <SelectItem value="other">Khác</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>
                Mức độ khẩn cấp <span className="text-destructive">*</span>
              </Label>
              <Select
                value={formData.urgency}
                onValueChange={(value: ComplaintUrgency) =>
                  setFormData((prev) => ({ ...prev, urgency: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn mức độ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Thấp</SelectItem>
                  <SelectItem value="medium">Trung bình</SelectItem>
                  <SelectItem value="high">Cao</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">
              Mô tả chi tiết <span className="text-destructive">*</span>
            </Label>
            <textarea
              id="description"
              rows={4}
              placeholder="Mô tả chi tiết vấn đề bạn gặp phải..."
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            />
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Send className="mr-2 h-4 w-4" />
            )}
            {isSubmitting ? "Đang gửi..." : "Gửi phản ánh"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

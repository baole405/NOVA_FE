"use client";

import { Clock, Loader2, Send } from "lucide-react";
import { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import type { ComplaintStatus, ManagerComplaint } from "@/types";

const statusConfig: Record<
  ComplaintStatus,
  { label: string; className: string }
> = {
  pending: {
    label: "Chờ xử lý",
    className:
      "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  },
  in_progress: {
    label: "Đang xử lý",
    className:
      "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  },
  resolved: {
    label: "Đã giải quyết",
    className:
      "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  },
};

const categoryLabels: Record<string, string> = {
  plumbing: "Ống nước",
  electrical: "Điện",
  elevator: "Thang máy",
  other: "Khác",
};

const urgencyLabels: Record<string, string> = {
  low: "Thấp",
  medium: "Trung bình",
  high: "Cao",
};

interface ComplaintDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  complaint?: ManagerComplaint;
  onStatusChange: (id: string, status: ComplaintStatus) => void;
  onAddResponse: (id: string, content: string) => void;
}

export function ComplaintDetailDialog({
  open,
  onOpenChange,
  complaint,
  onStatusChange,
  onAddResponse,
}: ComplaintDetailDialogProps) {
  const [responseText, setResponseText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!complaint) return null;

  const status = statusConfig[complaint.status];

  const handleSendResponse = async () => {
    if (!responseText.trim()) return;
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    onAddResponse(complaint.id, responseText.trim());
    setResponseText("");
    setIsSubmitting(false);
  };

  const statusButtons: { value: ComplaintStatus; label: string }[] = [
    { value: "pending", label: "Chờ xử lý" },
    { value: "in_progress", label: "Đang xử lý" },
    { value: "resolved", label: "Đã giải quyết" },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{complaint.title}</DialogTitle>
        </DialogHeader>

        {/* Complaint info */}
        <div className="space-y-3 text-sm">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <span className="text-muted-foreground">Cư dân:</span>{" "}
              <span className="font-medium">{complaint.residentName}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Căn hộ:</span>{" "}
              <span className="font-medium">{complaint.apartmentUnit}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Danh mục:</span>{" "}
              <Badge variant="outline">
                {categoryLabels[complaint.category]}
              </Badge>
            </div>
            <div>
              <span className="text-muted-foreground">Mức độ:</span>{" "}
              <span className="font-medium">
                {urgencyLabels[complaint.urgency]}
              </span>
            </div>
            <div>
              <span className="text-muted-foreground">Ngày tạo:</span>{" "}
              <span className="font-medium">
                {new Date(complaint.createdAt).toLocaleDateString("vi-VN")}
              </span>
            </div>
            <div>
              <span className="text-muted-foreground">Trạng thái:</span>{" "}
              <Badge variant="secondary" className={status.className}>
                {status.label}
              </Badge>
            </div>
          </div>

          <div className="p-3 bg-muted/50 rounded-lg">
            <p className="text-muted-foreground text-xs mb-1">Mô tả:</p>
            <p>{complaint.description}</p>
          </div>
        </div>

        <Separator />

        {/* Status change */}
        <div>
          <p className="text-sm font-medium mb-2">Cập nhật trạng thái:</p>
          <div className="flex gap-2">
            {statusButtons.map((btn) => (
              <Button
                key={btn.value}
                size="sm"
                variant={complaint.status === btn.value ? "default" : "outline"}
                onClick={() => onStatusChange(complaint.id, btn.value)}
              >
                {btn.label}
              </Button>
            ))}
          </div>
        </div>

        <Separator />

        {/* Responses */}
        <div>
          <p className="text-sm font-medium mb-3">
            Phản hồi ({complaint.responses?.length || 0})
          </p>
          <div className="space-y-3 max-h-[200px] overflow-y-auto">
            {(!complaint.responses || complaint.responses.length === 0) && (
              <p className="text-sm text-muted-foreground text-center py-2">
                Chưa có phản hồi nào.
              </p>
            )}
            {complaint.responses?.map((res) => (
              <div
                key={res.id}
                className="flex gap-3 p-3 bg-muted/30 rounded-lg"
              >
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="text-xs bg-primary/10 text-primary">
                    BQL
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{res.author}</span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {new Date(res.createdAt).toLocaleDateString("vi-VN")}
                    </span>
                  </div>
                  <p className="text-sm mt-1">{res.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add response */}
        <div className="flex gap-2">
          <Textarea
            placeholder="Nhập phản hồi..."
            rows={2}
            value={responseText}
            onChange={(e) => setResponseText(e.target.value)}
            disabled={isSubmitting}
            className="flex-1"
          />
          <Button
            size="icon"
            className="h-auto"
            onClick={handleSendResponse}
            disabled={isSubmitting || !responseText.trim()}
          >
            {isSubmitting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

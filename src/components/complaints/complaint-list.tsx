"use client";

import { CheckCircle2, Clock, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { ComplaintStatusBadge } from "@/components/complaints/complaint-status-badge";
import type { Complaint, ComplaintCategory, ComplaintUrgency } from "@/types";
import { cn } from "@/lib/utils";

const categoryLabels: Record<ComplaintCategory, string> = {
  plumbing: "Ống nước",
  electrical: "Điện",
  elevator: "Thang máy",
  other: "Khác",
};

const urgencyConfig: Record<
  ComplaintUrgency,
  { label: string; className: string }
> = {
  low: {
    label: "Thấp",
    className:
      "bg-slate-100 text-slate-700 dark:bg-slate-900/30 dark:text-slate-400",
  },
  medium: {
    label: "Trung bình",
    className:
      "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  },
  high: {
    label: "Cao",
    className: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  },
};

const statusIcons = {
  pending: Clock,
  in_progress: Loader2,
  resolved: CheckCircle2,
};

interface ComplaintListProps {
  complaints: Complaint[];
}

export function ComplaintList({ complaints }: ComplaintListProps) {
  if (complaints.length === 0) {
    return (
      <EmptyState
        icon={CheckCircle2}
        title="Không có phản ánh"
        description="Bạn chưa gửi phản ánh nào hoặc tất cả đã được giải quyết."
      />
    );
  }

  return (
    <div className="space-y-3">
      {complaints.map((complaint) => {
        const StatusIcon = statusIcons[complaint.status];
        const urgency = urgencyConfig[complaint.urgency];

        return (
          <Card
            key={complaint.id}
            className="hover:bg-accent/50 transition-colors"
          >
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <div
                  className={cn(
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border mt-0.5",
                    complaint.status === "resolved"
                      ? "bg-green-100 border-green-200 text-green-600 dark:bg-green-950 dark:border-green-800 dark:text-green-400"
                      : complaint.status === "in_progress"
                        ? "bg-blue-100 border-blue-200 text-blue-600 dark:bg-blue-950 dark:border-blue-800 dark:text-blue-400"
                        : "bg-amber-100 border-amber-200 text-amber-600 dark:bg-amber-950 dark:border-amber-800 dark:text-amber-400",
                  )}
                >
                  <StatusIcon
                    className={cn(
                      "h-4 w-4",
                      complaint.status === "in_progress" && "animate-spin",
                    )}
                  />
                </div>

                <div className="flex-1 min-w-0 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-sm font-semibold leading-tight">
                      {complaint.title}
                    </h4>
                    <ComplaintStatusBadge status={complaint.status} />
                  </div>

                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {complaint.description}
                  </p>

                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="outline" className="text-xs">
                      {categoryLabels[complaint.category]}
                    </Badge>
                    <Badge variant="secondary" className={urgency.className}>
                      {urgency.label}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {new Date(complaint.createdAt).toLocaleDateString(
                        "vi-VN",
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

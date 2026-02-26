"use client";

import { Eye, MessageSquareWarning } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type {
  ComplaintCategory,
  ComplaintStatus,
  ComplaintUrgency,
  ManagerComplaint,
} from "@/types";

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

interface ManagerComplaintTableProps {
  complaints: ManagerComplaint[];
  onViewDetail: (complaint: ManagerComplaint) => void;
}

export function ManagerComplaintTable({
  complaints,
  onViewDetail,
}: ManagerComplaintTableProps) {
  if (complaints.length === 0) {
    return (
      <EmptyState
        icon={MessageSquareWarning}
        title="Không có phản ánh"
        description="Không tìm thấy phản ánh nào phù hợp với bộ lọc."
      />
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Cư dân</TableHead>
            <TableHead>Căn hộ</TableHead>
            <TableHead>Tiêu đề</TableHead>
            <TableHead>Danh mục</TableHead>
            <TableHead>Mức độ</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead>Ngày tạo</TableHead>
            <TableHead className="text-right">Thao tác</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {complaints.map((cpl) => {
            const urgency = urgencyConfig[cpl.urgency];
            const status = statusConfig[cpl.status];
            return (
              <TableRow key={cpl.id}>
                <TableCell className="font-medium">
                  {cpl.residentName}
                </TableCell>
                <TableCell>{cpl.apartmentUnit}</TableCell>
                <TableCell className="max-w-[200px] truncate">
                  {cpl.title}
                </TableCell>
                <TableCell>
                  <Badge variant="outline">
                    {categoryLabels[cpl.category]}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className={urgency.className}>
                    {urgency.label}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className={status.className}>
                    {status.label}
                  </Badge>
                </TableCell>
                <TableCell>
                  {new Date(cpl.createdAt).toLocaleDateString("vi-VN")}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onViewDetail(cpl)}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    Chi tiết
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

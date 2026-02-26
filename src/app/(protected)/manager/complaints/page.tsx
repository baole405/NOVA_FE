"use client";

import { MessageSquareWarning } from "lucide-react";
import { useMemo, useState } from "react";
import { ComplaintDetailDialog } from "@/components/manager/complaints/complaint-detail-dialog";
import { ManagerComplaintTable } from "@/components/manager/complaints/complaint-table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockManagerComplaints } from "@/lib/mock-data";
import type { ComplaintStatus, ManagerComplaint } from "@/types";

export default function ManagerComplaintsPage() {
  const [complaints, setComplaints] = useState<ManagerComplaint[]>(
    mockManagerComplaints,
  );
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [urgencyFilter, setUrgencyFilter] = useState("all");
  const [detailOpen, setDetailOpen] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState<
    ManagerComplaint | undefined
  >();

  const filteredComplaints = useMemo(() => {
    return complaints.filter((c) => {
      if (statusFilter !== "all" && c.status !== statusFilter) return false;
      if (categoryFilter !== "all" && c.category !== categoryFilter)
        return false;
      if (urgencyFilter !== "all" && c.urgency !== urgencyFilter) return false;
      return true;
    });
  }, [complaints, statusFilter, categoryFilter, urgencyFilter]);

  const pendingCount = complaints.filter((c) => c.status === "pending").length;
  const inProgressCount = complaints.filter(
    (c) => c.status === "in_progress",
  ).length;
  const resolvedCount = complaints.filter(
    (c) => c.status === "resolved",
  ).length;

  const handleStatusChange = (id: string, status: ComplaintStatus) => {
    setComplaints((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, status, updatedAt: new Date().toISOString() } : c,
      ),
    );
    if (selectedComplaint?.id === id) {
      setSelectedComplaint((prev) =>
        prev ? { ...prev, status, updatedAt: new Date().toISOString() } : prev,
      );
    }
  };

  const handleAddResponse = (id: string, content: string) => {
    const newResponse = {
      id: `res_${Date.now()}`,
      complaintId: id,
      content,
      author: "BQL - Quản lý",
      createdAt: new Date().toISOString(),
    };
    setComplaints((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, responses: [...(c.responses || []), newResponse] }
          : c,
      ),
    );
    if (selectedComplaint?.id === id) {
      setSelectedComplaint((prev) =>
        prev
          ? {
              ...prev,
              responses: [...(prev.responses || []), newResponse],
            }
          : prev,
      );
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <MessageSquareWarning className="h-8 w-8 text-primary" />
          Quản lý phản ánh
        </h1>
        <p className="text-muted-foreground mt-2">
          Xem và xử lý phản ánh từ cư dân
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Tổng phản ánh</p>
            <p className="text-2xl font-bold">{complaints.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Chờ xử lý</p>
            <p className="text-2xl font-bold text-amber-600">{pendingCount}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Đang xử lý</p>
            <p className="text-2xl font-bold text-blue-600">
              {inProgressCount}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Đã giải quyết</p>
            <p className="text-2xl font-bold text-green-600">{resolvedCount}</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-44">
            <SelectValue placeholder="Trạng thái" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả trạng thái</SelectItem>
            <SelectItem value="pending">Chờ xử lý</SelectItem>
            <SelectItem value="in_progress">Đang xử lý</SelectItem>
            <SelectItem value="resolved">Đã giải quyết</SelectItem>
          </SelectContent>
        </Select>

        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-44">
            <SelectValue placeholder="Danh mục" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả danh mục</SelectItem>
            <SelectItem value="plumbing">Ống nước</SelectItem>
            <SelectItem value="electrical">Điện</SelectItem>
            <SelectItem value="elevator">Thang máy</SelectItem>
            <SelectItem value="other">Khác</SelectItem>
          </SelectContent>
        </Select>

        <Select value={urgencyFilter} onValueChange={setUrgencyFilter}>
          <SelectTrigger className="w-44">
            <SelectValue placeholder="Mức độ" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả mức độ</SelectItem>
            <SelectItem value="low">Thấp</SelectItem>
            <SelectItem value="medium">Trung bình</SelectItem>
            <SelectItem value="high">Cao</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>Danh sách phản ánh</CardTitle>
          <CardDescription>
            Hiển thị {filteredComplaints.length} / {complaints.length} phản ánh
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ManagerComplaintTable
            complaints={filteredComplaints}
            onViewDetail={(cpl) => {
              setSelectedComplaint(cpl);
              setDetailOpen(true);
            }}
          />
        </CardContent>
      </Card>

      {/* Detail Dialog */}
      <ComplaintDetailDialog
        open={detailOpen}
        onOpenChange={(open) => {
          setDetailOpen(open);
          if (!open) setSelectedComplaint(undefined);
        }}
        complaint={selectedComplaint}
        onStatusChange={handleStatusChange}
        onAddResponse={handleAddResponse}
      />
    </div>
  );
}

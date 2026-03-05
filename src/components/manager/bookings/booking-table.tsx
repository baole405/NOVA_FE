"use client";

import { format } from "date-fns";
import { CalendarCheck } from "lucide-react";
import { useState } from "react";
import { BookingDetailSheet } from "@/components/manager/bookings/booking-detail-sheet";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type {
  ManagerBooking,
  UpdateBookingPayload,
  UpdateBookingStatusPayload,
} from "@/lib/manager-bookings";

const serviceTypeLabels: Record<ManagerBooking["serviceType"], string> = {
  parking: "Bãi đậu xe",
  bbq: "Khu BBQ",
  swimming_pool: "Hồ bơi",
};

const statusConfig: Record<
  ManagerBooking["status"],
  { label: string; className: string }
> = {
  pending: {
    label: "Đang chờ",
    className:
      "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  },
  confirmed: {
    label: "Đã duyệt",
    className:
      "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  },
  rejected: {
    label: "Từ chối",
    className: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  },
  cancelled: {
    label: "Đã hủy",
    className: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
  },
};

interface BookingTableProps {
  bookings: ManagerBooking[];
  onUpdateStatus: (
    id: number,
    payload: UpdateBookingStatusPayload,
  ) => Promise<void>;
  onUpdateBooking: (id: number, payload: UpdateBookingPayload) => Promise<void>;
  role: "manager" | "resident";
}

export function BookingTable({
  bookings,
  onUpdateStatus,
  onUpdateBooking,
  role,
}: BookingTableProps) {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [selectedBooking, setSelectedBooking] = useState<ManagerBooking | null>(
    null,
  );
  const [sheetOpen, setSheetOpen] = useState(false);

  const filtered = bookings.filter((b) => {
    const matchStatus = statusFilter === "all" || b.status === statusFilter;
    const matchType = typeFilter === "all" || b.serviceType === typeFilter;
    return matchStatus && matchType;
  });

  const handleRowClick = (booking: ManagerBooking) => {
    setSelectedBooking(booking);
    setSheetOpen(true);
  };

  return (
    <>
      {/* Filter bar */}
      <div className="flex gap-3 mb-4">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Trạng thái" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả</SelectItem>
            <SelectItem value="pending">Đang chờ</SelectItem>
            <SelectItem value="confirmed">Đã duyệt</SelectItem>
            <SelectItem value="rejected">Từ chối</SelectItem>
            <SelectItem value="cancelled">Đã hủy</SelectItem>
          </SelectContent>
        </Select>

        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Loại tiện ích" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả</SelectItem>
            <SelectItem value="parking">Bãi đậu xe</SelectItem>
            <SelectItem value="bbq">Khu BBQ</SelectItem>
            <SelectItem value="swimming_pool">Hồ bơi</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={CalendarCheck}
          title="Không có đặt chỗ"
          description="Không tìm thấy đặt chỗ nào phù hợp với bộ lọc."
        />
      ) : (
        <div className="overflow-x-auto rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cư dân</TableHead>
                <TableHead>Căn hộ</TableHead>
                <TableHead>Loại tiện ích</TableHead>
                <TableHead>Vị trí</TableHead>
                <TableHead>Ngày</TableHead>
                <TableHead>Giờ</TableHead>
                <TableHead>Trạng thái</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((booking) => {
                const status = statusConfig[booking.status];
                return (
                  <TableRow
                    key={booking.id}
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => handleRowClick(booking)}
                  >
                    <TableCell className="font-medium">
                      {booking.residentName}
                    </TableCell>
                    <TableCell>{booking.apartmentUnit}</TableCell>
                    <TableCell>
                      {serviceTypeLabels[booking.serviceType]}
                    </TableCell>
                    <TableCell>{booking.slotNumber ?? "—"}</TableCell>
                    <TableCell>
                      {format(new Date(booking.date), "dd/MM/yyyy")}
                    </TableCell>
                    <TableCell>
                      {booking.startTime.slice(0, 5)} -{" "}
                      {booking.endTime.slice(0, 5)}
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={status.className}>
                        {status.label}
                      </Badge>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}

      <BookingDetailSheet
        booking={selectedBooking}
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        role={role}
        onUpdateStatus={onUpdateStatus}
        onUpdateBooking={onUpdateBooking}
      />
    </>
  );
}

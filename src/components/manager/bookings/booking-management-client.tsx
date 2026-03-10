"use client";

import { Loader2, RotateCw } from "lucide-react";
import { BookingTable } from "@/components/manager/bookings/booking-table";
import { Button } from "@/components/ui/button";
import { useManagerBookings } from "@/hooks/use-manager-bookings";

export function BookingManagementClient() {
  const {
    bookings,
    loading,
    error,
    refetch,
    updateStatus,
    updateBookingFields,
  } = useManagerBookings();

  if (loading) {
    return (
      <div className="flex justify-center items-center p-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center text-destructive">
        Lỗi khi tải dữ liệu: {error}
      </div>
    );
  }

  const pendingCount = bookings.filter((b) => b.status === "pending").length;
  const confirmedCount = bookings.filter(
    (b) => b.status === "confirmed",
  ).length;
  const rejectedCount = bookings.filter((b) => b.status === "rejected").length;

  return (
    <div className="space-y-6 p-4 md:p-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-primary">
          Quản lý Đặt chỗ
        </h1>
        <p className="text-muted-foreground mt-1">
          Duyệt và từ chối các yêu cầu đặt tiện ích
        </p>
      </div>

      <div className="flex items-center gap-4 text-sm flex-wrap">
        <span className="text-muted-foreground">
          Đang chờ: <strong className="text-amber-600">{pendingCount}</strong>
        </span>
        <span className="text-muted-foreground">
          Đã duyệt: <strong className="text-green-600">{confirmedCount}</strong>
        </span>
        <span className="text-muted-foreground">
          Từ chối: <strong className="text-red-600">{rejectedCount}</strong>
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={refetch}
          className="ml-auto gap-1.5"
        >
          <RotateCw className="h-3.5 w-3.5" /> Làm mới
        </Button>
      </div>

      <BookingTable
        bookings={bookings}
        userRole="manager"
        onUpdateStatus={updateStatus}
        onUpdateBooking={updateBookingFields}
      />
    </div>
  );
}

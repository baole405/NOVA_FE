"use client";

import { Loader2 } from "lucide-react";
import { BookingTable } from "@/components/manager/bookings/booking-table";
import { useManagerBookings } from "@/hooks/use-manager-bookings";

export function BookingManagementClient() {
  const { bookings, loading, error, updateStatus, updateBookingFields } =
    useManagerBookings();

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

      <BookingTable
        bookings={bookings}
        onUpdateStatus={updateStatus}
        onUpdateBooking={updateBookingFields}
      />
    </div>
  );
}

import type { Metadata } from "next";
import { BookingManagementClient } from "@/components/manager/bookings/booking-management-client";

export const metadata: Metadata = {
  title: "Quản lý Đặt chỗ | NOVA Manager",
  description: "Duyệt và quản lý các yêu cầu đặt tiện ích",
};

export default function ManagerBookingsPage() {
  return <BookingManagementClient />;
}

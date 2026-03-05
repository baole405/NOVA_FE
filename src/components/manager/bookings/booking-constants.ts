// Shared display constants for booking components (table + detail sheet)

import type { ManagerBooking } from "@/lib/manager-bookings";

export const serviceTypeLabels: Record<ManagerBooking["serviceType"], string> =
  {
    parking: "Bãi đậu xe",
    bbq: "Khu BBQ",
    swimming_pool: "Hồ bơi",
  };

export const statusConfig: Record<
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

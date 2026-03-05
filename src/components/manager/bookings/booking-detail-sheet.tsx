"use client";

import { format } from "date-fns";
import { Car, Droplets, Loader2, Utensils } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import type {
  ManagerBooking,
  UpdateBookingStatusPayload,
} from "@/lib/manager-bookings";

const serviceTypeLabels: Record<ManagerBooking["serviceType"], string> = {
  parking: "Bãi đậu xe",
  bbq: "Khu BBQ",
  swimming_pool: "Hồ bơi",
};

const serviceTypeIcons: Record<ManagerBooking["serviceType"], React.ReactNode> =
  {
    parking: <Car className="h-4 w-4" />,
    bbq: <Utensils className="h-4 w-4" />,
    swimming_pool: <Droplets className="h-4 w-4" />,
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
};

interface BookingDetailSheetProps {
  booking: ManagerBooking | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdateStatus: (
    id: number,
    payload: UpdateBookingStatusPayload,
  ) => Promise<void>;
}

export function BookingDetailSheet({
  booking,
  open,
  onOpenChange,
  onUpdateStatus,
}: BookingDetailSheetProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!booking) return null;

  const status = statusConfig[booking.status];

  const handleAction = async (newStatus: "confirmed" | "rejected") => {
    setIsSubmitting(true);
    try {
      await onUpdateStatus(booking.id, { status: newStatus });
      onOpenChange(false);
    } catch (err) {
      console.log("Failed to update booking status:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            {serviceTypeIcons[booking.serviceType]}
            Chi tiết đặt chỗ
          </SheetTitle>
          <SheetDescription>Mã đặt chỗ #{booking.id}</SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-4">
          {/* Status */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Trạng thái</span>
            <Badge variant="secondary" className={status.className}>
              {status.label}
            </Badge>
          </div>

          {/* Resident info */}
          <div className="space-y-2 p-3 rounded-lg bg-muted/50">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Cư dân</span>
              <span className="font-medium">{booking.residentName}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Căn hộ</span>
              <span className="font-medium">{booking.apartmentUnit}</span>
            </div>
          </div>

          {/* Booking details */}
          <div className="space-y-2 p-3 rounded-lg bg-muted/50">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Loại tiện ích</span>
              <span className="font-medium">
                {serviceTypeLabels[booking.serviceType]}
              </span>
            </div>
            {booking.slotNumber && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Vị trí</span>
                <span className="font-medium">{booking.slotNumber}</span>
              </div>
            )}
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Ngày</span>
              <span className="font-medium">
                {format(new Date(booking.date), "dd/MM/yyyy")}
                {booking.endDate &&
                  ` - ${format(new Date(booking.endDate), "dd/MM/yyyy")}`}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Giờ</span>
              <span className="font-medium">
                {booking.startTime.slice(0, 5)} - {booking.endTime.slice(0, 5)}
              </span>
            </div>
          </div>

          {booking.notes && (
            <div className="p-3 rounded-lg bg-muted/50">
              <p className="text-xs text-muted-foreground mb-1">Ghi chú</p>
              <p className="text-sm">{booking.notes}</p>
            </div>
          )}

          <p className="text-xs text-muted-foreground">
            Đặt lúc: {format(new Date(booking.createdAt), "dd/MM/yyyy HH:mm")}
          </p>

          {/* Action buttons — only show when pending */}
          {booking.status === "pending" && (
            <div className="flex gap-3 pt-4">
              <Button
                className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                disabled={isSubmitting}
                onClick={() => handleAction("confirmed")}
              >
                {isSubmitting ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : null}
                Duyệt
              </Button>
              <Button
                variant="destructive"
                className="flex-1"
                disabled={isSubmitting}
                onClick={() => handleAction("rejected")}
              >
                Từ chối
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

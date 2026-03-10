"use client";

import { format } from "date-fns";
import { Car, Droplets, Loader2, Users, Utensils } from "lucide-react";
import { useEffect, useState } from "react";
import {
  serviceTypeLabels,
  statusConfig,
} from "@/components/manager/bookings/booking-constants";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import type {
  ManagerBooking,
  UpdateBookingPayload,
  UpdateBookingStatusPayload,
} from "@/lib/manager-bookings";

const serviceTypeIcons: Record<ManagerBooking["serviceType"], React.ReactNode> =
  {
    parking: <Car className="h-5 w-5" />,
    bbq: <Utensils className="h-5 w-5" />,
    swimming_pool: <Droplets className="h-5 w-5" />,
  };

interface BookingDetailSheetProps {
  booking: ManagerBooking | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userRole: "manager" | "resident";
  onUpdateStatus: (
    id: number,
    payload: UpdateBookingStatusPayload,
  ) => Promise<void>;
  onUpdateBooking: (id: number, payload: UpdateBookingPayload) => Promise<void>;
}

export function BookingDetailSheet({
  booking,
  open,
  onOpenChange,
  userRole,
  onUpdateStatus,
  onUpdateBooking,
}: BookingDetailSheetProps) {
  const [isStatusSubmitting, setIsStatusSubmitting] = useState(false);
  const [pendingAction, setPendingAction] = useState<
    "confirmed" | "rejected" | "cancelled" | null
  >(null);

  // Inline edit — notes only
  const [notes, setNotes] = useState("");
  const [notesDirty, setNotesDirty] = useState(false);
  const [isSavingNotes, setIsSavingNotes] = useState(false);

  // Sync local edit state when booking changes or sheet re-opens
  useEffect(() => {
    if (booking && open) {
      setNotes(booking.notes ?? "");
      setNotesDirty(false);
    }
  }, [booking, open]);

  if (!booking) return null;

  const status = statusConfig[booking.status];

  const showCancelButton =
    (userRole === "manager" && booking.status === "confirmed") ||
    (userRole === "resident" &&
      (booking.status === "pending" || booking.status === "confirmed"));

  const showApproveReject =
    userRole === "manager" && booking.status === "pending";

  const handleStatusAction = async (
    newStatus: "confirmed" | "rejected" | "cancelled",
  ) => {
    setIsStatusSubmitting(true);
    try {
      await onUpdateStatus(booking.id, { status: newStatus });
      onOpenChange(false);
    } catch (err) {
      console.log("Failed to update booking status:", err);
    } finally {
      setIsStatusSubmitting(false);
      setPendingAction(null);
    }
  };

  const handleSaveNotes = async () => {
    setIsSavingNotes(true);
    try {
      await onUpdateBooking(booking.id, { notes: notes.trim() || undefined });
      setNotesDirty(false);
    } catch (err) {
      console.log("Failed to save notes:", err);
    } finally {
      setIsSavingNotes(false);
    }
  };

  const handleCancelNotes = () => {
    setNotes(booking.notes ?? "");
    setNotesDirty(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto p-6">
        <SheetHeader className="items-center border-b pb-4">
          <SheetTitle className="flex items-center gap-2">
            {serviceTypeIcons[booking.serviceType]}
            Chi tiết đặt chỗ
          </SheetTitle>
          <SheetDescription>Mã đặt chỗ #{booking.id}</SheetDescription>
        </SheetHeader>

        <div className="mt-4 space-y-5">
          {/* Status + facility pill */}
          <div className="flex items-center justify-between gap-2">
            <Badge variant="secondary" className={status.className}>
              {status.label}
            </Badge>
            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-primary/10 text-primary">
              {serviceTypeLabels[booking.serviceType]}
              {booking.slotNumber ? ` · ${booking.slotNumber}` : ""}
            </span>
          </div>

          {/* Resident info — manager only */}
          {userRole === "manager" && (
            <div className="p-3 rounded-lg bg-muted/50 space-y-1.5">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Cư dân
              </p>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Họ tên</span>
                <span className="font-medium">{booking.residentName}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Căn hộ</span>
                <span className="font-medium">{booking.apartmentUnit}</span>
              </div>
            </div>
          )}

          {/* Time */}
          <div className="p-3 rounded-lg bg-muted/50 space-y-1.5">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Thời gian
            </p>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Ngày</span>
              <span className="font-medium">
                {format(new Date(booking.date), "dd/MM/yyyy")}
                {booking.endDate &&
                  ` – ${format(new Date(booking.endDate), "dd/MM/yyyy")}`}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Giờ</span>
              <span className="font-medium">
                {booking.startTime.slice(0, 5)} – {booking.endTime.slice(0, 5)}
              </span>
            </div>
          </div>

          {/* Number of participants — readonly display */}
          {booking.numberOfParticipants !== undefined && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="h-3.5 w-3.5" />
              <span>Số người:</span>
              <span className="font-medium text-foreground">
                {booking.numberOfParticipants} người
              </span>
            </div>
          )}

          {/* Notes — inline edit */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Ghi chú</Label>
            <Textarea
              value={notes}
              onChange={(e) => {
                setNotes(e.target.value);
                setNotesDirty(e.target.value !== (booking.notes ?? ""));
              }}
              placeholder="Thêm ghi chú..."
              className="resize-none"
              rows={3}
            />
            {notesDirty && (
              <div className="flex justify-end gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  disabled={isSavingNotes}
                  onClick={handleCancelNotes}
                >
                  Hủy
                </Button>
                <Button
                  size="sm"
                  disabled={isSavingNotes}
                  onClick={handleSaveNotes}
                >
                  {isSavingNotes ? (
                    <Loader2 className="h-3 w-3 animate-spin" />
                  ) : (
                    "Lưu"
                  )}
                </Button>
              </div>
            )}
          </div>

          <p className="text-xs text-muted-foreground">
            Đặt lúc: {format(new Date(booking.createdAt), "dd/MM/yyyy HH:mm")}
          </p>

          {/* Approve / Reject — manager + pending only, with AlertDialog confirm */}
          {showApproveReject && (
            <AlertDialog>
              <div className="flex gap-3 pt-2">
                <AlertDialogTrigger asChild>
                  <Button
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                    onClick={() => setPendingAction("confirmed")}
                  >
                    Duyệt
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="destructive"
                    className="flex-1"
                    onClick={() => setPendingAction("rejected")}
                  >
                    Từ chối
                  </Button>
                </AlertDialogTrigger>
              </div>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    {pendingAction === "confirmed"
                      ? "Xác nhận duyệt?"
                      : "Xác nhận từ chối?"}
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    {pendingAction === "confirmed"
                      ? "Booking sẽ được duyệt và cư dân sẽ được thông báo."
                      : "Booking sẽ bị từ chối. Hành động này không thể hoàn tác."}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel onClick={() => setPendingAction(null)}>
                    Huỷ
                  </AlertDialogCancel>
                  <AlertDialogAction
                    disabled={isStatusSubmitting}
                    onClick={() =>
                      pendingAction && handleStatusAction(pendingAction)
                    }
                  >
                    {isStatusSubmitting ? (
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    ) : null}
                    Xác nhận
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}

          {/* Cancel button */}
          {showCancelButton && (
            <div className="pt-2">
              <Button
                variant="outline"
                className="w-full border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
                disabled={isStatusSubmitting}
                onClick={() => handleStatusAction("cancelled")}
              >
                {isStatusSubmitting && (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                )}
                Hủy booking
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

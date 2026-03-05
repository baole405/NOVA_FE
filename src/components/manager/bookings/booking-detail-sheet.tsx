"use client";

import { format } from "date-fns";
import { Car, Droplets, Loader2, Users, Utensils } from "lucide-react";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

const serviceTypeLabels: Record<ManagerBooking["serviceType"], string> = {
  parking: "Bãi đậu xe",
  bbq: "Khu BBQ",
  swimming_pool: "Hồ bơi",
};

const serviceTypeIcons: Record<ManagerBooking["serviceType"], React.ReactNode> =
  {
    parking: <Car className="h-5 w-5" />,
    bbq: <Utensils className="h-5 w-5" />,
    swimming_pool: <Droplets className="h-5 w-5" />,
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

interface BookingDetailSheetProps {
  booking: ManagerBooking | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  role: "manager" | "resident";
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
  role,
  onUpdateStatus,
  onUpdateBooking,
}: BookingDetailSheetProps) {
  const [isStatusSubmitting, setIsStatusSubmitting] = useState(false);

  // Inline edit — numberOfParticipants
  const [participants, setParticipants] = useState("");
  const [participantsDirty, setParticipantsDirty] = useState(false);
  const [isSavingParticipants, setIsSavingParticipants] = useState(false);

  // Inline edit — notes
  const [notes, setNotes] = useState("");
  const [notesDirty, setNotesDirty] = useState(false);
  const [isSavingNotes, setIsSavingNotes] = useState(false);

  // Sync local edit state when booking changes (different row opened)
  useEffect(() => {
    if (booking) {
      setParticipants(String(booking.numberOfParticipants ?? ""));
      setNotes(booking.notes ?? "");
      setParticipantsDirty(false);
      setNotesDirty(false);
    }
  }, [booking]);

  if (!booking) return null;

  const status = statusConfig[booking.status];

  // Cancel button: manager only when confirmed; resident when pending or confirmed
  const showCancelButton =
    (role === "manager" && booking.status === "confirmed") ||
    (role === "resident" &&
      (booking.status === "pending" || booking.status === "confirmed"));

  // Approve + Reject: manager only when pending
  const showApproveReject = role === "manager" && booking.status === "pending";

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
    }
  };

  const handleSaveParticipants = async () => {
    setIsSavingParticipants(true);
    try {
      const value =
        participants.trim() === "" ? undefined : Number(participants);
      await onUpdateBooking(booking.id, { numberOfParticipants: value });
      setParticipantsDirty(false);
    } catch (err) {
      console.log("Failed to save participants:", err);
    } finally {
      setIsSavingParticipants(false);
    }
  };

  const handleCancelParticipants = () => {
    setParticipants(String(booking.numberOfParticipants ?? ""));
    setParticipantsDirty(false);
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
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader>
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
          {role === "manager" && (
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

          {/* Number of participants — inline edit */}
          <div className="space-y-2">
            <Label className="flex items-center gap-1.5 text-sm font-medium">
              <Users className="h-3.5 w-3.5" />
              Số người tham gia
            </Label>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                min={1}
                value={participants}
                onChange={(e) => {
                  setParticipants(e.target.value);
                  setParticipantsDirty(
                    e.target.value !==
                      String(booking.numberOfParticipants ?? ""),
                  );
                }}
                placeholder="Nhập số người..."
                className="w-32"
              />
              {participantsDirty && (
                <>
                  <Button
                    size="sm"
                    disabled={isSavingParticipants}
                    onClick={handleSaveParticipants}
                  >
                    {isSavingParticipants ? (
                      <Loader2 className="h-3 w-3 animate-spin" />
                    ) : (
                      "Lưu"
                    )}
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    disabled={isSavingParticipants}
                    onClick={handleCancelParticipants}
                  >
                    Hủy
                  </Button>
                </>
              )}
            </div>
          </div>

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

          {/* Approve / Reject — manager + pending only */}
          {showApproveReject && (
            <div className="flex gap-3 pt-2">
              <Button
                className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                disabled={isStatusSubmitting}
                onClick={() => handleStatusAction("confirmed")}
              >
                {isStatusSubmitting && (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                )}
                Duyệt
              </Button>
              <Button
                variant="destructive"
                className="flex-1"
                disabled={isStatusSubmitting}
                onClick={() => handleStatusAction("rejected")}
              >
                Từ chối
              </Button>
            </div>
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

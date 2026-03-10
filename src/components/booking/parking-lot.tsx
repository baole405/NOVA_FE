"use client";

import { format } from "date-fns";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { getBookingsByDateService } from "@/lib/bookings";
import { cn } from "@/lib/utils";

interface ParkingLotProps {
  onSelectSlots: (slots: string[]) => void;
  selectedSlots: string[];
  selectedDate: Date | undefined;
  maxSlots: number; // = số vehicles user sở hữu
}

// Mock 20 parking slots
const SLOTS = Array.from({ length: 20 }, (_, i) => {
  const row = i < 10 ? "A" : "B";
  const num = (i % 10) + 1;
  return `${row}${num}`;
});

export function ParkingLot({
  onSelectSlots,
  selectedSlots,
  selectedDate,
  maxSlots,
}: ParkingLotProps) {
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!selectedDate) return;

    const fetchBookings = async () => {
      setLoading(true);
      try {
        const dateStr = format(selectedDate, "yyyy-MM-dd");
        const data = await getBookingsByDateService(dateStr, "parking");
        setBookedSlots(
          data.map((b) => b.slotNumber).filter((s): s is string => !!s),
        );
      } catch (error) {
        console.log("Failed to fetch parking slots:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [selectedDate]);

  const toggleSlot = (slot: string) => {
    if (selectedSlots.includes(slot)) {
      onSelectSlots(selectedSlots.filter((s) => s !== slot));
    } else if (selectedSlots.length < maxSlots) {
      onSelectSlots([...selectedSlots, slot]);
    }
    // else: tới giới hạn, không cho chọn thêm
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Sơ đồ bãi đậu xe</h3>
      {maxSlots > 1 && (
        <p className="text-sm text-muted-foreground">
          Có thể chọn tối đa <strong>{maxSlots}</strong> vị trí (theo số phương
          tiện đăng ký)
        </p>
      )}
      <div className="grid grid-cols-5 gap-3 sm:grid-cols-10">
        {SLOTS.map((slot) => {
          const isBooked = bookedSlots.includes(slot);
          const isSelected = selectedSlots.includes(slot);
          const isDisabled =
            isBooked ||
            loading ||
            (!isSelected && selectedSlots.length >= maxSlots);

          return (
            <button
              key={slot}
              type="button"
              disabled={isDisabled}
              onClick={() => toggleSlot(slot)}
              className={cn(
                "h-12 w-full rounded-md border text-sm font-medium transition-colors flex items-center justify-center",
                isBooked
                  ? "bg-destructive/20 text-destructive border-destructive/50 cursor-not-allowed"
                  : isSelected
                    ? "bg-primary text-primary-foreground border-primary"
                    : isDisabled
                      ? "bg-muted text-muted-foreground border-muted-foreground/30 opacity-50 cursor-not-allowed"
                      : "bg-background hover:bg-accent text-foreground border-input",
              )}
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : slot}
            </button>
          );
        })}
      </div>
      <div className="flex gap-4 text-sm text-muted-foreground flex-wrap">
        <div className="flex items-center gap-1">
          <div className="h-4 w-4 rounded border bg-background" /> Trống
        </div>
        <div className="flex items-center gap-1">
          <div className="h-4 w-4 rounded border bg-destructive/20 border-destructive/50" />{" "}
          Đã đặt
        </div>
        <div className="flex items-center gap-1">
          <div className="h-4 w-4 rounded border bg-primary border-primary" />{" "}
          Đang chọn
        </div>
        {selectedSlots.length >= maxSlots && (
          <div className="flex items-center gap-1">
            <div className="h-4 w-4 rounded border bg-muted border-muted-foreground/30 opacity-50" />{" "}
            Đã đủ số lượng
          </div>
        )}
      </div>
    </div>
  );
}

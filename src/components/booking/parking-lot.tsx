"use client";

import { format } from "date-fns";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { getBookingsByDateService } from "@/lib/bookings";
import { cn } from "@/lib/utils";

interface ParkingLotProps {
  onSelectSlot: (slot: string) => void;
  selectedSlot?: string;
  selectedDate: Date | undefined;
}

// Mock 20 parking slots
const SLOTS = Array.from({ length: 20 }, (_, i) => {
  const row = i < 10 ? "A" : "B";
  const num = (i % 10) + 1;
  return `${row}${num}`;
});

export function ParkingLot({
  onSelectSlot,
  selectedSlot,
  selectedDate,
}: ParkingLotProps) {
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!selectedDate) return;

    const fetchBookings = async () => {
      setLoading(true);
      try {
        const dateStr = format(selectedDate, "yyyy-MM-dd");
        // Fetch all parking bookings for this date (backend checks date overlap)
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

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Sơ đồ bãi đậu xe</h3>
      <div className="grid grid-cols-5 gap-3 sm:grid-cols-10">
        {SLOTS.map((slot) => {
          const isBooked = bookedSlots.includes(slot);
          const isSelected = selectedSlot === slot;

          return (
            <button
              key={slot}
              type="button"
              disabled={isBooked || loading}
              onClick={() => onSelectSlot(slot)}
              className={cn(
                "h-12 w-full rounded-md border text-sm font-medium transition-colors flex items-center justify-center",
                isBooked
                  ? "bg-destructive/20 text-destructive border-destructive/50 cursor-not-allowed"
                  : isSelected
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background hover:bg-accent text-foreground border-input",
              )}
            >
              {loading && isBooked ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                slot
              )}
            </button>
          );
        })}
      </div>
      <div className="flex gap-4 text-sm text-muted-foreground">
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
      </div>
    </div>
  );
}

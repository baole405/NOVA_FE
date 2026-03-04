"use client";

import { format } from "date-fns";
import { Droplets, Info, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import type { Booking } from "@/lib/bookings";
import { getBookingsByDateService } from "@/lib/bookings";

interface SwimmingPoolProps {
  selectedDate: Date | undefined;
  selectedTimeSlot: string; // "06:00-07:00"
  onSelectTimeSlot: (val: string) => void;
}

const POOL_PRICE_PER_HOUR = 50000;
const TIME_SLOTS = [
  "06:00-07:00",
  "07:00-08:00",
  "08:00-09:00",
  "09:00-10:00",
  "10:00-11:00",
  "11:00-12:00",
  "12:00-13:00",
  "13:00-14:00",
  "14:00-15:00",
  "15:00-16:00",
  "16:00-17:00",
  "17:00-18:00",
  "18:00-19:00",
  "19:00-20:00",
];

export function SwimmingPool({
  selectedDate,
  selectedTimeSlot,
  onSelectTimeSlot,
}: SwimmingPoolProps) {
  const [loading, setLoading] = useState(false);
  const [bookedSlots, setBookedSlots] = useState<Booking[]>([]);

  useEffect(() => {
    if (!selectedDate) return;

    const fetchBookings = async () => {
      setLoading(true);
      try {
        const dateStr = format(selectedDate, "yyyy-MM-dd");
        const data = await getBookingsByDateService(dateStr, "swimming_pool");
        setBookedSlots(data);
      } catch (error) {
        console.log("Failed to fetch pool bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [selectedDate]);

  const getSlotBookings = (slot: string) => {
    const [start] = slot.split("-");
    // Simple check: matches start time
    return bookedSlots.filter((b) => b.startTime.startsWith(start));
  };

  return (
    <div className="space-y-6">
      <div className="relative w-full h-48 md:h-64 rounded-xl overflow-hidden shadow-md">
        <div className="absolute inset-0 bg-blue-900/20 z-10" />
        {/* using placeholder for now if image validation fails, but generated image path will be used via props or direct import if moved */}
        <div className="absolute inset-0 flex items-center justify-center bg-blue-100 text-blue-500">
          <Droplets className="h-16 w-16 opacity-50" />
          {/* We will replace this with the generated image later */}
        </div>
        <div className="absolute bottom-4 left-4 z-20 text-white p-2">
          <h3 className="text-2xl font-bold drop-shadow-md">Hồ bơi Vô cực</h3>
          <p className="font-medium drop-shadow-sm opacity-90">
            Tầng thượng Block A
          </p>
        </div>
      </div>

      <Card className="border-blue-100 bg-blue-50/50">
        <CardContent className="pt-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-full text-blue-600">
              <Info className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-blue-900">
                Chi phí dịch vụ
              </p>
              <p className="text-lg font-bold text-blue-700">
                {POOL_PRICE_PER_HOUR.toLocaleString("vi-VN")} VNĐ{" "}
                <span className="text-sm font-normal text-muted-foreground">
                  / giờ
                </span>
              </p>
            </div>
          </div>
          {/* Can add apartment info here if available in context/props */}
        </CardContent>
      </Card>

      <div>
        <Label className="text-base mb-3 block">Chọn khung giờ bơi</Label>
        {loading ? (
          <div className="flex justify-center p-8">
            <Loader2 className="animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {TIME_SLOTS.map((slot) => {
              const bookingsInSlot = getSlotBookings(slot);
              const isSelected = selectedTimeSlot === slot;

              return (
                <button
                  type="button"
                  key={slot}
                  onClick={() => onSelectTimeSlot(slot)}
                  className={`
                                relative p-3 rounded-lg border cursor-pointer transition-all text-left
                                ${
                                  isSelected
                                    ? "bg-blue-600 text-white border-blue-600 shadow-md"
                                    : "bg-card hover:border-blue-400 hover:bg-blue-50"
                                }
                            `}
                >
                  <div className="font-semibold text-center">{slot}</div>
                  {bookingsInSlot.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1 justify-center">
                      <Badge
                        variant="secondary"
                        className="text-[10px] h-4 px-1 bg-blue-100 text-blue-700"
                      >
                        {bookingsInSlot.length} người đã đặt
                      </Badge>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

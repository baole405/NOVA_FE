"use client";

import { format } from "date-fns";
import { Utensils } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface Booking {
  id: number;
  slotNumber: string; // Used as Area Name
  startTime: string;
  endTime: string;
}

interface BBQAreaProps {
  onSelectArea: (area: string) => void;
  selectedArea?: string;
  selectedDate: Date | undefined;
}

// Mock 5 BBQ areas
const AREAS = [
  { id: "Area 1", name: "Khu vực 1 (Hồ bơi)" },
  { id: "Area 2", name: "Khu vực 2 (Sân thượng)" },
  { id: "Area 3", name: "Khu vực 3 (Sân vườn)" },
  { id: "Area 4", name: "Khu vực 4 (Ven sông)" },
  { id: "Area 5", name: "Khu vực 5 (VIP)" },
];

export function BBQArea({
  onSelectArea,
  selectedArea,
  selectedDate,
}: BBQAreaProps) {
  const [areaBookings, setAreaBookings] = useState<Record<string, Booking[]>>(
    {},
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!selectedDate) return;

    const fetchBookings = async () => {
      setLoading(true);
      try {
        const dateStr = format(selectedDate, "yyyy-MM-dd");
        const token = localStorage.getItem("accessToken");
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/bookings?date=${dateStr}&serviceType=bbq`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        if (res.ok) {
          const data: Booking[] = await res.json();
          // Group bookings by area
          const grouped: Record<string, Booking[]> = {};
          data.forEach((b) => {
            if (b.slotNumber) {
              if (!grouped[b.slotNumber]) grouped[b.slotNumber] = [];
              grouped[b.slotNumber].push(b);
            }
          });
          setAreaBookings(grouped);
        }
      } catch (error) {
        console.log("Failed to fetch BBQ areas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [selectedDate]);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Chọn khu vực BBQ</h3>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {AREAS.map((area) => {
          const bookings = areaBookings[area.id] || [];
          const isBusy = bookings.length > 0;
          const isSelected = selectedArea === area.id;

          return (
            <button
              key={area.id}
              type="button"
              disabled={loading}
              onClick={() => onSelectArea(area.id)}
              className={cn(
                "relative p-4 rounded-lg border text-left transition-all hover:shadow-md",
                isSelected
                  ? "border-primary bg-primary/5 ring-1 ring-primary"
                  : "bg-card hover:bg-accent/50",
              )}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="font-semibold">{area.name}</div>
                <Utensils
                  className={cn(
                    "h-5 w-5",
                    isSelected ? "text-primary" : "text-muted-foreground",
                  )}
                />
              </div>

              {isBusy ? (
                <div className="text-xs text-orange-600 space-y-1 mt-2">
                  <p className="font-medium">Đã có lịch đặt:</p>
                  {bookings.map((b) => (
                    <div
                      key={b.id}
                      className="bg-orange-100 px-2 py-0.5 rounded"
                    >
                      {b.startTime.slice(0, 5)} - {b.endTime.slice(0, 5)}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-xs text-green-600 mt-2 font-medium">
                  Trống cả ngày
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

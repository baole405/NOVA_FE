"use client";

import { Utensils } from "lucide-react";
import { MOCK_BBQ_SLOTS } from "@/lib/facilities";
import { cn } from "@/lib/utils";

interface BBQAreaProps {
  onSelectArea: (area: string) => void;
  selectedArea?: string;
  selectedDate: Date | undefined;
}

export function BBQArea({ onSelectArea, selectedArea }: BBQAreaProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Chọn khu vực BBQ</h3>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {MOCK_BBQ_SLOTS.map((area) => {
          const isSelected = selectedArea === area.id;
          const isDisabled = area.status === "maintenance";

          return (
            <button
              key={area.id}
              type="button"
              disabled={isDisabled}
              onClick={() => onSelectArea(area.id)}
              className={cn(
                "relative p-4 rounded-lg border text-left transition-all hover:shadow-md",
                isSelected
                  ? "border-primary bg-primary/5 ring-1 ring-primary"
                  : "bg-card hover:bg-accent/50",
                isDisabled && "opacity-50 cursor-not-allowed",
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
              <div className="text-xs text-muted-foreground mt-1">
                Sức chứa: {area.capacity} người ·{" "}
                {area.pricePerHour.toLocaleString("vi-VN")} VNĐ/giờ
              </div>
              {isDisabled && (
                <div className="text-xs text-orange-600 mt-2 font-medium">
                  Đang bảo trì
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

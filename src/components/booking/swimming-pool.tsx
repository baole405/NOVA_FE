"use client";

import { Droplets } from "lucide-react";
import { MOCK_POOL_SLOTS } from "@/lib/facilities";
import { cn } from "@/lib/utils";

interface SwimmingPoolProps {
  onSelectPool: (poolId: string) => void;
  selectedPool?: string;
  selectedDate: Date | undefined;
}

export function SwimmingPool({
  onSelectPool,
  selectedPool,
}: SwimmingPoolProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Chọn hồ bơi</h3>
      <div className="grid gap-3 sm:grid-cols-2">
        {MOCK_POOL_SLOTS.map((pool) => {
          const isSelected = selectedPool === pool.id;
          const isDisabled = pool.status === "maintenance";
          return (
            <button
              key={pool.id}
              type="button"
              disabled={isDisabled}
              onClick={() => onSelectPool(pool.id)}
              className={cn(
                "relative p-4 rounded-lg border text-left transition-all hover:shadow-md",
                isSelected
                  ? "border-primary bg-primary/5 ring-1 ring-primary"
                  : "bg-card hover:bg-accent/50",
                isDisabled && "opacity-50 cursor-not-allowed",
              )}
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="font-semibold">{pool.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {pool.location}
                  </div>
                </div>
                <Droplets
                  className={cn(
                    "h-5 w-5",
                    isSelected ? "text-primary" : "text-muted-foreground",
                  )}
                />
              </div>
              <div className="text-xs text-muted-foreground mt-2 space-y-0.5">
                <div>
                  Sức chứa: <strong>{pool.capacity}</strong> người
                </div>
                <div>
                  Chi phí:{" "}
                  <strong>
                    {pool.pricePerHour.toLocaleString("vi-VN")} VNĐ/giờ
                  </strong>
                </div>
                <div>
                  Giờ mở: {pool.openTime} – {pool.closeTime} (tối đa{" "}
                  {pool.maxDurationHours}h)
                </div>
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

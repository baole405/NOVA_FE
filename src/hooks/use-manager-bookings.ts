"use client";

import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import type { ManagerBooking, UpdateBookingStatusPayload } from "@/lib/manager-bookings";
import { getAllBookings, updateBookingStatus } from "@/lib/manager-bookings";

interface UseManagerBookingsReturn {
  bookings: ManagerBooking[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  updateStatus: (id: number, payload: UpdateBookingStatusPayload) => Promise<void>;
}

export function useManagerBookings(): UseManagerBookingsReturn {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<ManagerBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    if (!user) return;
    try {
      setLoading(true);
      const data = await getAllBookings();
      setBookings(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load bookings");
      console.log("Failed to fetch manager bookings:", err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const updateStatus = useCallback(
    async (id: number, payload: UpdateBookingStatusPayload) => {
      const updated = await updateBookingStatus(id, payload);
      // Optimistic update: replace booking in local state
      setBookings((prev) =>
        prev.map((b) => (b.id === updated.id ? updated : b)),
      );
    },
    [],
  );

  return { bookings, loading, error, refetch, updateStatus };
}

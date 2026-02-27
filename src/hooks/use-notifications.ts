"use client";

import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import {
  getNotifications,
  markAllNotificationsRead,
  markNotificationRead,
} from "@/lib/notifications";
import type { Notification } from "@/types";
import { mapNotification } from "@/types/notifications";

interface UseNotificationsReturn {
  notifications: Notification[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  markRead: (id: number) => Promise<void>;
  markAllRead: () => Promise<void>;
}

export function useNotifications(): UseNotificationsReturn {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    if (!user) return;
    try {
      setLoading(true);
      const res = await getNotifications();
      setNotifications(res.data.map(mapNotification));
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load notifications",
      );
      console.log("Failed to fetch notifications:", err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const markRead = useCallback(async (id: number) => {
    // Optimistic update
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: false } : n)),
    );
    try {
      await markNotificationRead(id);
    } catch (err) {
      // Revert on failure
      console.log("Failed to mark notification read:", err);
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, unread: true } : n)),
      );
    }
  }, []);

  const markAllRead = useCallback(async () => {
    // Optimistic update
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
    try {
      await markAllNotificationsRead();
    } catch (err) {
      console.log("Failed to mark all notifications read:", err);
      refetch(); // Revert by refetching
    }
  }, [refetch]);

  return { notifications, loading, error, refetch, markRead, markAllRead };
}

// Notifications API

import type { BackendNotification, NotificationsResponse } from "@/types";
import { fetchApi } from "./api-client";

export async function getNotifications(params?: {
  limit?: number;
  offset?: number;
}): Promise<NotificationsResponse> {
  const searchParams = new URLSearchParams();
  searchParams.set("limit", String(params?.limit ?? 20));
  searchParams.set("offset", String(params?.offset ?? 0));

  return fetchApi<NotificationsResponse>(
    `/notifications?${searchParams.toString()}`,
  );
}

export async function markNotificationRead(id: number): Promise<void> {
  await fetchApi<void>(`/notifications/${id}/read`, { method: "PATCH" });
}

export type { BackendNotification, NotificationsResponse };

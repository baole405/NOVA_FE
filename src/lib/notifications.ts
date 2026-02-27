// Notifications API

import type { BackendNotification, NotificationsResponse } from "@/types";
import { fetchApi } from "./api-client";

export async function getNotifications(): Promise<NotificationsResponse> {
  return fetchApi<NotificationsResponse>("/notifications");
}

export async function markNotificationRead(id: number): Promise<void> {
  await fetchApi<void>(`/notifications/${id}/read`, { method: "PATCH" });
}

export type { BackendNotification, NotificationsResponse };

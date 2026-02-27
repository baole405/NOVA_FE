// Notification-related types

// Frontend display type (used by NotificationList component)
export interface Notification {
  id: number;
  title: string;
  desc: string;
  time: string; // display string e.g. "2 giờ trước"
  unread: boolean;
}

// Backend API response shape
export interface BackendNotification {
  id: number;
  title: string;
  content: string;
  createdAt: string; // ISO date string
  isRead: boolean;
  type?: string;
}

export interface NotificationsResponse {
  data: BackendNotification[];
  total: number;
}

// Map backend shape to frontend display shape
export function mapNotification(n: BackendNotification): Notification {
  const date = new Date(n.createdAt);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffHours / 24);

  let time: string;
  if (diffHours < 1) time = "Vừa xong";
  else if (diffHours < 24) time = `${diffHours} giờ trước`;
  else time = `${diffDays} ngày trước`;

  return {
    id: n.id,
    title: n.title,
    desc: n.content,
    time,
    unread: !n.isRead,
  };
}

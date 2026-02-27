// Notification-related types

export interface Notification {
  id: number;
  title: string;
  desc: string;
  time: string; // Thời gian hiển thị (vd: "2 giờ trước")
  unread: boolean;
}

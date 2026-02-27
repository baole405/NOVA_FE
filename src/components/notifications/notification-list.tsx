"use client";

import { Bell, Check, Circle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Notification } from "@/types";

interface NotificationListProps {
  notifications: Notification[];
  onToggleRead: (id: number) => void;
}

export function NotificationList({
  notifications,
  onToggleRead,
}: NotificationListProps) {
  if (notifications.length === 0) {
    return (
      <div className="text-center py-12">
        <Bell className="mx-auto h-12 w-12 text-muted-foreground/50" />
        <h3 className="mt-4 text-lg font-semibold">Không có thông báo</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Bạn đã đọc hết tất cả thông báo.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {notifications.map((notif) => (
        <button
          key={notif.id}
          type="button"
          onClick={() => onToggleRead(notif.id)}
          className={cn(
            "w-full flex items-start gap-4 p-4 rounded-lg border transition-colors text-left",
            notif.unread
              ? "bg-primary/5 border-primary/20 hover:bg-primary/10"
              : "bg-card border-border hover:bg-accent/50",
          )}
        >
          <div
            className={cn(
              "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border",
              notif.unread
                ? "bg-primary/10 border-primary/20 text-primary"
                : "bg-muted border-border text-muted-foreground",
            )}
          >
            {notif.unread ? (
              <Circle className="h-4 w-4 fill-current" />
            ) : (
              <Check className="h-4 w-4" />
            )}
          </div>
          <div className="flex-1 min-w-0 space-y-1">
            <p
              className={cn(
                "text-sm leading-none",
                notif.unread
                  ? "font-semibold text-foreground"
                  : "font-medium text-muted-foreground",
              )}
            >
              {notif.title}
            </p>
            <p className="text-sm text-muted-foreground">{notif.desc}</p>
            <p className="text-xs text-muted-foreground">{notif.time}</p>
          </div>
        </button>
      ))}
    </div>
  );
}

"use client";

import { Bell, CheckCheck } from "lucide-react";
import { NotificationList } from "@/components/notifications/notification-list";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNotifications } from "@/hooks/use-notifications";

export default function NotificationsPage() {
  const { notifications, loading, markRead, markAllRead } = useNotifications();

  const unreadNotifications = notifications.filter((n) => n.unread);
  const unreadCount = unreadNotifications.length;

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 md:p-8 max-w-3xl mx-auto animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-primary flex items-center gap-2">
            <Bell className="h-8 w-8" />
            Thông báo
          </h2>
          <p className="text-muted-foreground mt-1">
            Bạn có {unreadCount} thông báo chưa đọc
          </p>
        </div>
        {unreadCount > 0 && (
          <Button variant="outline" size="sm" onClick={markAllRead}>
            <CheckCheck className="h-4 w-4 mr-2" />
            Đánh dấu tất cả đã đọc
          </Button>
        )}
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">Tất cả ({notifications.length})</TabsTrigger>
          <TabsTrigger value="unread">Chưa đọc ({unreadCount})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-4">
          <NotificationList
            notifications={notifications}
            onToggleRead={markRead}
          />
        </TabsContent>

        <TabsContent value="unread" className="mt-4">
          <NotificationList
            notifications={unreadNotifications}
            onToggleRead={markRead}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

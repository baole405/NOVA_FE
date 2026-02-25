"use client";

import { useState } from "react";
import { Megaphone } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AnnouncementCard } from "@/components/announcements/announcement-card";
import { EmptyState } from "@/components/ui/empty-state";
import { mockAnnouncements } from "@/lib/mock-data";
import type { AnnouncementCategory } from "@/types";

export default function AnnouncementsPage() {
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  const filteredAnnouncements = mockAnnouncements
    .filter(
      (a) => categoryFilter === "all" || a.category === categoryFilter,
    )
    .sort((a, b) => {
      // Pinned first, then by date desc
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;
      return (
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    });

  return (
    <div className="space-y-6 p-4 md:p-8 max-w-5xl mx-auto animate-in fade-in duration-500">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-primary flex items-center gap-2">
          <Megaphone className="h-8 w-8" />
          Tin tức & Thông báo
        </h2>
        <p className="text-muted-foreground mt-1">
          Cập nhật thông tin mới nhất từ Ban quản lý
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Lọc theo danh mục" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả</SelectItem>
            <SelectItem value="maintenance">Bảo trì</SelectItem>
            <SelectItem value="event">Sự kiện</SelectItem>
            <SelectItem value="policy">Quy định</SelectItem>
            <SelectItem value="emergency">Khẩn cấp</SelectItem>
            <SelectItem value="general">Chung</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {filteredAnnouncements.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2">
          {filteredAnnouncements.map((announcement) => (
            <AnnouncementCard
              key={announcement.id}
              announcement={announcement}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Megaphone}
          title="Không có thông báo"
          description="Chưa có thông báo nào trong danh mục này."
        />
      )}
    </div>
  );
}

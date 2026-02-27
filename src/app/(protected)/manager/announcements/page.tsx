"use client";

import { Megaphone, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { mockAnnouncements } from "@/lib/mock-data";

const categoryLabels: Record<string, string> = {
  maintenance: "Bảo trì",
  event: "Sự kiện",
  policy: "Quy định",
  emergency: "Khẩn cấp",
  general: "Chung",
};

const priorityConfig: Record<string, { label: string; className: string }> = {
  normal: { label: "Bình thường", className: "" },
  important: {
    label: "Quan trọng",
    className:
      "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  },
  urgent: {
    label: "Khẩn cấp",
    className: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  },
};

export default function ManagerAnnouncementsPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Megaphone className="h-8 w-8 text-primary" />
            Thông báo & Tin tức
          </h1>
          <p className="text-muted-foreground mt-2">
            Quản lý thông báo và tin tức cho cư dân
          </p>
        </div>
        <Link href="/manager/announcements/create">
          <Button size="lg" className="w-full sm:w-auto">
            <Plus className="mr-2 h-4 w-4" />
            Tạo thông báo mới
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Danh sách thông báo</CardTitle>
          <CardDescription>
            Tổng số: {mockAnnouncements.length} thông báo
          </CardDescription>
        </CardHeader>
        <CardContent>
          {mockAnnouncements.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tiêu đề</TableHead>
                    <TableHead>Danh mục</TableHead>
                    <TableHead>Độ ưu tiên</TableHead>
                    <TableHead>Ngày tạo</TableHead>
                    <TableHead>Ghim</TableHead>
                    <TableHead className="text-right">Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockAnnouncements.map((announcement) => {
                    const priority = priorityConfig[announcement.priority];
                    return (
                      <TableRow key={announcement.id}>
                        <TableCell className="font-medium max-w-[300px] truncate">
                          {announcement.title}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {categoryLabels[announcement.category]}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {priority.className ? (
                            <Badge
                              variant="secondary"
                              className={priority.className}
                            >
                              {priority.label}
                            </Badge>
                          ) : (
                            <span className="text-sm text-muted-foreground">
                              {priority.label}
                            </span>
                          )}
                        </TableCell>
                        <TableCell>
                          {new Date(announcement.createdAt).toLocaleDateString(
                            "vi-VN",
                          )}
                        </TableCell>
                        <TableCell>
                          {announcement.pinned ? (
                            <Badge variant="secondary">Đã ghim</Badge>
                          ) : (
                            <span className="text-sm text-muted-foreground">
                              —
                            </span>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            Xem
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          ) : (
            <EmptyState
              icon={Megaphone}
              title="Chưa có thông báo"
              description="Bắt đầu bằng cách tạo thông báo đầu tiên cho cư dân."
              action={
                <Link href="/manager/announcements/create">
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Tạo thông báo
                  </Button>
                </Link>
              }
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}

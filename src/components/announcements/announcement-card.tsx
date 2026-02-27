import { Pin } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type {
  Announcement,
  AnnouncementCategory,
  AnnouncementPriority,
} from "@/types";

const categoryConfig: Record<
  AnnouncementCategory,
  { label: string; className: string }
> = {
  maintenance: {
    label: "Bảo trì",
    className:
      "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  },
  event: {
    label: "Sự kiện",
    className:
      "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  },
  policy: {
    label: "Quy định",
    className:
      "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  },
  emergency: {
    label: "Khẩn cấp",
    className: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  },
  general: {
    label: "Chung",
    className:
      "bg-slate-100 text-slate-700 dark:bg-slate-900/30 dark:text-slate-400",
  },
};

const priorityConfig: Record<
  AnnouncementPriority,
  { label: string; className: string }
> = {
  normal: { label: "", className: "" },
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

interface AnnouncementCardProps {
  announcement: Announcement;
}

export function AnnouncementCard({ announcement }: AnnouncementCardProps) {
  const category = categoryConfig[announcement.category];
  const priority = priorityConfig[announcement.priority];

  return (
    <Link href={`/announcements/${announcement.id}`}>
      <Card
        className={cn(
          "hover:shadow-lg transition-all duration-200 hover:scale-[1.01] cursor-pointer h-full",
          announcement.pinned && "border-primary/30 bg-primary/5",
        )}
      >
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="secondary" className={category.className}>
                {category.label}
              </Badge>
              {priority.label && (
                <Badge variant="secondary" className={priority.className}>
                  {priority.label}
                </Badge>
              )}
            </div>
            {announcement.pinned && (
              <Pin className="h-4 w-4 text-primary shrink-0" />
            )}
          </div>
          <CardTitle className="text-base leading-snug mt-2">
            {announcement.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground line-clamp-3">
            {announcement.content.replace(/[#*`\->[\]]/g, "").slice(0, 150)}...
          </p>
          <div className="flex items-center justify-between mt-4 text-xs text-muted-foreground">
            <span>{announcement.author}</span>
            <span>
              {new Date(announcement.createdAt).toLocaleDateString("vi-VN")}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

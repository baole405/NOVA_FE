"use client";

import { use } from "react";
import { ArrowLeft, Calendar, Pin, User } from "lucide-react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { mockAnnouncements } from "@/lib/mock-data";

export default function AnnouncementDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const announcement = mockAnnouncements.find((a) => a.id === id);

  if (!announcement) {
    return (
      <div className="p-4 md:p-8 max-w-3xl mx-auto text-center py-20">
        <h2 className="text-2xl font-bold">Không tìm thấy thông báo</h2>
        <p className="text-muted-foreground mt-2">
          Thông báo này có thể đã bị xóa hoặc không tồn tại.
        </p>
        <Link href="/announcements">
          <Button variant="outline" className="mt-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Quay lại
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto animate-in fade-in duration-500">
      <Link href="/announcements">
        <Button variant="ghost" size="sm" className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Quay lại danh sách
        </Button>
      </Link>

      <Card>
        <CardContent className="p-6 md:p-8">
          <div className="flex items-center gap-2 flex-wrap mb-4">
            <Badge variant="secondary">{announcement.category}</Badge>
            {announcement.priority !== "normal" && (
              <Badge variant="destructive">{announcement.priority}</Badge>
            )}
            {announcement.pinned && (
              <Pin className="h-4 w-4 text-primary" />
            )}
          </div>

          <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">
            {announcement.title}
          </h1>

          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
            <span className="flex items-center gap-1">
              <User className="h-4 w-4" />
              {announcement.author}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {new Date(announcement.createdAt).toLocaleDateString("vi-VN", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>

          <Separator className="mb-6" />

          <div className="prose prose-sm dark:prose-invert max-w-none">
            <ReactMarkdown
              components={{
                h1: ({ children }) => (
                  <h1 className="text-2xl font-bold mt-6 mb-3">{children}</h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-xl font-semibold mt-5 mb-2">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-lg font-semibold mt-4 mb-2">
                    {children}
                  </h3>
                ),
                p: ({ children }) => (
                  <p className="text-sm leading-relaxed text-foreground mb-3">
                    {children}
                  </p>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc list-inside space-y-1 text-sm mb-3">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal list-inside space-y-1 text-sm mb-3">
                    {children}
                  </ol>
                ),
                strong: ({ children }) => (
                  <strong className="font-semibold text-foreground">
                    {children}
                  </strong>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-primary/30 pl-4 italic text-muted-foreground my-3">
                    {children}
                  </blockquote>
                ),
              }}
            >
              {announcement.content}
            </ReactMarkdown>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

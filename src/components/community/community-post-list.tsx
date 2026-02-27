"use client";

import { Heart, MessageCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import type { CommunityCategory, CommunityPost } from "@/types";

const categoryConfig: Record<
  CommunityCategory,
  { label: string; className: string }
> = {
  general: {
    label: "Chung",
    className:
      "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  },
  buy_sell: {
    label: "Mua bán",
    className:
      "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  },
  qa: {
    label: "Hỏi đáp",
    className:
      "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  },
  events: {
    label: "Sự kiện",
    className:
      "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  },
};

function formatRelativeTime(dateString: string): string {
  const now = new Date();
  const date = new Date(dateString);
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffHours / 24);

  if (diffHours < 1) return "Vừa xong";
  if (diffHours < 24) return `${diffHours} giờ trước`;
  if (diffDays < 7) return `${diffDays} ngày trước`;
  return date.toLocaleDateString("vi-VN");
}

interface CommunityPostListProps {
  posts: CommunityPost[];
}

export function CommunityPostList({ posts }: CommunityPostListProps) {
  if (posts.length === 0) {
    return (
      <EmptyState
        icon={MessageCircle}
        title="Chưa có bài viết"
        description="Hãy là người đầu tiên chia sẻ trong cộng đồng!"
      />
    );
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => {
        const cat = categoryConfig[post.category];
        return (
          <Card
            key={post.id}
            className="hover:bg-accent/30 transition-colors cursor-pointer"
          >
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                <Avatar className="h-10 w-10 mt-0.5">
                  <AvatarImage src={post.authorAvatarUrl} />
                  <AvatarFallback className="bg-primary/10 text-primary font-bold">
                    {post.authorName.charAt(0)}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-medium text-sm">
                      {post.authorName}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Căn {post.apartmentUnit}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {formatRelativeTime(post.createdAt)}
                    </span>
                  </div>

                  <div className="mt-2">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="secondary" className={cat.className}>
                        {cat.label}
                      </Badge>
                      <h3 className="font-semibold text-base line-clamp-1">
                        {post.title}
                      </h3>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {post.content}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                    <button
                      type="button"
                      className="flex items-center gap-1 hover:text-red-500 transition-colors"
                    >
                      <Heart className="h-4 w-4" />
                      {post.likes}
                    </button>
                    <button
                      type="button"
                      className="flex items-center gap-1 hover:text-primary transition-colors"
                    >
                      <MessageCircle className="h-4 w-4" />
                      {post.commentCount}
                    </button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

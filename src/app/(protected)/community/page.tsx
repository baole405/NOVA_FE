"use client";

import { Plus, Users } from "lucide-react";
import { useMemo, useState } from "react";
import { CommunityPostList } from "@/components/community/community-post-list";
import { CreatePostDialog } from "@/components/community/create-post-dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockCommunityPosts } from "@/lib/mock-data";
import type { CommunityCategory, CommunityPost } from "@/types";

export default function CommunityPage() {
  const [posts, setPosts] = useState<CommunityPost[]>(mockCommunityPosts);
  const [createOpen, setCreateOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");

  const filteredPosts = useMemo(() => {
    if (activeTab === "all") return posts;
    return posts.filter((p) => p.category === activeTab);
  }, [posts, activeTab]);

  const handleCreatePost = (data: {
    title: string;
    content: string;
    category: CommunityCategory;
  }) => {
    const newPost: CommunityPost = {
      id: `post_${Date.now()}`,
      ...data,
      authorId: "user_001",
      authorName: "Nguyễn Minh Nhật",
      authorAvatarUrl: "https://github.com/shadcn.png",
      apartmentUnit: "2304",
      createdAt: new Date().toISOString(),
      likes: 0,
      commentCount: 0,
    };
    setPosts((prev) => [newPost, ...prev]);
  };

  return (
    <div className="space-y-6 p-4 md:p-8 max-w-4xl mx-auto animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Users className="h-8 w-8 text-primary" />
            Cộng đồng
          </h2>
          <p className="text-muted-foreground mt-1">
            Kết nối, chia sẻ và trao đổi cùng cư dân trong tòa nhà.
          </p>
        </div>
        <Button
          onClick={() => setCreateOpen(true)}
          className="w-full sm:w-auto"
        >
          <Plus className="mr-2 h-4 w-4" />
          Tạo bài viết
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">Tất cả</TabsTrigger>
          <TabsTrigger value="general">Chung</TabsTrigger>
          <TabsTrigger value="buy_sell">Mua bán</TabsTrigger>
          <TabsTrigger value="qa">Hỏi đáp</TabsTrigger>
          <TabsTrigger value="events">Sự kiện</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-4">
          <CommunityPostList posts={filteredPosts} />
        </TabsContent>
      </Tabs>

      <CreatePostDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
        onSubmit={handleCreatePost}
      />
    </div>
  );
}

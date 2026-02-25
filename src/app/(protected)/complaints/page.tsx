"use client";

import { useState } from "react";
import { MessageSquareWarning } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ComplaintForm } from "@/components/complaints/complaint-form";
import { ComplaintList } from "@/components/complaints/complaint-list";
import { mockComplaints } from "@/lib/mock-data";
import type { Complaint, ComplaintCategory, ComplaintUrgency } from "@/types";

export default function ComplaintsPage() {
  const [complaints, setComplaints] = useState<Complaint[]>(mockComplaints);

  const handleSubmit = (data: {
    title: string;
    category: ComplaintCategory;
    description: string;
    urgency: ComplaintUrgency;
  }) => {
    const newComplaint: Complaint = {
      id: `cpl_${Date.now()}`,
      ...data,
      status: "pending",
      createdAt: new Date().toISOString(),
      residentId: "user_001",
      residentName: "Nguyễn Minh Nhật",
      apartmentUnit: "2304",
    };
    setComplaints((prev) => [newComplaint, ...prev]);
  };

  return (
    <div className="space-y-6 p-4 md:p-8 max-w-5xl mx-auto animate-in fade-in duration-500">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-primary flex items-center gap-2">
          <MessageSquareWarning className="h-8 w-8" />
          Phản ánh
        </h2>
        <p className="text-muted-foreground mt-1">
          Gửi phản ánh về các vấn đề trong căn hộ hoặc tòa nhà
        </p>
      </div>

      <Tabs defaultValue="list" className="w-full">
        <TabsList>
          <TabsTrigger value="list">
            Phản ánh của tôi ({complaints.length})
          </TabsTrigger>
          <TabsTrigger value="create">Gửi phản ánh mới</TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="mt-4">
          <ComplaintList complaints={complaints} />
        </TabsContent>

        <TabsContent value="create" className="mt-4">
          <ComplaintForm onSubmit={handleSubmit} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

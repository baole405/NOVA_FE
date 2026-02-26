"use client";

import { Pencil, Plus, Trash2, Users } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { FamilyMember } from "@/types";
import { DeleteConfirmDialog } from "./delete-confirm-dialog";
import { FamilyMemberDialog } from "./family-member-dialog";

interface FamilyListProps {
  members?: FamilyMember[];
}

export function FamilyList({ members: initialMembers }: FamilyListProps) {
  const [members, setMembers] = useState<FamilyMember[]>(initialMembers || []);
  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<
    FamilyMember | undefined
  >();

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("vi-VN");
  };

  const handleCreate = (data: Omit<FamilyMember, "id" | "userId">) => {
    const newMember: FamilyMember = {
      id: `fm_${Date.now()}`,
      userId: "user_001",
      ...data,
    };
    setMembers((prev) => [...prev, newMember]);
  };

  const handleEdit = (data: Omit<FamilyMember, "id" | "userId">) => {
    if (!selectedMember) return;
    setMembers((prev) =>
      prev.map((m) => (m.id === selectedMember.id ? { ...m, ...data } : m)),
    );
  };

  const handleDelete = () => {
    if (!selectedMember) return;
    setMembers((prev) => prev.filter((m) => m.id !== selectedMember.id));
    setDeleteOpen(false);
    setSelectedMember(undefined);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Thành Viên Gia Đình
          </CardTitle>
          <CardDescription>Cư dân đã đăng ký trong căn hộ.</CardDescription>
        </div>
        <Button size="sm" onClick={() => setCreateOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Thêm
        </Button>
      </CardHeader>
      <CardContent className="space-y-3">
        {members.length === 0 && (
          <p className="text-center text-muted-foreground py-4">
            Chưa có thành viên nào được đăng ký.
          </p>
        )}

        {members.map((member) => (
          <div
            key={member.id}
            className="flex items-center justify-between p-4 border rounded-lg bg-card hover:bg-accent/30 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                {member.name.charAt(0)}
              </div>
              <div>
                <p className="font-medium">{member.name}</p>
                <p className="text-sm text-muted-foreground">
                  {member.relation}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground hidden sm:inline">
                {formatDate(member.dob)}
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => {
                  setSelectedMember(member);
                  setEditOpen(true);
                }}
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-destructive hover:text-destructive"
                onClick={() => {
                  setSelectedMember(member);
                  setDeleteOpen(true);
                }}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}

        <FamilyMemberDialog
          open={createOpen}
          onOpenChange={setCreateOpen}
          onSave={handleCreate}
        />

        <FamilyMemberDialog
          open={editOpen}
          onOpenChange={(open) => {
            setEditOpen(open);
            if (!open) setSelectedMember(undefined);
          }}
          member={selectedMember}
          onSave={handleEdit}
        />

        <DeleteConfirmDialog
          open={deleteOpen}
          onOpenChange={(open) => {
            setDeleteOpen(open);
            if (!open) setSelectedMember(undefined);
          }}
          title="Xóa thành viên"
          description={`Bạn có chắc muốn xóa "${selectedMember?.name}" khỏi danh sách gia đình?`}
          onConfirm={handleDelete}
        />
      </CardContent>
    </Card>
  );
}

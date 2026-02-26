"use client";

import { Building2, Plus } from "lucide-react";
import { useMemo, useState } from "react";
import { ApartmentDialog } from "@/components/manager/apartments/apartment-dialog";
import { ApartmentTable } from "@/components/manager/apartments/apartment-table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockManagerApartments } from "@/lib/mock-data";
import type { ManagerApartment } from "@/types";

export default function ManagerApartmentsPage() {
  const [apartments, setApartments] = useState<ManagerApartment[]>(
    mockManagerApartments,
  );
  const [blockFilter, setBlockFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedApartment, setSelectedApartment] = useState<
    ManagerApartment | undefined
  >();

  const filteredApartments = useMemo(() => {
    return apartments.filter((apt) => {
      if (blockFilter !== "all" && apt.block !== blockFilter) return false;
      if (statusFilter !== "all" && apt.status !== statusFilter) return false;
      return true;
    });
  }, [apartments, blockFilter, statusFilter]);

  const totalCount = apartments.length;
  const occupiedCount = apartments.filter(
    (a) => a.status === "occupied",
  ).length;
  const vacantCount = apartments.filter((a) => a.status === "vacant").length;

  const blocks = useMemo(() => {
    const set = new Set(apartments.map((a) => a.block));
    return Array.from(set).sort();
  }, [apartments]);

  const handleCreate = (data: Omit<ManagerApartment, "id">) => {
    const newApt: ManagerApartment = {
      id: `apt_${Date.now()}`,
      ...data,
    };
    setApartments((prev) => [...prev, newApt]);
  };

  const handleEdit = (data: Omit<ManagerApartment, "id">) => {
    if (!selectedApartment) return;
    setApartments((prev) =>
      prev.map((a) => (a.id === selectedApartment.id ? { ...a, ...data } : a)),
    );
  };

  const handleDelete = () => {
    if (!selectedApartment) return;
    setApartments((prev) => prev.filter((a) => a.id !== selectedApartment.id));
    setDeleteOpen(false);
    setSelectedApartment(undefined);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Building2 className="h-8 w-8 text-primary" />
            Quản lý căn hộ
          </h1>
          <p className="text-muted-foreground mt-2">
            Quản lý thông tin căn hộ và phân bổ cư dân
          </p>
        </div>
        <Button
          size="lg"
          className="w-full sm:w-auto"
          onClick={() => setCreateOpen(true)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Thêm căn hộ
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Tổng căn hộ</p>
            <p className="text-2xl font-bold">{totalCount}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Đang ở</p>
            <p className="text-2xl font-bold text-green-600">{occupiedCount}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Trống</p>
            <p className="text-2xl font-bold text-amber-600">{vacantCount}</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <Select value={blockFilter} onValueChange={setBlockFilter}>
          <SelectTrigger className="w-44">
            <SelectValue placeholder="Tòa nhà" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả tòa</SelectItem>
            {blocks.map((b) => (
              <SelectItem key={b} value={b}>
                Tòa {b}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-44">
            <SelectValue placeholder="Trạng thái" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả trạng thái</SelectItem>
            <SelectItem value="occupied">Đang ở</SelectItem>
            <SelectItem value="vacant">Trống</SelectItem>
            <SelectItem value="maintenance">Bảo trì</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>Danh sách căn hộ</CardTitle>
          <CardDescription>
            Hiển thị {filteredApartments.length} / {apartments.length} căn hộ
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ApartmentTable
            apartments={filteredApartments}
            onEdit={(apt) => {
              setSelectedApartment(apt);
              setEditOpen(true);
            }}
            onDelete={(apt) => {
              setSelectedApartment(apt);
              setDeleteOpen(true);
            }}
          />
        </CardContent>
      </Card>

      {/* Dialogs */}
      <ApartmentDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
        onSave={handleCreate}
      />

      <ApartmentDialog
        open={editOpen}
        onOpenChange={(open) => {
          setEditOpen(open);
          if (!open) setSelectedApartment(undefined);
        }}
        apartment={selectedApartment}
        onSave={handleEdit}
      />

      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xóa căn hộ</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc muốn xóa căn hộ {selectedApartment?.unitNumber} - Tòa{" "}
              {selectedApartment?.block}? Hành động này không thể hoàn tác.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Xóa
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

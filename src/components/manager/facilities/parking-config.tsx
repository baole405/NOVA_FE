"use client";

import { Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { ParkingSlot } from "@/lib/facilities";
import {
  createParkingSlot,
  deleteParkingSlot,
  MOCK_PARKING_SLOTS,
  updateParkingSlot,
} from "@/lib/facilities";

const statusConfig: Record<
  ParkingSlot["status"],
  { label: string; className: string }
> = {
  available: {
    label: "Trống",
    className:
      "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  },
  occupied: {
    label: "Đã thuê",
    className:
      "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  },
  maintenance: {
    label: "Bảo trì",
    className:
      "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  },
};

const typeLabels: Record<ParkingSlot["type"], string> = {
  car: "Ô tô",
  motorbike: "Xe máy",
  bicycle: "Xe đạp",
};

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
}

type FormState = {
  id: string;
  label: string;
  floor: string;
  type: ParkingSlot["type"];
  status: ParkingSlot["status"];
  pricePerDay: string;
  pricePerMonth: string;
};

const defaultForm = (): FormState => ({
  id: "",
  label: "",
  floor: "",
  type: "car",
  status: "available",
  pricePerDay: "20000",
  pricePerMonth: "500000",
});

export function ParkingConfig() {
  const [slots, setSlots] = useState<ParkingSlot[]>([...MOCK_PARKING_SLOTS]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(defaultForm());
  const [saving, setSaving] = useState(false);

  const available = slots.filter((s) => s.status === "available").length;
  const occupied = slots.filter((s) => s.status === "occupied").length;

  const openAdd = () => {
    setEditingId(null);
    setForm(defaultForm());
    setDialogOpen(true);
  };

  const openEdit = (slot: ParkingSlot) => {
    setEditingId(slot.id);
    setForm({
      id: slot.id,
      label: slot.label,
      floor: slot.floor,
      type: slot.type,
      status: slot.status,
      pricePerDay: String(slot.pricePerDay),
      pricePerMonth: String(slot.pricePerMonth),
    });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (editingId) {
        const updated = await updateParkingSlot(editingId, {
          label: form.label,
          floor: form.floor,
          type: form.type,
          status: form.status,
          pricePerDay: Number(form.pricePerDay),
          pricePerMonth: Number(form.pricePerMonth),
        });
        setSlots((prev) => prev.map((s) => (s.id === editingId ? updated : s)));
      } else {
        const created = await createParkingSlot({
          label: form.label || `${form.id} - Tầng ${form.floor}`,
          floor: form.floor,
          type: form.type,
          status: form.status,
          pricePerDay: Number(form.pricePerDay),
          pricePerMonth: Number(form.pricePerMonth),
        });
        setSlots((prev) => [...prev, created]);
      }
      setDialogOpen(false);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    await deleteParkingSlot(id);
    setSlots((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-4 text-sm">
          <span className="text-muted-foreground">
            Tổng: <strong className="text-foreground">{slots.length}</strong>
          </span>
          <span className="text-muted-foreground">
            Trống: <strong className="text-green-600">{available}</strong>
          </span>
          <span className="text-muted-foreground">
            Đã thuê: <strong className="text-blue-600">{occupied}</strong>
          </span>
        </div>
        <Button size="sm" onClick={openAdd}>
          <Plus className="h-4 w-4 mr-1" /> Thêm vị trí
        </Button>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Mã</TableHead>
              <TableHead>Nhãn</TableHead>
              <TableHead>Tầng</TableHead>
              <TableHead>Loại xe</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead>Giá/ngày</TableHead>
              <TableHead>Giá/tháng</TableHead>
              <TableHead className="text-right">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {slots.map((slot) => {
              const sc = statusConfig[slot.status];
              return (
                <TableRow key={slot.id}>
                  <TableCell className="font-medium">{slot.id}</TableCell>
                  <TableCell>{slot.label}</TableCell>
                  <TableCell>{slot.floor}</TableCell>
                  <TableCell>{typeLabels[slot.type]}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={sc.className}>
                      {sc.label}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatCurrency(slot.pricePerDay)}</TableCell>
                  <TableCell>{formatCurrency(slot.pricePerMonth)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openEdit(slot)}
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Xoá vị trí {slot.id}?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Hành động này không thể hoàn tác.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Huỷ</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(slot.id)}
                            >
                              Xoá
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* Add / Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingId ? "Sửa vị trí đỗ xe" : "Thêm vị trí đỗ xe"}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-2">
            {!editingId && (
              <div className="space-y-1">
                <Label>Mã vị trí</Label>
                <Input
                  placeholder="VD: C1, D2..."
                  value={form.id}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, id: e.target.value }))
                  }
                />
              </div>
            )}
            <div className="space-y-1">
              <Label>Nhãn hiển thị</Label>
              <Input
                placeholder="VD: A1 - Tầng B1 (Ô tô)"
                value={form.label}
                onChange={(e) =>
                  setForm((f) => ({ ...f, label: e.target.value }))
                }
              />
            </div>
            <div className="space-y-1">
              <Label>Tầng</Label>
              <Input
                placeholder="VD: B1, B2"
                value={form.floor}
                onChange={(e) =>
                  setForm((f) => ({ ...f, floor: e.target.value }))
                }
              />
            </div>
            <div className="space-y-1">
              <Label>Loại xe</Label>
              <Select
                value={form.type}
                onValueChange={(v) =>
                  setForm((f) => ({ ...f, type: v as ParkingSlot["type"] }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="car">Ô tô</SelectItem>
                  <SelectItem value="motorbike">Xe máy</SelectItem>
                  <SelectItem value="bicycle">Xe đạp</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label>Giá/ngày (VNĐ)</Label>
                <Input
                  type="number"
                  value={form.pricePerDay}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, pricePerDay: e.target.value }))
                  }
                />
              </div>
              <div className="space-y-1">
                <Label>Giá/tháng (VNĐ)</Label>
                <Input
                  type="number"
                  value={form.pricePerMonth}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, pricePerMonth: e.target.value }))
                  }
                />
              </div>
            </div>
            <div className="space-y-1">
              <Label>Trạng thái</Label>
              <Select
                value={form.status}
                onValueChange={(v) =>
                  setForm((f) => ({ ...f, status: v as ParkingSlot["status"] }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="available">Trống</SelectItem>
                  <SelectItem value="occupied">Đã thuê</SelectItem>
                  <SelectItem value="maintenance">Bảo trì</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Huỷ
            </Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving ? "Đang lưu..." : "Lưu"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

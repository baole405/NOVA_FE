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
import type { BBQSlot } from "@/lib/facilities";
import {
  createBBQSlot,
  deleteBBQSlot,
  MOCK_BBQ_SLOTS,
  updateBBQSlot,
} from "@/lib/facilities";

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
}

type FormState = {
  name: string;
  capacity: string;
  pricePerHour: string;
  status: BBQSlot["status"];
};

const defaultForm = (): FormState => ({
  name: "",
  capacity: "20",
  pricePerHour: "150000",
  status: "available",
});

export function BBQConfig() {
  const [areas, setAreas] = useState<BBQSlot[]>([...MOCK_BBQ_SLOTS]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(defaultForm());
  const [saving, setSaving] = useState(false);

  const openAdd = () => {
    setEditingId(null);
    setForm(defaultForm());
    setDialogOpen(true);
  };

  const openEdit = (area: BBQSlot) => {
    setEditingId(area.id);
    setForm({
      name: area.name,
      capacity: String(area.capacity),
      pricePerHour: String(area.pricePerHour),
      status: area.status,
    });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (editingId) {
        const updated = await updateBBQSlot(editingId, {
          name: form.name,
          capacity: Number(form.capacity),
          pricePerHour: Number(form.pricePerHour),
          status: form.status,
        });
        setAreas((prev) => prev.map((a) => (a.id === editingId ? updated : a)));
      } else {
        const created = await createBBQSlot({
          name: form.name,
          capacity: Number(form.capacity),
          pricePerHour: Number(form.pricePerHour),
          status: form.status,
        });
        setAreas((prev) => [...prev, created]);
      }
      setDialogOpen(false);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    await deleteBBQSlot(id);
    setAreas((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Tổng: <strong className="text-foreground">{areas.length}</strong> khu
          BBQ
        </p>
        <Button size="sm" onClick={openAdd}>
          <Plus className="h-4 w-4 mr-1" /> Thêm khu BBQ
        </Button>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tên khu vực</TableHead>
              <TableHead>Sức chứa</TableHead>
              <TableHead>Giá/giờ</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead className="text-right">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {areas.map((area) => (
              <TableRow key={area.id}>
                <TableCell className="font-medium">{area.name}</TableCell>
                <TableCell>{area.capacity} người</TableCell>
                <TableCell>{formatCurrency(area.pricePerHour)}</TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className={
                      area.status === "available"
                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400"
                    }
                  >
                    {area.status === "available" ? "Sẵn sàng" : "Bảo trì"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openEdit(area)}
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
                          <AlertDialogTitle>Xoá {area.name}?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Hành động này không thể hoàn tác.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Huỷ</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(area.id)}
                          >
                            Xoá
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Add / Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingId ? "Sửa khu BBQ" : "Thêm khu BBQ"}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-2">
            <div className="space-y-1">
              <Label>Tên khu vực</Label>
              <Input
                placeholder="VD: Khu vực 1 (Sân thượng)"
                value={form.name}
                onChange={(e) =>
                  setForm((f) => ({ ...f, name: e.target.value }))
                }
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label>Sức chứa (người)</Label>
                <Input
                  type="number"
                  min={1}
                  value={form.capacity}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, capacity: e.target.value }))
                  }
                />
              </div>
              <div className="space-y-1">
                <Label>Giá/giờ (VNĐ)</Label>
                <Input
                  type="number"
                  value={form.pricePerHour}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, pricePerHour: e.target.value }))
                  }
                />
              </div>
            </div>
            <div className="space-y-1">
              <Label>Trạng thái</Label>
              <Select
                value={form.status}
                onValueChange={(v) =>
                  setForm((f) => ({ ...f, status: v as BBQSlot["status"] }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="available">Sẵn sàng</SelectItem>
                  <SelectItem value="maintenance">Bảo trì</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Huỷ
            </Button>
            <Button onClick={handleSave} disabled={saving || !form.name}>
              {saving ? "Đang lưu..." : "Lưu"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

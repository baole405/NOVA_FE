"use client";

import { Pencil } from "lucide-react";
import { useState } from "react";
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
import type { PoolSlot } from "@/lib/facilities";
import { MOCK_POOL_SLOTS, updatePoolSlot } from "@/lib/facilities";

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
}

type FormState = {
  name: string;
  location: string;
  capacity: string;
  pricePerHour: string;
  openTime: string;
  closeTime: string;
  maxDurationHours: string;
  status: PoolSlot["status"];
};

export function PoolConfig() {
  const [pools, setPools] = useState<PoolSlot[]>([...MOCK_POOL_SLOTS]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingPool, setEditingPool] = useState<PoolSlot | null>(null);
  const [form, setForm] = useState<FormState>({
    name: "",
    location: "",
    capacity: "",
    pricePerHour: "",
    openTime: "08:00",
    closeTime: "22:00",
    maxDurationHours: "4",
    status: "available",
  });
  const [saving, setSaving] = useState(false);

  const openEdit = (pool: PoolSlot) => {
    setEditingPool(pool);
    setForm({
      name: pool.name,
      location: pool.location,
      capacity: String(pool.capacity),
      pricePerHour: String(pool.pricePerHour),
      openTime: pool.openTime,
      closeTime: pool.closeTime,
      maxDurationHours: String(pool.maxDurationHours),
      status: pool.status,
    });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!editingPool) return;
    setSaving(true);
    try {
      const updated = await updatePoolSlot(editingPool.id, {
        name: form.name,
        location: form.location,
        capacity: Number(form.capacity),
        pricePerHour: Number(form.pricePerHour),
        openTime: form.openTime,
        closeTime: form.closeTime,
        maxDurationHours: Number(form.maxDurationHours),
        status: form.status,
      });
      setPools((prev) =>
        prev.map((p) => (p.id === editingPool.id ? updated : p)),
      );
      setDialogOpen(false);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Tổng: <strong className="text-foreground">{pools.length}</strong> hồ bơi
      </p>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tên hồ bơi</TableHead>
              <TableHead>Vị trí</TableHead>
              <TableHead>Sức chứa</TableHead>
              <TableHead>Giá/giờ</TableHead>
              <TableHead>Giờ hoạt động</TableHead>
              <TableHead>Tối đa</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead className="text-right">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pools.map((pool) => (
              <TableRow key={pool.id}>
                <TableCell className="font-medium">{pool.name}</TableCell>
                <TableCell>{pool.location}</TableCell>
                <TableCell>{pool.capacity} người</TableCell>
                <TableCell>{formatCurrency(pool.pricePerHour)}</TableCell>
                <TableCell>
                  {pool.openTime} – {pool.closeTime}
                </TableCell>
                <TableCell>{pool.maxDurationHours}h/lần</TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className={
                      pool.status === "available"
                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400"
                    }
                  >
                    {pool.status === "available" ? "Sẵn sàng" : "Bảo trì"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => openEdit(pool)}
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cập nhật hồ bơi</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-2">
            <div className="space-y-1">
              <Label>Tên hồ bơi</Label>
              <Input
                value={form.name}
                onChange={(e) =>
                  setForm((f) => ({ ...f, name: e.target.value }))
                }
              />
            </div>
            <div className="space-y-1">
              <Label>Vị trí</Label>
              <Input
                value={form.location}
                onChange={(e) =>
                  setForm((f) => ({ ...f, location: e.target.value }))
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
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label>Giờ mở cửa</Label>
                <Input
                  type="time"
                  value={form.openTime}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, openTime: e.target.value }))
                  }
                />
              </div>
              <div className="space-y-1">
                <Label>Giờ đóng cửa</Label>
                <Input
                  type="time"
                  value={form.closeTime}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, closeTime: e.target.value }))
                  }
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label>Tối đa/lần đặt (giờ)</Label>
                <Input
                  type="number"
                  min={1}
                  max={8}
                  value={form.maxDurationHours}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, maxDurationHours: e.target.value }))
                  }
                />
              </div>
              <div className="space-y-1">
                <Label>Trạng thái</Label>
                <Select
                  value={form.status}
                  onValueChange={(v) =>
                    setForm((f) => ({ ...f, status: v as PoolSlot["status"] }))
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

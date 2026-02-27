"use client";

import { Bike, Car, Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Vehicle } from "@/types";
import { DeleteConfirmDialog } from "./delete-confirm-dialog";
import { VehicleDialog } from "./vehicle-dialog";

const typeLabels: Record<Vehicle["type"], string> = {
  car: "Ô tô",
  motorbike: "Xe máy",
  bicycle: "Xe đạp",
};

interface VehicleListProps {
  vehicles?: Vehicle[];
}

export function VehicleList({ vehicles: initialVehicles }: VehicleListProps) {
  const [vehicles, setVehicles] = useState<Vehicle[]>(initialVehicles || []);
  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | undefined>();

  const handleCreate = (data: Omit<Vehicle, "id" | "ownerId">) => {
    const newVehicle: Vehicle = {
      id: `veh_${Date.now()}`,
      ownerId: "user_001",
      ...data,
    };
    setVehicles((prev) => [...prev, newVehicle]);
  };

  const handleEdit = (data: Omit<Vehicle, "id" | "ownerId">) => {
    if (!selectedVehicle) return;
    setVehicles((prev) =>
      prev.map((v) => (v.id === selectedVehicle.id ? { ...v, ...data } : v)),
    );
  };

  const handleDelete = () => {
    if (!selectedVehicle) return;
    setVehicles((prev) => prev.filter((v) => v.id !== selectedVehicle.id));
    setDeleteOpen(false);
    setSelectedVehicle(undefined);
  };

  const getVehicleIcon = (type: Vehicle["type"]) => {
    if (type === "car")
      return <Car className="h-6 w-6 text-muted-foreground" />;
    return <Bike className="h-6 w-6 text-muted-foreground" />;
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="flex items-center gap-2">
            <Car className="h-5 w-5 text-primary" />
            Phương Tiện Đăng Ký
          </CardTitle>
          <CardDescription>Danh sách xe được phép gửi.</CardDescription>
        </div>
        <Button size="sm" onClick={() => setCreateOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Thêm
        </Button>
      </CardHeader>
      <CardContent className="space-y-3">
        {vehicles.length === 0 && (
          <p className="text-center text-muted-foreground py-4">
            Chưa có phương tiện nào được đăng ký.
          </p>
        )}

        {vehicles.map((veh) => (
          <div
            key={veh.id}
            className="flex items-center justify-between p-4 border rounded-lg bg-card hover:bg-accent/30 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center">
                {getVehicleIcon(veh.type)}
              </div>
              <div>
                <p className="font-bold text-lg">{veh.licensePlate}</p>
                <Badge variant="outline" className="capitalize">
                  {typeLabels[veh.type]}
                </Badge>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => {
                  setSelectedVehicle(veh);
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
                  setSelectedVehicle(veh);
                  setDeleteOpen(true);
                }}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}

        <VehicleDialog
          open={createOpen}
          onOpenChange={setCreateOpen}
          onSave={handleCreate}
        />

        <VehicleDialog
          open={editOpen}
          onOpenChange={(open) => {
            setEditOpen(open);
            if (!open) setSelectedVehicle(undefined);
          }}
          vehicle={selectedVehicle}
          onSave={handleEdit}
        />

        <DeleteConfirmDialog
          open={deleteOpen}
          onOpenChange={(open) => {
            setDeleteOpen(open);
            if (!open) setSelectedVehicle(undefined);
          }}
          title="Xóa phương tiện"
          description={`Bạn có chắc muốn xóa xe biển số "${selectedVehicle?.licensePlate}" khỏi danh sách?`}
          onConfirm={handleDelete}
        />
      </CardContent>
    </Card>
  );
}

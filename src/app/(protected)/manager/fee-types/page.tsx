"use client";

import { Loader2, Plus, Tags } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { DeleteFeeTypeDialog } from "@/components/manager/fee-types/delete-fee-type-dialog";
import { FeeTypeDialog } from "@/components/manager/fee-types/fee-type-dialog";
import { FeeTypeTable } from "@/components/manager/fee-types/fee-type-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getFeeTypes } from "@/lib/fee-types";
import type { BackendFeeType } from "@/types/fee-types";

export default function FeeTypesPage() {
  const [feeTypes, setFeeTypes] = useState<BackendFeeType[]>([]);
  const [loading, setLoading] = useState(true);

  // Dialog state
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingFeeType, setEditingFeeType] = useState<BackendFeeType | null>(
    null,
  );

  // Delete dialog state
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deletingFeeType, setDeletingFeeType] = useState<BackendFeeType | null>(
    null,
  );

  const refreshData = useCallback(async () => {
    try {
      const data = await getFeeTypes();
      setFeeTypes(data);
    } catch (error) {
      console.error("Failed to fetch fee types:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  function handleCreate() {
    setEditingFeeType(null);
    setDialogOpen(true);
  }

  function handleEdit(feeType: BackendFeeType) {
    setEditingFeeType(feeType);
    setDialogOpen(true);
  }

  function handleDelete(feeType: BackendFeeType) {
    setDeletingFeeType(feeType);
    setDeleteOpen(true);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Tags className="h-8 w-8 text-primary" />
            Quản lý loại phí
          </h1>
          <p className="text-muted-foreground mt-2">
            Quản lý các loại phí áp dụng cho căn hộ
          </p>
        </div>
        <Button size="lg" className="w-full sm:w-auto" onClick={handleCreate}>
          <Plus className="mr-2 h-4 w-4" />
          Thêm loại phí
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Danh sách loại phí</CardTitle>
        </CardHeader>
        <CardContent>
          <FeeTypeTable
            feeTypes={feeTypes}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </CardContent>
      </Card>

      <FeeTypeDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        feeType={editingFeeType}
        onSuccess={refreshData}
      />

      <DeleteFeeTypeDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        feeType={deletingFeeType}
        onSuccess={refreshData}
      />
    </div>
  );
}

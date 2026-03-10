"use client";

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
} from "@/components/ui/alert-dialog";
import { deleteFeeType } from "@/lib/fee-types";
import type { BackendFeeType } from "@/types/fee-types";

interface DeleteFeeTypeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  feeType: BackendFeeType | null;
  onSuccess: () => void;
}

export function DeleteFeeTypeDialog({
  open,
  onOpenChange,
  feeType,
  onSuccess,
}: DeleteFeeTypeDialogProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleDelete() {
    if (!feeType) return;
    setLoading(true);
    setError(null);

    try {
      await deleteFeeType(feeType.id);
      onSuccess();
      onOpenChange(false);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Đã xảy ra lỗi khi xóa";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Xác nhận xóa loại phí</AlertDialogTitle>
          <AlertDialogDescription>
            Bạn có chắc chắn muốn xóa loại phí &ldquo;{feeType?.name}&rdquo;?
            Hành động này không thể hoàn tác.
          </AlertDialogDescription>
        </AlertDialogHeader>

        {error && <p className="text-sm text-destructive px-1">{error}</p>}

        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Hủy</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={loading}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {loading ? "Đang xóa..." : "Xóa"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

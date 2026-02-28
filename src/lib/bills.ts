// --- Bills API ---

import type {
  BackendBill,
  BackendBillDetail,
  BillsResponse,
  MarkPaidPayload,
  MarkPaidResponse,
} from "@/types/api";
import { fetchApi } from "./api-client";

export async function getBills(params?: {
  status?: "pending" | "paid" | "overdue" | "all";
  limit?: number;
  offset?: number;
  sortBy?: "dueDate" | "amount" | "createdAt";
  sortOrder?: "asc" | "desc";
  dueDateFrom?: string;
  dueDateTo?: string;
}): Promise<BillsResponse> {
  const searchParams = new URLSearchParams();
  if (params?.status) searchParams.set("status", params.status);
  if (params?.limit) searchParams.set("limit", String(params.limit));
  if (params?.offset) searchParams.set("offset", String(params.offset));
  if (params?.sortBy) searchParams.set("sortBy", params.sortBy);
  if (params?.sortOrder) searchParams.set("sortOrder", params.sortOrder);
  if (params?.dueDateFrom) searchParams.set("dueDateFrom", params.dueDateFrom);
  if (params?.dueDateTo) searchParams.set("dueDateTo", params.dueDateTo);

  const qs = searchParams.toString();
  return fetchApi<BillsResponse>(`/bills${qs ? `?${qs}` : ""}`);
}

export async function getBillById(id: number): Promise<BackendBillDetail> {
  return fetchApi<BackendBillDetail>(`/bills/${id}`);
}

export async function markBillAsPaid(
  id: number,
  payload: MarkPaidPayload,
): Promise<MarkPaidResponse> {
  return fetchApi<MarkPaidResponse>(`/bills/${id}/mark-paid`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

// Re-export types for convenience
export type { BackendBill, BackendBillDetail, BillsResponse };

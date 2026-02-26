// --- Bills API ---

import {
  BillsResponse,
  BackendBillDetail,
  MarkPaidPayload,
  MarkPaidResponse,
  BackendBill,
} from "@/types/api";
import { fetchApi } from "./api-client";

export async function getBills(params?: {
  status?: "pending" | "paid" | "overdue" | "all";
  limit?: number;
  offset?: number;
}): Promise<BillsResponse> {
  const searchParams = new URLSearchParams();
  if (params?.status) searchParams.set("status", params.status);
  if (params?.limit) searchParams.set("limit", String(params.limit));
  if (params?.offset) searchParams.set("offset", String(params.offset));

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

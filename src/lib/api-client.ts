import type {
  BackendBill,
  BackendBillDetail,
  BillsResponse,
  MarkPaidPayload,
  MarkPaidResponse,
} from "@/types/api";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

export async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers as Record<string, string>),
  };

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `API Error: ${response.statusText}`);
  }

  return response.json();
}

// --- Bills API ---

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

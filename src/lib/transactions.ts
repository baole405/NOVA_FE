// Transactions API

import type { TransactionsResponse } from "@/types/api";
import { fetchApi } from "./api-client";

export async function getTransactions(params?: {
  limit?: number;
  offset?: number;
}): Promise<TransactionsResponse> {
  const searchParams = new URLSearchParams();
  if (params?.limit) searchParams.set("limit", String(params.limit));
  if (params?.offset) searchParams.set("offset", String(params.offset));

  const qs = searchParams.toString();
  return fetchApi<TransactionsResponse>(`/transactions${qs ? `?${qs}` : ""}`);
}

export type { BackendTransaction, TransactionsResponse } from "@/types/api";

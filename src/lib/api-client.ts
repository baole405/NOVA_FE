import { authClient } from "@/lib/auth/client";
import type { Bill, BillStatus, FeeType } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const { data } = await authClient.getSession();
  const token = data?.session?.token; // Access token from session object

  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
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

// Backend Response Types
export interface BackendFeeType {
  id: number;
  name: string;
}

export interface BackendBill {
  id: number;
  title: string;
  amount: string; // Numeric string from DB
  dueDate: string;
  period: string;
  status: "pending" | "paid" | "overdue" | "cancelled";
  feeType: BackendFeeType;
}

// Mapper Function
export function mapBillFromApi(bill: BackendBill): Bill {
  return {
    id: bill.id.toString(),
    title: bill.title,
    amount: Number(bill.amount),
    dueDate: bill.dueDate,
    period: bill.period,
    status: bill.status as BillStatus, // Assuming API returns compatible status
    feeType: bill.feeType.name.toLowerCase() as FeeType, // Warning: naive mapping
    description: "",
  };
}

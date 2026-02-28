// Backend DTOs for bills API

export interface BackendBill {
  id: number;
  title: string;
  amount: string;
  dueDate: string;
  period: string;
  status: "pending" | "paid" | "overdue" | "cancelled";
  createdAt: string;
  paidAt: string | null;
}

export interface BackendBillItem {
  id: number;
  title: string;
  usage: string | null;
  unitPrice: string | null;
  measureUnit: string | null;
  amount: string;
  feeType: { id: number; name: string } | null;
}

export interface BackendBillDetail extends BackendBill {
  apartment: {
    unitNumber: string;
    floor: number;
    block: string;
  } | null;
  items: BackendBillItem[];
}

export interface BillsResponse {
  data: BackendBill[];
  total: number;
  page: number;
}

export interface MarkPaidPayload {
  paymentMethod: string;
  transactionRef?: string;
  notes?: string;
}

export interface MarkPaidResponse {
  message: string;
  bill: { id: number; status: string; paidAt: string };
  transaction: { id: number; amount: string; method: string };
}

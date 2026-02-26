// Backend DTOs for bills API

export interface BackendFeeType {
  id: number;
  name: string;
}

export interface BackendFeeTypeDetail extends BackendFeeType {
  description: string | null;
}

export interface BackendBill {
  id: number;
  title: string;
  amount: string;
  dueDate: string;
  period: string;
  status: "pending" | "paid" | "overdue" | "cancelled";
  createdAt: string;
  paidAt: string | null;
  feeType: BackendFeeType | null;
}

export interface BackendBillDetail extends Omit<BackendBill, "feeType"> {
  feeType: BackendFeeTypeDetail | null;
  apartment: {
    unitNumber: string;
    floor: number;
    block: string;
  } | null;
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

// Transaction-related types

// Backend API response types (match BE TransactionsService response shape)
export interface BackendTransaction {
  id: number;
  billTitle: string | null;
  amount: string; // decimal as string from BE
  paymentDate: string; // ISO timestamp
  paymentMethod: string | null;
  transactionRef: string | null;
  notes?: string | null;
}

export interface TransactionsResponse {
  data: BackendTransaction[];
  total: number;
}

export interface TransactionsByMonthResponse {
  data: BackendTransaction[];
  month: string;
}

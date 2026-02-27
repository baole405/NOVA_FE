// Backend DTOs for transactions API

export interface BackendTransaction {
  id: number;
  amount: string; // decimal string like "1500000.00"
  method: string; // "bank_transfer" | "cash" | "e_wallet" | "credit_card"
  transactionRef: string | null; // transaction code
  notes: string | null;
  createdAt: string; // ISO date
  bill: {
    id: number;
    title: string;
    period: string;
  };
}

export interface TransactionsResponse {
  data: BackendTransaction[];
  total: number;
  page: number;
}

export interface StatsOverview {
  totalDue: number;
  pendingCount: number;
  overdueCount: number;
  paidThisMonth: number;
  paidThisMonthCount: number;
  totalResidents: number;
  totalApartments: number;
}

export interface RevenueMonth {
  month: string;
  total: number;
  count: number;
}

export interface StatsRevenue {
  months: RevenueMonth[];
}

export interface StatsActivity {
  recentTransactions: {
    id: number;
    billTitle: string | null;
    amount: string;
    paymentDate: string;
    paymentMethod: string | null;
    transactionRef: string | null;
  }[];
  recentBills: {
    id: number;
    title: string;
    amount: string;
    dueDate: string;
    status: string;
    createdAt: string;
  }[];
}

// Stats API response types

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
  month: string; // "YYYY-MM"
  total: number;
  count: number;
}

export interface StatsRevenue {
  months: RevenueMonth[];
}

export type RevenuePeriod =
  | "this-month"
  | "last-month"
  | "3-months"
  | "6-months"
  | "year";

export interface RecentTransaction {
  id: number;
  billTitle: string;
  amount: string;
  paymentDate: string;
  paymentMethod: string;
  transactionRef: string;
}

export interface RecentBill {
  id: number;
  title: string;
  amount: string;
  dueDate: string;
  status: string;
  createdAt: string;
}

export interface RecentFeedback {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  user: {
    fullName: string;
  };
}

export interface StatsActivity {
  recentTransactions: RecentTransaction[];
  recentBills: RecentBill[];
  recentFeedbacks?: RecentFeedback[];
}

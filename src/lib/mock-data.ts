// src/lib/mock-data.ts
import type { Apartment, Bill, Transaction, UserProfile } from "@/types";

// 1. Mock Apartment
export const mockApartment: Apartment = {
  id: "apt_f04_2304",
  unitNumber: "2304",
  floor: 23,
  block: "F04",
  area: 75.5,
};

// 2. Mock User
export const mockUser: UserProfile = {
  id: "user_001",
  name: "Nguyen Minh Nhat",
  email: "nhatnm@example.com",
  phone: "0909123456",
  avatarUrl: "https://github.com/shadcn.png",
  role: "resident",
  apartment: mockApartment,
};

// 3. Mock Bills (English Content)
export const mockBills: Bill[] = [
  // --- Case 1: Overdue ---
  {
    id: "bill_001",
    title: "Electricity Bill - Dec 2025",
    amount: 1250000,
    dueDate: "2026-01-10", // Overdue
    period: "12/2025",
    status: "overdue",
    feeType: "electricity",
    description: "Old index: 1200, New index: 1550",
  },

  // --- Case 2: Pending ---
  {
    id: "bill_002",
    title: "Management Fee - Jan 2026",
    amount: 750000,
    dueDate: "2026-01-25",
    period: "01/2026",
    status: "pending",
    feeType: "management",
    description: "Unit price: 10,000 VND/m2",
  },
  {
    id: "bill_003",
    title: "Parking Fee - Jan 2026",
    amount: 120000,
    dueDate: "2026-01-25",
    period: "01/2026",
    status: "pending",
    feeType: "parking",
    description: "Motorbike (Honda AirBlade)",
  },
  {
    id: "bill_004",
    title: "Water Bill - Jan 2026",
    amount: 85000,
    dueDate: "2026-01-30",
    period: "01/2026",
    status: "pending",
    feeType: "water",
    description: "Consumption: 15m3",
  },

  // --- Case 3: Paid ---
  {
    id: "bill_005",
    title: "Management Fee - Dec 2025",
    amount: 750000,
    dueDate: "2025-12-25",
    period: "12/2025",
    status: "paid",
    feeType: "management",
  },
];

// 4. Mock Transactions
export const mockTransactions: Transaction[] = [
  {
    id: "trans_001",
    billId: "bill_005",
    billTitle: "Management Fee - Dec 2025",
    amount: 750000,
    paidDate: "2025-12-20T10:30:00Z",
    method: "bank_transfer",
    transactionCode: "VCB.123456789",
  },
];

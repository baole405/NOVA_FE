// src/lib/mock-data.ts
import type { Apartment, Bill, Transaction, UserProfile } from "@/types";

// 1. Mock Căn hộ
export const mockApartment: Apartment = {
  id: "apt_f04_2304",
  unitNumber: "2304",
  floor: 23,
  block: "F04",
  area: 75.5,
};

// 2. Mock User (Cư dân)
export const mockUser: UserProfile = {
  id: "user_001",
  name: "Nguyễn Minh Nhật",
  email: "nhatnm@example.com",
  phone: "0909123456",
  avatarUrl: "https://github.com/shadcn.png", // Avatar placeholder
  role: "resident",
  apartment: mockApartment,
};

// 3. Mock Hóa đơn (Bills)
export const mockBills: Bill[] = [
  // --- Case 1: Quá hạn (Overdue) ---
  {
    id: "bill_001",
    title: "Tiền điện tháng 12/2025",
    amount: 1250000,
    dueDate: "2026-01-10", // Đã qua hạn (giả sử hôm nay là 23/01)
    period: "12/2025",
    status: "overdue",
    feeType: "electricity",
    description: "Chỉ số cũ: 1200, Chỉ số mới: 1550",
  },

  // --- Case 2: Sắp đến hạn (Pending) ---
  {
    id: "bill_002",
    title: "Phí quản lý tháng 01/2026",
    amount: 750000,
    dueDate: "2026-01-25", // Sắp đến hạn
    period: "01/2026",
    status: "pending",
    feeType: "management",
    description: "Đơn giá: 10.000đ/m2",
  },
  {
    id: "bill_003",
    title: "Phí gửi xe tháng 01/2026",
    amount: 120000,
    dueDate: "2026-01-25",
    period: "01/2026",
    status: "pending",
    feeType: "parking",
    description: "1 xe máy (Honda AirBlade)",
  },
  {
    id: "bill_004",
    title: "Tiền nước tháng 01/2026",
    amount: 85000,
    dueDate: "2026-01-30",
    period: "01/2026",
    status: "pending",
    feeType: "water",
    description: "Khối lượng tiêu thụ: 15m3",
  },

  // --- Case 3: Đã thanh toán (Paid) - Để hiện trong lịch sử ---
  {
    id: "bill_005",
    title: "Phí quản lý tháng 12/2025",
    amount: 750000,
    dueDate: "2025-12-25",
    period: "12/2025",
    status: "paid",
    feeType: "management",
  },
  {
    id: "bill_006",
    title: "Phí gửi xe tháng 12/2025",
    amount: 120000,
    dueDate: "2025-12-25",
    period: "12/2025",
    status: "paid",
    feeType: "parking",
  },
];

// 4. Mock Lịch sử giao dịch (Transactions)
export const mockTransactions: Transaction[] = [
  {
    id: "trans_001",
    billId: "bill_005",
    billTitle: "Phí quản lý tháng 12/2025",
    amount: 750000,
    paidDate: "2025-12-20T10:30:00Z",
    method: "bank_transfer",
    transactionCode: "VCB.123456789",
  },
  {
    id: "trans_002",
    billId: "bill_006",
    billTitle: "Phí gửi xe tháng 12/2025",
    amount: 120000,
    paidDate: "2025-12-21T15:45:00Z",
    method: "e_wallet",
    transactionCode: "MOMO.987654321",
  },
];

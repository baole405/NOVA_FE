// src/types/index.ts

export type BillStatus = "pending" | "paid" | "overdue" | "cancelled";
export type FeeType =
  | "management"
  | "parking"
  | "water"
  | "electricity"
  | "internet"
  | "service";
export type PaymentMethod =
  | "bank_transfer"
  | "cash"
  | "e_wallet"
  | "credit_card";

export interface Apartment {
  id: string;
  unitNumber: string; // Số căn hộ (vd: A101)
  floor: number;
  block: string; // Tòa nhà (vd: Block A)
  area: number; // Diện tích m2
}

export interface UserProfile {
  id: string;
  name: string;
  idNumber: string; // Số CMND/CCCD
  dob?: string;
  email: string;
  phone?: string;
  avatarUrl?: string;
  role: "resident" | "owner" | "admin";
  apartment?: Apartment;
  vehicles?: Vehicle[];
  familyMembers?: FamilyMember[];
}

export interface Bill {
  id: string;
  title: string; // Tiêu đề hóa đơn (vd: Phí quản lý T1/2026)
  amount: number; // Số tiền (VND)
  dueDate: string; // Hạn đóng (ISO Date: YYYY-MM-DD)
  period: string; // Kỳ thanh toán (MM/YYYY)
  status: BillStatus;
  feeType: FeeType; // Loại phí để hiển thị icon tương ứng
  description?: string;
}

export interface Transaction {
  id: string;
  billId: string;
  billTitle: string; // Lưu tiêu đề bill để hiển thị lịch sử nhanh
  amount: number;
  paidDate: string; // Ngày thanh toán thực tế (ISO Date)
  method: PaymentMethod;
  transactionCode: string; // Mã giao dịch ngân hàng
}

export interface Vehicle {
  id: string;
  imageUrl?: string;
  type: "car" | "motorbike" | "bicycle";
  licensePlate: string;
  ownerId: string; // User ID
}

export interface FamilyMember {
  id: string;
  name: string;
  relation: string; // Mối quan hệ (vd: Vợ, Con)
  dob?: string; // Ngày sinh (ISO Date)
  userId: string; // User ID
}

export interface Notification {
  id: number;
  title: string;
  desc: string;
  time: string; // Thời gian hiển thị (vd: "2 giờ trước")
  unread: boolean;
}

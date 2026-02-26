// Bills-related types

// Re-export backend DTOs
export * from "./dto/bills";

// Frontend model types

export type BillStatus = "pending" | "paid" | "overdue" | "cancelled";

export type FeeType =
  | "management"
  | "parking"
  | "water"
  | "electricity"
  | "internet"
  | "service";

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

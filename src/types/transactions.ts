// Transaction-related types

export type PaymentMethod =
  | "bank_transfer"
  | "cash"
  | "e_wallet"
  | "credit_card";

export interface Transaction {
  id: string;
  billId: string;
  billTitle: string; // Lưu tiêu đề bill để hiển thị lịch sử nhanh
  amount: number;
  paidDate: string; // Ngày thanh toán thực tế (ISO Date)
  method: PaymentMethod;
  transactionCode: string; // Mã giao dịch ngân hàng
}

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

// Complaint / Maintenance Request
export type ComplaintCategory =
  | "plumbing"
  | "electrical"
  | "elevator"
  | "other";
export type ComplaintUrgency = "low" | "medium" | "high";
export type ComplaintStatus = "pending" | "in_progress" | "resolved";

export interface Complaint {
  id: string;
  title: string;
  category: ComplaintCategory;
  description: string;
  urgency: ComplaintUrgency;
  status: ComplaintStatus;
  imageUrl?: string;
  createdAt: string; // ISO date
  updatedAt?: string;
  residentId: string;
  residentName: string;
  apartmentUnit: string;
}

// Announcement
export type AnnouncementCategory =
  | "maintenance"
  | "event"
  | "policy"
  | "emergency"
  | "general";
export type AnnouncementPriority = "normal" | "important" | "urgent";

export interface Announcement {
  id: string;
  title: string;
  content: string; // Markdown content
  author: string;
  category: AnnouncementCategory;
  priority: AnnouncementPriority;
  createdAt: string; // ISO date
  imageUrl?: string;
  pinned?: boolean;
}

// Manager Bill (extends Bill with apartment info)
export interface ManagerBill extends Bill {
  apartmentUnit: string;
  apartmentBlock: string;
  residentName: string;
}

// Facility Management
export type ParkingSlotStatus = "available" | "occupied" | "maintenance";

export interface ParkingSlotConfig {
  id: string;
  slotNumber: string;
  floor: string; // e.g., "B1", "B2"
  type: "car" | "motorbike" | "bicycle";
  status: ParkingSlotStatus;
  monthlyPrice: number;
  assignedTo?: string; // apartment unit
}

export interface BBQAreaConfig {
  id: string;
  name: string; // e.g., "Khu A", "Khu B"
  capacity: number;
  pricePerHour: number;
  status: "available" | "maintenance";
  openTime: string; // "08:00"
  closeTime: string; // "22:00"
}

export interface PoolScheduleConfig {
  id: string;
  timeSlot: string; // "06:00-08:00"
  maxCapacity: number;
  currentBookings: number;
  pricePerSession: number;
  dayOfWeek: "all" | "weekday" | "weekend";
  status: "active" | "inactive";
}

// Community
export type CommunityCategory = "general" | "buy_sell" | "qa" | "events";

export interface CommunityPost {
  id: string;
  title: string;
  content: string;
  category: CommunityCategory;
  authorId: string;
  authorName: string;
  authorAvatarUrl?: string;
  apartmentUnit: string;
  createdAt: string;
  likes: number;
  commentCount: number;
}

// Manager Apartment
export type ApartmentStatus = "occupied" | "vacant" | "maintenance";

export interface ManagerApartment extends Apartment {
  status: ApartmentStatus;
  residentName?: string;
  residentId?: string;
  monthlyFee: number;
}

// Manager Complaint
export interface ComplaintResponse {
  id: string;
  complaintId: string;
  content: string;
  author: string;
  createdAt: string;
}

export interface ManagerComplaint extends Complaint {
  responses?: ComplaintResponse[];
}

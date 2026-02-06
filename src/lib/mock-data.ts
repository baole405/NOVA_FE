import type {
  Apartment,
  Bill,
  FamilyMember,
  Transaction,
  UserProfile,
  Vehicle,
} from "@/types";

export const mockApartment: Apartment = {
  id: "apt_f04_2304",
  unitNumber: "2304",
  floor: 23,
  block: "F04",
  area: 75.5,
};

export const mockFamilyMembers: FamilyMember[] = [
  {
    id: "fm_001",
    name: "Nguyễn Thị Lan",
    relation: "Vợ",
    dob: "1992-08-20",
    userId: "user_001",
  },
  {
    id: "fm_002",
    name: "Nguyễn Văn An",
    relation: "Con",
    dob: "2015-03-10",
    userId: "user_001",
  },
];

export const mockVehicles: Vehicle[] = [
  {
    id: "veh_001",
    imageUrl: "https://example.com/car1.png",
    type: "car",
    licensePlate: "30A-12345",
    ownerId: "user_001",
  },
  {
    id: "veh_002",
    imageUrl: "https://example.com/motorbike1.png",
    type: "motorbike",
    licensePlate: "29B-67890",
    ownerId: "user_001",
  },
];

export const mockUser: UserProfile = {
  id: "user_001",
  name: "Nguyễn Minh Nhật",
  idNumber: "012345678901",
  dob: "1990-05-15",
  email: "nhatnm@example.com",
  phone: "0909123456",
  avatarUrl: "https://github.com/shadcn.png",
  role: "resident",
  apartment: mockApartment,
  familyMembers: mockFamilyMembers,
  vehicles: mockVehicles,
};

export const mockBills: Bill[] = [
  {
    id: "bill_001",
    title: "Tiền điện - T12/2025",
    amount: 1250000,
    dueDate: "2026-01-10",
    period: "12/2025",
    status: "overdue",
    feeType: "electricity",
    description: "Chỉ số cũ: 1200, Chỉ số mới: 1550",
  },

  {
    id: "bill_002",
    title: "Phí quản lý - T01/2026",
    amount: 750000,
    dueDate: "2026-01-25",
    period: "01/2026",
    status: "pending",
    feeType: "management",
    description: "Đơn giá: 10,000 VNĐ/m2",
  },
  {
    id: "bill_003",
    title: "Phí gửi xe - T01/2026",
    amount: 120000,
    dueDate: "2026-01-25",
    period: "01/2026",
    status: "pending",
    feeType: "parking",
    description: "Xe máy (Honda AirBlade)",
  },
  {
    id: "bill_004",
    title: "Tiền nước - T01/2026",
    amount: 85000,
    dueDate: "2026-01-30",
    period: "01/2026",
    status: "pending",
    feeType: "water",
    description: "Tiêu thụ: 15m3",
  },

  {
    id: "bill_005",
    title: "Phí quản lý - T12/2025",
    amount: 750000,
    dueDate: "2025-12-25",
    period: "12/2025",
    status: "paid",
    feeType: "management",
  },
];

export const mockTransactions: Transaction[] = [
  {
    id: "trans_001",
    billId: "bill_005",
    billTitle: "Phí quản lý - T12/2025",
    amount: 750000,
    paidDate: "2025-12-20T10:30:00Z",
    method: "bank_transfer",
    transactionCode: "VCB.123456789",
  },
];

export const mockNotifications = [
  {
    id: 1,
    title: "Tiền điện - T12",
    desc: "Sắp đến hạn thanh toán",
    time: "2 giờ trước",
    unread: true,
  },
  {
    id: 2,
    title: "Phí quản lý",
    desc: "Thanh toán thành công",
    time: "1 ngày trước",
    unread: false,
  },
  {
    id: 3,
    title: "Thông báo bảo trì",
    desc: "Bảo trì thang máy B1 ngày 25/01",
    time: "2 ngày trước",
    unread: true,
  },
  {
    id: 4,
    title: "Tiền nước",
    desc: "Hóa đơn mới đã được cập nhật",
    time: "3 ngày trước",
    unread: false,
  },
  {
    id: 5,
    title: "Họp cư dân",
    desc: "Nhắc nhở họp thường niên",
    time: "5 ngày trước",
    unread: false,
  },
];

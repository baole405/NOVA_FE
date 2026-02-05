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
    name: "Nguyen Thi Lan",
    relation: "Spouse",
    dob: "1992-08-20",
    userId: "user_001",
  },
  {
    id: "fm_002",
    name: "Nguyen Van An",
    relation: "Child",
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
  name: "Nguyen Minh Nhat",
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
    title: "Electricity Bill - Dec 2025",
    amount: 1250000,
    dueDate: "2026-01-10", // Overdue
    period: "12/2025",
    status: "overdue",
    feeType: "electricity",
    description: "Old index: 1200, New index: 1550",
  },

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

export const mockNotifications = [
  {
    id: 1,
    title: "Electricity Bill - Dec",
    desc: "Payment due soon",
    time: "2 hours ago",
    unread: true,
  },
  {
    id: 2,
    title: "Management Fee",
    desc: "Payment successful",
    time: "1 day ago",
    unread: false,
  },
  {
    id: 3,
    title: "Maintenance Notice",
    desc: "Elevator B1 maintenance on Jan 25",
    time: "2 days ago",
    unread: true,
  },
  {
    id: 4,
    title: "Water Bill",
    desc: "New bill has been updated",
    time: "3 days ago",
    unread: false,
  },
  {
    id: 5,
    title: "Resident Meeting",
    desc: "Annual meeting reminder",
    time: "5 days ago",
    unread: false,
  },
];

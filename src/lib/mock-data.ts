import type {
  Announcement,
  Apartment,
  BBQAreaConfig,
  Bill,
  Complaint,
  FamilyMember,
  ManagerBill,
  Notification,
  ParkingSlotConfig,
  PoolScheduleConfig,
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

export const mockNotifications: Notification[] = [
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
  {
    id: 6,
    title: "Đặt chỗ BBQ",
    desc: "Đặt khu BBQ thành công ngày 28/01",
    time: "6 ngày trước",
    unread: false,
  },
  {
    id: 7,
    title: "Phí gửi xe",
    desc: "Hóa đơn gửi xe tháng 02 đã có",
    time: "1 tuần trước",
    unread: true,
  },
];

export const mockComplaints: Complaint[] = [
  {
    id: "cpl_001",
    title: "Thang máy tòa B thường xuyên hỏng",
    category: "elevator",
    description:
      "Thang máy số 2 tòa B hay bị kẹt ở tầng 15, đã xảy ra 3 lần trong tuần này. Cần kiểm tra và sửa chữa gấp.",
    urgency: "high",
    status: "in_progress",
    createdAt: "2026-02-20T08:30:00Z",
    updatedAt: "2026-02-21T10:00:00Z",
    residentId: "user_001",
    residentName: "Nguyễn Minh Nhật",
    apartmentUnit: "2304",
  },
  {
    id: "cpl_002",
    title: "Ống nước rò rỉ trong nhà vệ sinh",
    category: "plumbing",
    description:
      "Ống nước dưới bồn rửa tay bị rò rỉ, nước chảy ra sàn nhà vệ sinh. Đã dùng băng keo quấn tạm.",
    urgency: "medium",
    status: "pending",
    createdAt: "2026-02-22T14:00:00Z",
    residentId: "user_001",
    residentName: "Nguyễn Minh Nhật",
    apartmentUnit: "2304",
  },
  {
    id: "cpl_003",
    title: "Đèn hành lang tầng 23 bị cháy",
    category: "electrical",
    description:
      "3 bóng đèn LED hành lang tầng 23 bị cháy, khu vực khá tối vào buổi tối. Đề nghị thay mới.",
    urgency: "low",
    status: "resolved",
    createdAt: "2026-02-15T09:00:00Z",
    updatedAt: "2026-02-17T16:00:00Z",
    residentId: "user_001",
    residentName: "Nguyễn Minh Nhật",
    apartmentUnit: "2304",
  },
  {
    id: "cpl_004",
    title: "Máy lạnh phòng khách không mát",
    category: "other",
    description:
      "Máy lạnh chạy nhưng không mát, có tiếng ồn lạ. Đã vệ sinh filter nhưng không cải thiện.",
    urgency: "medium",
    status: "pending",
    createdAt: "2026-02-23T11:30:00Z",
    residentId: "user_001",
    residentName: "Nguyễn Minh Nhật",
    apartmentUnit: "2304",
  },
  {
    id: "cpl_005",
    title: "Cửa sổ phòng ngủ không đóng kín",
    category: "other",
    description:
      "Cửa sổ phòng ngủ chính không đóng kín được, gió lùa vào khi mưa. Gioăng cao su có vẻ bị hỏng.",
    urgency: "low",
    status: "in_progress",
    createdAt: "2026-02-18T07:00:00Z",
    updatedAt: "2026-02-20T09:00:00Z",
    residentId: "user_001",
    residentName: "Nguyễn Minh Nhật",
    apartmentUnit: "2304",
  },
];

export const mockAnnouncements: Announcement[] = [
  {
    id: "ann_001",
    title: "Lịch bảo trì thang máy tháng 03/2026",
    content: `## Thông báo bảo trì thang máy định kỳ

Kính gửi quý cư dân,

Ban quản lý thông báo lịch bảo trì thang máy định kỳ tháng 03/2026:

- **Tòa A**: Ngày 05/03 (Thứ Năm), 8:00 - 12:00
- **Tòa B**: Ngày 06/03 (Thứ Sáu), 8:00 - 12:00
- **Tòa C**: Ngày 07/03 (Thứ Bảy), 8:00 - 12:00

Trong thời gian bảo trì, thang máy sẽ **tạm ngưng hoạt động**. Quý cư dân vui lòng sử dụng cầu thang bộ.

Xin cảm ơn sự hợp tác của quý cư dân!`,
    author: "Ban Quản Lý",
    category: "maintenance",
    priority: "important",
    createdAt: "2026-02-24T08:00:00Z",
    pinned: true,
  },
  {
    id: "ann_002",
    title: "Hội chợ Xuân 2026 tại sảnh tòa nhà",
    content: `## Hội chợ Xuân NOVA 2026

Ban quản lý trân trọng kính mời quý cư dân tham gia **Hội chợ Xuân NOVA 2026**!

### Thời gian
- Ngày: **08/03/2026 - 09/03/2026**
- Giờ: 9:00 - 21:00

### Địa điểm
- Sảnh chính tòa A & khu vực sân vườn

### Hoạt động
1. Gian hàng ẩm thực đặc sắc
2. Trò chơi dân gian cho trẻ em
3. Biểu diễn văn nghệ
4. Bốc thăm trúng thưởng (giải nhất: TV 55 inch)

**Đăng ký gian hàng**: Liên hệ văn phòng BQL trước ngày 01/03.`,
    author: "Ban Quản Lý",
    category: "event",
    priority: "normal",
    createdAt: "2026-02-22T10:00:00Z",
    pinned: false,
  },
  {
    id: "ann_003",
    title: "Quy định mới về giờ giữ xe",
    content: `## Cập nhật quy định giờ gửi xe

Kính gửi quý cư dân,

Từ ngày **01/03/2026**, bãi xe tầng hầm sẽ áp dụng quy định mới:

### Giờ hoạt động
- **Xe máy**: 24/7
- **Ô tô**: 5:00 - 23:00 (ra vào)
- **Xe đạp**: 24/7

### Lưu ý
- Xe ô tô **không được ra vào** từ 23:00 - 5:00 (trừ trường hợp khẩn cấp)
- Phí gửi xe qua đêm cho khách: 50.000 VNĐ/đêm
- Mỗi căn hộ tối đa 1 ô tô + 2 xe máy

Mọi thắc mắc xin liên hệ hotline: **1900-NOVA**`,
    author: "Ban Quản Lý",
    category: "policy",
    priority: "important",
    createdAt: "2026-02-20T14:00:00Z",
    pinned: true,
  },
  {
    id: "ann_004",
    title: "Thông báo khẩn: Sửa chữa đường ống nước tòa C",
    content: `## Thông báo khẩn

Do sự cố vỡ đường ống nước chính tòa C, Ban quản lý thông báo:

- **Thời gian cắt nước**: 14:00 - 18:00 ngày 25/02/2026
- **Ảnh hưởng**: Toàn bộ căn hộ tòa C (tầng 1-30)

Quý cư dân vui lòng trữ nước trước thời gian trên.

Chúng tôi xin lỗi vì sự bất tiện này!`,
    author: "Ban Quản Lý",
    category: "emergency",
    priority: "urgent",
    createdAt: "2026-02-25T06:00:00Z",
    pinned: false,
  },
  {
    id: "ann_005",
    title: "Kết quả bầu Ban đại diện cư dân nhiệm kỳ 2026-2028",
    content: `## Kết quả bầu cử Ban đại diện cư dân

Sau cuộc họp đại hội cư dân ngày 15/02/2026, Ban đại diện cư dân nhiệm kỳ 2026-2028 gồm:

1. **Trưởng ban**: Ông Trần Văn Hùng (Tòa A - 1205)
2. **Phó ban**: Bà Lê Thị Mai (Tòa B - 0804)
3. **Thư ký**: Ông Phạm Đức Anh (Tòa C - 1502)

Chúc mừng Ban đại diện mới! Mọi ý kiến đóng góp xin gửi về email: **bdt@nova.vn**`,
    author: "Ban Quản Lý",
    category: "general",
    priority: "normal",
    createdAt: "2026-02-16T09:00:00Z",
    pinned: false,
  },
];

export const mockAllApartments = [
  { id: "apt_001", unitNumber: "0101", block: "A" },
  { id: "apt_002", unitNumber: "0205", block: "A" },
  { id: "apt_003", unitNumber: "0308", block: "A" },
  { id: "apt_004", unitNumber: "0502", block: "B" },
  { id: "apt_005", unitNumber: "0804", block: "B" },
  { id: "apt_006", unitNumber: "1205", block: "A" },
  { id: "apt_007", unitNumber: "1502", block: "C" },
  { id: "apt_008", unitNumber: "2001", block: "B" },
  { id: "apt_009", unitNumber: "2304", block: "F04" },
  { id: "apt_010", unitNumber: "2510", block: "C" },
];

export const mockManagerBills: ManagerBill[] = [
  {
    id: "mbill_001",
    title: "Tiền điện - T01/2026",
    amount: 1450000,
    dueDate: "2026-02-10",
    period: "01/2026",
    status: "overdue",
    feeType: "electricity",
    apartmentUnit: "0101",
    apartmentBlock: "A",
    residentName: "Trần Văn Hùng",
  },
  {
    id: "mbill_002",
    title: "Phí quản lý - T02/2026",
    amount: 750000,
    dueDate: "2026-02-25",
    period: "02/2026",
    status: "pending",
    feeType: "management",
    apartmentUnit: "0205",
    apartmentBlock: "A",
    residentName: "Nguyễn Thị Hoa",
  },
  {
    id: "mbill_003",
    title: "Phí gửi xe - T02/2026",
    amount: 350000,
    dueDate: "2026-02-25",
    period: "02/2026",
    status: "paid",
    feeType: "parking",
    apartmentUnit: "0308",
    apartmentBlock: "A",
    residentName: "Lê Đức Minh",
  },
  {
    id: "mbill_004",
    title: "Tiền nước - T01/2026",
    amount: 120000,
    dueDate: "2026-02-10",
    period: "01/2026",
    status: "paid",
    feeType: "water",
    apartmentUnit: "0502",
    apartmentBlock: "B",
    residentName: "Phạm Thị Lan",
  },
  {
    id: "mbill_005",
    title: "Tiền điện - T01/2026",
    amount: 980000,
    dueDate: "2026-02-10",
    period: "01/2026",
    status: "overdue",
    feeType: "electricity",
    apartmentUnit: "0804",
    apartmentBlock: "B",
    residentName: "Lê Thị Mai",
  },
  {
    id: "mbill_006",
    title: "Phí quản lý - T02/2026",
    amount: 900000,
    dueDate: "2026-02-25",
    period: "02/2026",
    status: "pending",
    feeType: "management",
    apartmentUnit: "1205",
    apartmentBlock: "A",
    residentName: "Trần Văn Hùng",
  },
  {
    id: "mbill_007",
    title: "Phí internet - T02/2026",
    amount: 200000,
    dueDate: "2026-02-28",
    period: "02/2026",
    status: "pending",
    feeType: "internet",
    apartmentUnit: "1502",
    apartmentBlock: "C",
    residentName: "Phạm Đức Anh",
  },
  {
    id: "mbill_008",
    title: "Tiền nước - T01/2026",
    amount: 95000,
    dueDate: "2026-02-10",
    period: "01/2026",
    status: "paid",
    feeType: "water",
    apartmentUnit: "2001",
    apartmentBlock: "B",
    residentName: "Hoàng Minh Tuấn",
  },
  {
    id: "mbill_009",
    title: "Phí gửi xe - T02/2026",
    amount: 120000,
    dueDate: "2026-02-25",
    period: "02/2026",
    status: "pending",
    feeType: "parking",
    apartmentUnit: "2304",
    apartmentBlock: "F04",
    residentName: "Nguyễn Minh Nhật",
  },
  {
    id: "mbill_010",
    title: "Phí dịch vụ - T02/2026",
    amount: 500000,
    dueDate: "2026-02-28",
    period: "02/2026",
    status: "pending",
    feeType: "service",
    apartmentUnit: "2510",
    apartmentBlock: "C",
    residentName: "Vũ Thị Ngọc",
  },
  {
    id: "mbill_011",
    title: "Tiền điện - T01/2026",
    amount: 2100000,
    dueDate: "2026-02-10",
    period: "01/2026",
    status: "overdue",
    feeType: "electricity",
    apartmentUnit: "2510",
    apartmentBlock: "C",
    residentName: "Vũ Thị Ngọc",
  },
];

export const mockParkingSlots: ParkingSlotConfig[] = [
  { id: "ps_001", slotNumber: "A01", floor: "B1", type: "car", status: "occupied", monthlyPrice: 1200000, assignedTo: "0101" },
  { id: "ps_002", slotNumber: "A02", floor: "B1", type: "car", status: "available", monthlyPrice: 1200000 },
  { id: "ps_003", slotNumber: "A03", floor: "B1", type: "car", status: "occupied", monthlyPrice: 1200000, assignedTo: "0804" },
  { id: "ps_004", slotNumber: "A04", floor: "B1", type: "car", status: "maintenance", monthlyPrice: 1200000 },
  { id: "ps_005", slotNumber: "B01", floor: "B1", type: "motorbike", status: "occupied", monthlyPrice: 120000, assignedTo: "2304" },
  { id: "ps_006", slotNumber: "B02", floor: "B1", type: "motorbike", status: "available", monthlyPrice: 120000 },
  { id: "ps_007", slotNumber: "B03", floor: "B1", type: "motorbike", status: "occupied", monthlyPrice: 120000, assignedTo: "1205" },
  { id: "ps_008", slotNumber: "B04", floor: "B1", type: "motorbike", status: "available", monthlyPrice: 120000 },
  { id: "ps_009", slotNumber: "C01", floor: "B2", type: "car", status: "available", monthlyPrice: 1000000 },
  { id: "ps_010", slotNumber: "C02", floor: "B2", type: "car", status: "occupied", monthlyPrice: 1000000, assignedTo: "1502" },
  { id: "ps_011", slotNumber: "D01", floor: "B2", type: "bicycle", status: "available", monthlyPrice: 50000 },
  { id: "ps_012", slotNumber: "D02", floor: "B2", type: "bicycle", status: "occupied", monthlyPrice: 50000, assignedTo: "0205" },
];

export const mockBBQAreas: BBQAreaConfig[] = [
  { id: "bbq_001", name: "Khu BBQ A - Sân vườn", capacity: 20, pricePerHour: 200000, status: "available", openTime: "08:00", closeTime: "22:00" },
  { id: "bbq_002", name: "Khu BBQ B - Tầng thượng", capacity: 15, pricePerHour: 300000, status: "available", openTime: "10:00", closeTime: "21:00" },
  { id: "bbq_003", name: "Khu BBQ C - Hồ bơi", capacity: 10, pricePerHour: 250000, status: "maintenance", openTime: "09:00", closeTime: "20:00" },
];

export const mockPoolSchedules: PoolScheduleConfig[] = [
  { id: "pool_001", timeSlot: "06:00 - 08:00", maxCapacity: 30, currentBookings: 12, pricePerSession: 50000, dayOfWeek: "all", status: "active" },
  { id: "pool_002", timeSlot: "08:00 - 10:00", maxCapacity: 30, currentBookings: 25, pricePerSession: 50000, dayOfWeek: "all", status: "active" },
  { id: "pool_003", timeSlot: "10:00 - 12:00", maxCapacity: 20, currentBookings: 8, pricePerSession: 30000, dayOfWeek: "weekday", status: "active" },
  { id: "pool_004", timeSlot: "14:00 - 16:00", maxCapacity: 30, currentBookings: 18, pricePerSession: 50000, dayOfWeek: "all", status: "active" },
  { id: "pool_005", timeSlot: "16:00 - 18:00", maxCapacity: 30, currentBookings: 28, pricePerSession: 50000, dayOfWeek: "all", status: "active" },
  { id: "pool_006", timeSlot: "18:00 - 20:00", maxCapacity: 25, currentBookings: 20, pricePerSession: 70000, dayOfWeek: "weekend", status: "active" },
  { id: "pool_007", timeSlot: "20:00 - 22:00", maxCapacity: 15, currentBookings: 0, pricePerSession: 70000, dayOfWeek: "weekend", status: "inactive" },
];

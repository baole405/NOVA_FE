# NOVA FE - Task Assignment

> **Phân chia công việc cho 2 người**  
> Chưa có BE → Dùng Mock Data trước

---

## 👥 Phân chia Task

### 👤 Developer 1 (Người A) - Core Features

**Phụ trách**: Dashboard, Bills List, Bill Detail

| Task                      | Mô tả                                | Components cần tạo                        |
| ------------------------- | ------------------------------------ | ----------------------------------------- |
| **T1.1** Mock Data        | Tạo mock data cho bills, apartments  | `src/lib/mock-data.ts`                    |
| **T1.2** Dashboard Page   | Trang chủ với tổng quan phí          | `src/app/(protected)/dashboard/page.tsx`  |
| **T1.3** Stats Cards      | Card thống kê (tổng phí, đến hạn...) | `src/components/dashboard/StatsCard.tsx`  |
| **T1.4** Bills List Page  | Danh sách tất cả hóa đơn             | `src/app/(protected)/bills/page.tsx`      |
| **T1.5** Bill Card        | Card hiển thị 1 hóa đơn              | `src/components/bills/BillCard.tsx`       |
| **T1.6** Bill Detail Page | Chi tiết 1 hóa đơn                   | `src/app/(protected)/bills/[id]/page.tsx` |

**Cần cài shadcn**:

```bash
npx shadcn@latest add card badge table skeleton
```

---

### 👤 Developer 2 (Người B) - History & Profile

**Phụ trách**: Payment History, Profile, Notifications

| Task                        | Mô tả                      | Components cần tạo                            |
| --------------------------- | -------------------------- | --------------------------------------------- |
| **T2.1** Mock Transactions  | Mock data cho transactions | Thêm vào `src/lib/mock-data.ts`               |
| **T2.2** History Page       | Lịch sử thanh toán         | `src/app/(protected)/history/page.tsx`        |
| **T2.3** Transaction List   | Danh sách giao dịch        | `src/components/history/TransactionList.tsx`  |
| **T2.4** Profile Page       | Thông tin user + căn hộ    | `src/app/(protected)/profile/page.tsx`        |
| **T2.5** Apartment Info     | Card thông tin căn hộ      | `src/components/profile/ApartmentCard.tsx`    |
| **T2.6** Notification Badge | Badge số phí sắp đến hạn   | `src/components/common/NotificationBadge.tsx` |

**Cần cài shadcn**:

```bash
npx shadcn@latest add avatar tabs dialog alert
```

---

## 📁 Cấu trúc thư mục chung

```
src/
├── app/
│   ├── (protected)/           # Routes cần đăng nhập
│   │   ├── dashboard/         # [Dev 1]
│   │   ├── bills/             # [Dev 1]
│   │   │   ├── page.tsx
│   │   │   └── [id]/page.tsx
│   │   ├── history/           # [Dev 2]
│   │   └── profile/           # [Dev 2]
│   └── layout.tsx             # Đã có
│
├── components/
│   ├── dashboard/             # [Dev 1]
│   ├── bills/                 # [Dev 1]
│   ├── history/               # [Dev 2]
│   ├── profile/               # [Dev 2]
│   └── common/                # Dùng chung
│
├── lib/
│   ├── mock-data.ts           # Mock data (2 người cùng thêm)
│   └── utils.ts               # Đã có
│
└── types/
    └── index.ts               # Types chung
```

---

## 🔧 Setup ban đầu (Làm chung)

### 1. Tạo types chung

```typescript
// src/types/index.ts
export interface Bill {
  id: string;
  title: string;
  amount: number;
  dueDate: string;
  period: string;
  status: "pending" | "paid" | "overdue";
  feeType: string;
}

export interface Transaction {
  id: string;
  billId: string;
  amount: number;
  paidDate: string;
  method: string;
}

export interface Apartment {
  id: string;
  unitNumber: string;
  floor: number;
  block: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  apartment?: Apartment;
}
```

### 2. Tạo mock data cơ bản

```typescript
// src/lib/mock-data.ts
import type { Bill, Transaction, Apartment } from "@/types";

export const mockApartment: Apartment = {
  id: "1",
  unitNumber: "2304",
  floor: 23,
  block: "F04",
};

export const mockBills: Bill[] = [
  {
    id: "1",
    title: "Phí quản lý tháng 1/2026",
    amount: 756000,
    dueDate: "2026-01-25",
    period: "01/2026",
    status: "pending",
    feeType: "management",
  },
  {
    id: "2",
    title: "Phí gửi xe tháng 1/2026",
    amount: 150000,
    dueDate: "2026-01-25",
    period: "01/2026",
    status: "pending",
    feeType: "parking",
  },
  // Thêm mock data khác...
];

export const mockTransactions: Transaction[] = [
  {
    id: "1",
    billId: "1",
    amount: 756000,
    paidDate: "2025-12-20",
    method: "bank_transfer",
  },
  // Thêm mock data khác...
];
```

### 3. Cài shadcn components chung

```bash
npx shadcn@latest add card badge table skeleton avatar tabs dialog alert separator
```

---

## 🎨 Design Guidelines

### Color Palette (theo Canva demo)

- **Primary**: `#3B82F6` (blue-500)
- **Secondary**: `#06B6D4` (cyan-500)
- **Background**: Light gradient blue
- **Success**: `#22C55E` (green-500)
- **Warning**: `#EAB308` (yellow-500)
- **Error**: `#EF4444` (red-500)

### UI Style

- Border radius: `rounded-xl` hoặc `rounded-2xl`
- Cards: Shadow nhẹ, background trắng/gradient
- Icons: Lucide React

---

## 📅 Timeline đề xuất

| Ngày        | Dev 1                   | Dev 2                           |
| ----------- | ----------------------- | ------------------------------- |
| **Day 1**   | Setup types, mock data  | Setup pages structure           |
| **Day 2-3** | Dashboard + Stats Cards | History page + Transaction list |
| **Day 4-5** | Bills List + Bill Card  | Profile page + Apartment card   |
| **Day 6**   | Bill Detail page        | Notification badge              |
| **Day 7**   | Polish + Integration    | Polish + Integration            |

---

## ✅ Definition of Done

Mỗi task được coi là hoàn thành khi:

- [ ] Component render đúng với mock data
- [ ] Responsive (mobile + desktop)
- [ ] Không có TypeScript errors
- [ ] Biome lint pass
- [ ] Style theo design guidelines

---

## 📝 Notes

1. **Chưa có BE**: Tất cả data lấy từ `mock-data.ts`
2. **Auth đã sẵn sàng**: Neon Auth + Google OAuth hoạt động
3. **Git workflow**: Mỗi người làm branch riêng, merge vào `main`

# NOVA MVP - User Entry Task List

> **Dành cho**: Developer thực hiện giao diện user MVP  
> **Thời gian ước tính**: 5-7 ngày

---

## 📋 Tổng quan

### User Flow MVP

```
Landing → Login → Dashboard → Bills List → Bill Detail
                      ↓
                   History
```

### Nguyên tắc thiết kế

- Mobile-first responsive
- Màu chủ đạo: Blue gradient (theo design Canva)
- Component library: shadcn/ui
- Icons: Lucide React

---

## 📝 Task List Chi Tiết

### Phase 1: Foundation (Day 1)

#### Task 1.1: Setup Types & Mock Data

**File**: `src/types/index.ts`, `src/lib/mock-data.ts`

```typescript
// Types cần tạo:
-Bill(id, title, amount, dueDate, status, feeType) -
  Transaction(id, billId, amount, paidDate, method) -
  Apartment(unitNumber, floor, block) -
  FeeType(id, name, icon, unit);
```

**Checklist**:

- [ ] Tạo file `src/types/index.ts`
- [ ] Tạo file `src/lib/mock-data.ts` với 5-10 bills mẫu
- [ ] Tạo mock transactions (3-5 records)
- [ ] Tạo mock apartment data

---

#### Task 1.2: Setup Route Groups

**Files**: Tạo cấu trúc thư mục

```
src/app/
├── (public)/              # Routes không cần auth
│   ├── page.tsx           # Landing page (homepage)
│   └── layout.tsx
├── (protected)/           # Routes cần auth
│   ├── dashboard/
│   │   └── page.tsx
│   ├── bills/
│   │   ├── page.tsx
│   │   └── [id]/page.tsx
│   ├── history/
│   │   └── page.tsx
│   └── layout.tsx         # Layout với sidebar/nav
```

**Checklist**:

- [ ] Tạo folder structure
- [ ] Tạo protected layout với navigation
- [ ] Update middleware cho route groups

---

### Phase 2: Landing & Navigation (Day 2)

#### Task 2.1: Landing Page

**File**: `src/app/(public)/page.tsx`

**Nội dung**:

- Hero section: Tên app + Tagline
- Problem statement (ngắn gọn)
- Features list (3-4 bullets)
- CTA Button: "Đăng nhập ngay"

**UI Elements**:

```
┌────────────────────────────────────┐
│           🏠 NOVA                  │
│  "Quản lý phí chung cư dễ dàng"   │
│                                    │
│  ✓ Theo dõi phí dịch vụ           │
│  ✓ Nhắc hạn tự động               │
│  ✓ Lịch sử thanh toán rõ ràng     │
│                                    │
│      [ Đăng nhập với Google ]      │
└────────────────────────────────────┘
```

**Checklist**:

- [ ] Hero section với gradient background
- [ ] Feature list với icons
- [ ] Login CTA button
- [ ] Responsive mobile/desktop

---

#### Task 2.2: Protected Layout với Navigation

**File**: `src/app/(protected)/layout.tsx`

**Components**:

- Bottom navigation (mobile)
- Sidebar (desktop)

**Nav Items**:

```
🏠 Dashboard    /dashboard
📋 Hóa đơn      /bills
📜 Lịch sử      /history
👤 Tài khoản    /profile (optional)
```

**Checklist**:

- [ ] Bottom nav cho mobile (fixed bottom)
- [ ] Sidebar cho desktop (>=768px)
- [ ] Active state cho current route
- [ ] User avatar từ Neon Auth

---

### Phase 3: Dashboard (Day 3)

#### Task 3.1: Dashboard Page

**File**: `src/app/(protected)/dashboard/page.tsx`

**Sections**:

1. Welcome header (Xin chào + apartment info)
2. Stats cards (tổng phí, sắp đến hạn, quá hạn)
3. Upcoming bills (3-5 bills sắp đến hạn)

**UI Layout**:

```
┌─────────────────────────────────┐
│ Xin chào, [Tên user]            │
│ Căn hộ: 2304 - Block F04        │
├─────────────────────────────────┤
│ ┌─────┐ ┌─────┐ ┌─────┐        │
│ │756K │ │ 2   │ │ 0   │        │
│ │Tổng │ │Đến  │ │Quá  │        │
│ └─────┘ └─────┘ └─────┘        │
├─────────────────────────────────┤
│ 📋 Phí sắp đến hạn              │
│ ┌─────────────────────────┐     │
│ │ Phí quản lý T1    756K  │     │
│ │ Hạn: 25/01/2026         │     │
│ └─────────────────────────┘     │
│ ┌─────────────────────────┐     │
│ │ Phí gửi xe T1     150K  │     │
│ │ Hạn: 25/01/2026         │     │
│ └─────────────────────────┘     │
└─────────────────────────────────┘
```

**Components cần tạo**:

- `StatsCard.tsx` - Card thống kê
- `UpcomingBillCard.tsx` - Card phí sắp đến hạn

**Checklist**:

- [ ] Welcome header với user info từ Neon Auth
- [ ] 3 stats cards (animated numbers optional)
- [ ] Upcoming bills list (max 5)
- [ ] "Xem tất cả" link to /bills
- [ ] Loading skeleton

---

### Phase 4: Bills (Day 4-5)

#### Task 4.1: Bills List Page

**File**: `src/app/(protected)/bills/page.tsx`

**Features**:

- Filter tabs: Tất cả | Chờ thanh toán | Đã thanh toán | Quá hạn
- List of BillCard components
- Empty state khi không có bills

**UI Layout**:

```
┌─────────────────────────────────┐
│ 📋 Hóa đơn của bạn              │
├─────────────────────────────────┤
│ [Tất cả] [Chờ TT] [Đã TT] [Quá]│
├─────────────────────────────────┤
│ ┌─────────────────────────────┐ │
│ │ 💵 Phí quản lý T1/2026      │ │
│ │    756,000 VND              │ │
│ │    Hạn: 25/01/2026  [Chờ TT]│ │
│ └─────────────────────────────┘ │
│ ┌─────────────────────────────┐ │
│ │ 🚗 Phí gửi xe T1/2026       │ │
│ │    150,000 VND              │ │
│ │    Hạn: 25/01/2026  [Chờ TT]│ │
│ └─────────────────────────────┘ │
└─────────────────────────────────┘
```

**Components**:

- `BillCard.tsx` - Card hóa đơn (click → detail)
- `BillStatusBadge.tsx` - Badge trạng thái

**Checklist**:

- [ ] Filter tabs (Tất cả, Chờ TT, Đã TT, Quá hạn)
- [ ] Bill cards với status badge
- [ ] Click card → navigate to detail
- [ ] Empty state
- [ ] Loading skeleton

---

#### Task 4.2: Bill Detail Page

**File**: `src/app/(protected)/bills/[id]/page.tsx`

**Nội dung**:

- Bill header (title, amount lớn)
- Details table (kỳ, hạn đóng, trạng thái)
- Fee breakdown (nếu có)
- Action buttons (Mark as paid - mock)

**UI Layout**:

```
┌─────────────────────────────────┐
│ ← Quay lại                      │
├─────────────────────────────────┤
│      💵 Phí quản lý             │
│      Tháng 01/2026              │
│                                 │
│      756,000 VND                │
│      [Chờ thanh toán]           │
├─────────────────────────────────┤
│ Chi tiết                        │
│ ─────────────────────────────── │
│ Kỳ thanh toán    01/2026        │
│ Hạn đóng         25/01/2026     │
│ Ngày tạo         01/01/2026     │
│ Căn hộ           2304 - F04     │
├─────────────────────────────────┤
│ Phân tích chi phí               │
│ ─────────────────────────────── │
│ Phí quản lý cơ sở    500,000đ   │
│ Phí bảo trì tòa nhà  200,000đ   │
│ Phí dịch vụ          56,000đ    │
│ ─────────────────────────────── │
│ Tổng cộng            756,000đ   │
├─────────────────────────────────┤
│    [ Đánh dấu đã thanh toán ]   │
└─────────────────────────────────┘
```

**Checklist**:

- [ ] Back button
- [ ] Bill header với status
- [ ] Details table
- [ ] Fee breakdown (optional)
- [ ] Action button (mock function)
- [ ] 404 handling cho invalid ID

---

### Phase 5: History (Day 6)

#### Task 5.1: Payment History Page

**File**: `src/app/(protected)/history/page.tsx`

**Features**:

- List transactions theo tháng
- Transaction card với details
- Empty state

**UI Layout**:

```
┌─────────────────────────────────┐
│ 📜 Lịch sử thanh toán           │
├─────────────────────────────────┤
│ Tháng 12/2025                   │
│ ┌─────────────────────────────┐ │
│ │ ✓ Phí quản lý T12/2025      │ │
│ │   756,000 VND               │ │
│ │   20/12/2025 • Chuyển khoản │ │
│ └─────────────────────────────┘ │
│ ┌─────────────────────────────┐ │
│ │ ✓ Phí gửi xe T12/2025       │ │
│ │   150,000 VND               │ │
│ │   20/12/2025 • Ví điện tử   │ │
│ └─────────────────────────────┘ │
├─────────────────────────────────┤
│ Tháng 11/2025                   │
│ ...                             │
└─────────────────────────────────┘
```

**Components**:

- `TransactionCard.tsx` - Card giao dịch

**Checklist**:

- [ ] Group transactions by month
- [ ] Transaction cards
- [ ] Payment method display
- [ ] Empty state
- [ ] Loading skeleton

---

### Phase 6: Polish (Day 7)

#### Task 6.1: Final Polish

- [ ] Kiểm tra responsive trên mobile
- [ ] Fix layout issues
- [ ] Add loading states everywhere
- [ ] Add error handling
- [ ] Run biome lint + fix

#### Task 6.2: Integration Check

- [ ] Test login flow end-to-end
- [ ] Test all navigation paths
- [ ] Check protected routes
- [ ] Verify user data from Neon Auth

---

## 🛠️ Commands cần chạy

```bash
# Cài shadcn components
npx shadcn@latest add card badge tabs table skeleton avatar separator

# Chạy lint
npm run fix-lint

# Chạy typecheck
npm run typecheck
```

---

## 📦 Deliverables

Khi hoàn thành, các files sau cần có:

```
src/
├── types/index.ts                    ✅
├── lib/mock-data.ts                  ✅
├── app/
│   ├── (public)/page.tsx             ✅ Landing
│   ├── (protected)/
│   │   ├── layout.tsx                ✅ Protected layout
│   │   ├── dashboard/page.tsx        ✅ Dashboard
│   │   ├── bills/
│   │   │   ├── page.tsx              ✅ Bills list
│   │   │   └── [id]/page.tsx         ✅ Bill detail
│   │   └── history/page.tsx          ✅ History
├── components/
│   ├── dashboard/
│   │   ├── StatsCard.tsx             ✅
│   │   └── UpcomingBillCard.tsx      ✅
│   ├── bills/
│   │   ├── BillCard.tsx              ✅
│   │   └── BillStatusBadge.tsx       ✅
│   ├── history/
│   │   └── TransactionCard.tsx       ✅
│   └── layout/
│       ├── BottomNav.tsx             ✅
│       └── Sidebar.tsx               ✅
```

---

## ❓ FAQs

**Q: Chưa có API, lấy data từ đâu?**  
A: Import từ `@/lib/mock-data.ts`

**Q: User info lấy từ đâu?**  
A: Từ Neon Auth: `import { authClient } from "@/lib/auth/client"`

**Q: Gặp lỗi layout?**  
A: Chạy `npm run dev` và check console

**Q: Cần thêm component shadcn?**  
A: `npx shadcn@latest add [component-name]`

# Mobile Screen Navigation (Demo-Oriented)

## 1. Navigation Philosophy

- Mobile uu tien luong cot loi, khong bat buoc giong 100% FE.
- Tap trung demo duoc B2C lifecycle:
  - Dang ky/dang nhap
  - Xem bill va thanh toan PayOS
  - Booking va theo doi trang thai
  - Notifications + transactions

## 2. Role-Based Entry

### Guest

- Splash
- Onboarding (optional)
- Login
- Register
- Forgot password (optional)

### Resident

- Resident Home (tab)
- Bills
- Booking
- Transactions
- Notifications
- Profile

### Manager

- Manager Home (tab)
- Booking Moderation
- Bills Overview
- Notifications
- Profile

## 3. Proposed Bottom Tabs

### Resident Tabs

1. Home
2. Bills
3. Booking
4. Notifications
5. Profile

### Manager Tabs

1. Home
2. Bookings
3. Bills
4. Notifications
5. Profile

## 4. Screen Map (Resident)

### Auth Stack

- Splash -> Login
- Login -> Register
- Login -> Resident Home

### Bills Stack

- Resident Home -> Bills List
- Bills List -> Bill Detail
- Bill Detail -> Payment Method/Confirm
- Payment Confirm -> Open PayOS WebView/Browser
- Return URL -> Payment Result
- Payment Result -> Bill Detail (paid)

### Booking Stack

- Resident Home -> Booking Service List
- Booking Service List -> Slot Selector
- Slot Selector -> Booking Confirm
- Booking Confirm -> Booking Success
- Booking Success -> My Bookings
- My Bookings -> Booking Detail

### Transactions Stack

- Resident Home -> Transactions List
- Transactions List -> Transaction Detail

### Notifications Stack

- Any tab -> Notifications List
- Notifications List -> Notification Detail

## 5. Screen Map (Manager)

### Booking Moderation

- Manager Home -> Booking Moderation List
- Booking Moderation List -> Booking Detail
- Booking Detail -> Action Confirmed/Rejected/Cancelled
- Action success -> Back to list (state updated)

### Bills Monitoring

- Manager Home -> Bills Overview
- Bills Overview -> Bill Detail

## 6. Main Demo Paths

### Path A - B2C onboarding

Splash -> Register -> Login -> Home

### Path B - Bill to Cash

Home -> Bills List -> Bill Detail -> Pay via PayOS -> Payment Result -> Transactions

### Path C - Booking lifecycle

Home -> Booking -> Confirm -> My Bookings -> Manager Approve -> Resident sees updated status

### Path D - Notification check

Any screen -> Notifications -> Detail -> Mark read

## 7. API Dependency by Screen

- Login/Register: /api/auth/register, /api/auth/login, /api/auth/me
- Bills: /api/bills, /api/bills/:id
- Payment: /api/payments/create-link, /api/payments/webhook, /api/bills/:id/payment-status
- Booking resident: /api/bookings, /api/bookings/me
- Booking manager: /api/bookings/admin, /api/bookings/:id/status, /api/bookings/:id
- Transactions: /api/transactions, /api/transactions/by-month/:month
- Notifications: /api/notifications, /api/notifications/:id/read

## 8. Demo Scope Notes

- Mobile co the bo qua mot so man xa FE (community, advanced manager analytics) neu API chua on dinh.
- Khong su dung mock data cho cac man demo chinh.

## 9. Validation Checklist for Navigation

1. Tu Splash vao dung stack theo role.
2. Back stack dung sau payment return URL.
3. Sau manager moderation, resident thay status moi khong can restart app.
4. Notifications mo detail va mark read thanh cong.

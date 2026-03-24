# SRS - Homix Platform

## 1. Purpose

Tai lieu nay dac ta yeu cau phan mem cho he thong Homix (BE + FE + Mobile).
Muc tieu: thong nhat pham vi MVP, luong nghiep vu chinh, va cac rang buoc ky thuat de team trien khai dong bo.

## 2. Scope

- In scope:
  - Backend API (NestJS): auth, bills, payments, bookings, transactions, notifications, stats.
  - Frontend Web (Next.js): resident dashboard, manager dashboard, bills, bookings, auth.
  - Mobile (Kotlin): uu tien cao nhat trong ke hoach trien khai, nhung khong bat buoc giong 100% FE.
- Out of scope tam thoi:
  - docs/outcomes (tai lieu hoc phan/checkpoint).
  - Cac module chua co endpoint that se duoc danh dau "planned".

## 3. Business Goals

- Cung cap nen tang quan ly can ho cho cu dan va manager.
- Dong bo luong tai chinh bill -> payment -> transaction.
- Quan ly booking tien ich va moderation boi manager.
- Uu tien su dung du lieu that tren moi truong deploy.

## 4. Stakeholders

- Resident
- Manager
- Dev team (BE/FE/Mobile)
- QA/UAT
- Product owner

## 5. Roles and Permissions

- Resident:
  - Dang ky/dang nhap
  - Xem bills, thanh toan, xem lich su giao dich
  - Tao booking, xem booking cua minh
- Manager:
  - Xem toan bo booking
  - Duyet/tu choi/huy booking
  - Theo doi dashboard, bills, thong ke

## 6. Functional Requirements

### FR-01 Authentication

- Dang nhap email/password va Google OAuth.
- JWT duoc gui trong Authorization Bearer.
- Route guard theo role.

### FR-02 Bills and Payments

- Liet ke bills theo user.
- Xem chi tiet bill item.
- Tao payment link.
- Nhan webhook va cap nhat trang thai bill + tao transaction.

### FR-03 Bookings

- Resident tao booking theo serviceType, slot, ngay, gio.
- Kiem tra trung lich.
- Manager xem danh sach booking, doi status, cap nhat notes.

### FR-04 Transactions

- Xem lich su thanh toan.
- Co the loc theo thang.

### FR-05 Notifications

- Hien thi thong bao cho user.
- Danh dau da doc.

### FR-06 Stats

- Cung cap thong ke cho manager.

## 7. Non-functional Requirements

- Zero mock data cho runtime app tren moi truong deploy.
- Security:
  - Khong hardcode secrets trong source.
  - Secret duoc quan ly qua Doppler/Vercel/DigitalOcean env.
- Performance:
  - API response cho truy van thong thuong < 2s.
- Reliability:
  - Payment webhook phai co logging va co kha nang retry (phase hardening).
- Observability:
  - Co log co cau truc cho auth, payment, booking moderation.

## 8. Data and Integration Requirements

- FE production phai goi BE production qua NEXT_PUBLIC_API_URL.
- BE dung DATABASE*URL va PAYOS*\* tu env.
- Swagger docs phai available tai /api/docs.
- Root page BE hien thi Hello World va nut sang /api/docs.

## 9. Mobile Alignment Policy

- Mobile la uu tien cao nhat trong roadmap tiep theo.
- Mobile KHONG bat buoc replicate toan bo UX/feature cua FE.
- Mobile can dam bao:
  - Dung API contract that
  - Dung status enums dung nghia vu
  - Uu tien cac luong cot loi: Auth, Bills/Payment, Booking, Notifications.

## 10. Acceptance Criteria (MVP)

- AC-01: Dang nhap thanh cong theo role resident/manager.
- AC-02: Resident xem bill that va tao payment link that.
- AC-03: Webhook cap nhat bill -> paid va tao transaction.
- AC-04: Manager duyet/tu choi/huy booking tren data that.
- AC-05: Khong con mock data trong cac luong runtime da release.

## 11. Constraints

- Moi truong deploy:
  - FE: https://homix-two.vercel.app
  - BE: https://homix-a9d3h.ondigitalocean.app
- Du lieu nhay cam (secret) khong dua vao md/public repo.

## 12. Open Items

- Hoan tat endpoint cho cac module con mock (facilities, complaints, announcements, community).
- Chot UAT checklist rieng cho Mobile.

# NOVA Project Summary

> **Smart Living Solutions: Integrated AI and IoT for Residents**  
> FPT University - EXE202

---

## 📋 Project Overview

| Field            | Value                                                         |
| ---------------- | ------------------------------------------------------------- |
| **Project Name** | NOVA (Homix)                                                  |
| **Course**       | EXE202 - FPT University                                       |
| **Team**         | Tường Vi, Nhật Minh, Anh Tú, Xuân Hiệp, Thanh Tâm, Trường Huy |
| **Target Users** | Cư dân chung cư, 25-45 tuổi                                   |
| **Market**       | PropTech Vietnam ($512.4M in 2023)                            |

---

## 🔴 Problem Statement

### 5 Core Problems

| #   | Problem                            | Statistics                                                                                             |
| --- | ---------------------------------- | ------------------------------------------------------------------------------------------------------ |
| 1   | **Delayed Repair & Maintenance**   | 60% apartments dilapidated, only 40% have maintenance plan. 45% report repairs >7 days                 |
| 2   | **Feedback/Complaint Issues**      | 40% residents dissatisfied. Only 20% complaints resolved within 7 days                                 |
| 3   | **Lack of Financial Transparency** | 45% lack transparency. 30% disputes relate to maintenance funds. Only 25% have quarterly reports       |
| 4   | **Service Payment Issues**         | 55% make payment errors. 20% complaints about bills. ~25% late payment rate                            |
| 5   | **No AI/IoT Integration**          | 10-15% of 20,000-25,000 fires/year in apartments. 70-75% due to electrical. 40-50% slow alarm response |

### Core Problem (MVP Focus)

> Cư dân chung cư gặp khó khăn trong việc **theo dõi và thanh toán các khoản phí dịch vụ định kỳ** do thiếu hệ thống nhắc hạn → quên hạn → phí phạt

---

## 🟢 Solution (4 Modules)

### 01. Repair & Maintenance

- Work Order System: Create → Track → Complete (SLA, transparent progress)
- Maintenance Calendar: Automated scheduling
- Cost Transparency: Quote → Approve → Track costs in app

### 02. Feedback / Complaint

- One-App Ticketing: Submit in 30 seconds, real-time tracking
- AI Auto-Triage: Auto-classify, suggest handling steps, prioritize by urgency
- Full Communication Log: Transparent history

### 03. Financial Transparency

- Financial Dashboard: Automated income-expense reports
- Auto Billing & e-Invoice: Invoice → Remind → Collect → Reconcile
- Service Fee Tracker: 24/7 transaction history
- Auditable Ledger: Audit-standard records

### 04. AI & IoT (Future)

- IoT Sensors: Water/gas leaks, smoke, electric overload, AQI
- AI Anomaly Detection: Predict incidents 30-60 minutes early
- Real-Time Alerts: Notify residents + security + management
- Energy Dashboard: Electricity/water monitoring, waste alerts

---

## 📱 Product Demo (MVP Screens)

| Screen             | Description                               |
| ------------------ | ----------------------------------------- |
| **Chat Box AI**    | AI assistant "MIXABO" - Hỏi đáp thông tin |
| **Maintenance**    | Gửi yêu cầu sửa chữa + upload ảnh         |
| **Register Guest** | Đăng ký khách đến thăm                    |
| **Fee & Payment**  | Xem phí hàng tháng + thanh toán           |

### Mobile App Features

- Welcome screen với thông tin căn hộ
- Common Services: Services, Chat box, Payment, Feedback
- News feed: Thông báo từ BQL

---

## 🗃️ Database Schema (8 Tables)

```
users           → Cư dân, Admin
apartments      → Căn hộ (unit, floor, block)
fee_types       → Loại phí (điện, nước, gửi xe...)
bills           → Hóa đơn từng kỳ
transactions    → Giao dịch thanh toán
notifications   → Thông báo/Nhắc hạn
maintenance_requests → Yêu cầu sửa chữa (future)
announcements   → Thông báo chung (future)
```

---

## 🎯 MVP Scope (EXE202)

### ✅ BUILD

- [x] Danh sách phí dịch vụ định kỳ
- [x] Nhắc hạn đóng phí
- [x] Lịch sử thanh toán
- [x] Giao diện đơn giản
- [x] Thu thập phản hồi

### ❌ DROP (Out of Scope)

- [ ] Tích hợp thanh toán thực tế
- [ ] Quản lý sửa chữa, phản ánh
- [ ] IoT, AI nâng cao
- [ ] Dashboard phức tạp

---

## 🏗️ Tech Stack

| Layer        | Technology                         |
| ------------ | ---------------------------------- |
| **Frontend** | Next.js 16 + React 19 + TypeScript |
| **Styling**  | Tailwind CSS + shadcn/ui           |
| **Auth**     | Neon Auth (Google OAuth)           |
| **Backend**  | NestJS (planned)                   |
| **Database** | PostgreSQL (Neon Serverless)       |
| **Payment**  | PayOS (planned)                    |

---

## 📊 Success Criteria

1. Người dùng hiểu các khoản phí cần thanh toán
2. Giảm tình trạng quên hạn đóng phí
3. Người dùng đánh giá giải pháp hữu ích
4. Sẵn sàng tiếp tục sử dụng trong tương lai

---

## 📁 Resources

- **Presentation**: [Canva Pitch Deck](https://www.canva.com/design/DAG170IH5To/edit)
- **UI/UX Design**: [Canva Wireframes](https://www.canva.com/design/DAG5Y_7cfZA/edit)
- **Database Schema**: [DrawDB Link](https://www.drawdb.app/editor?shareId=8cdf48a664df3bcd49d402582d541f21)
- **Documentation**: `docs/tai-lieu-dac-ta/`

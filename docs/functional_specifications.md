# Functional Specifications & System Functions

**Project**: NOVA - Apartment Management System (EXE202)  
**Version**: 1.2 (Expanded Scope)  
**Date**: 2026-01-24

This document defines the complete Functional Requirements (FR) and detailed descriptions of all system functions, including **Core Modules** (MVP) and **Expansion Modules** (Phase 2) to enhance the system's value.

---

## 🟢 PART 1: CORE MODULES (CURRENT MVP)

### 1. Authentication & User Profile Module

- **FR-AUTH-01: Google OAuth Login**: Secure login via Google Account (Neon Auth).
- **FR-AUTH-02: Session Management**: JWT-based session handling.
- **FR-USER-01: View Profile & Apartment Info**: Display resident details and assigned unit info.

### 2. Dashboard & Overview Module

- **FR-DASH-01: Financial Overview**: Calculated total due, pending bills count.
- **FR-DASH-02: Upcoming Bills Widget**: Preview of bills due in 7 days.

### 3. Service Fees (Bills) Module

- **FR-BILL-01: List All Bills**: Filter (Unpaid/Paid), Sort by Date.
- **FR-BILL-02: View Bill Details**: Detailed breakdown of charges.

### 4. Payments & Transactions Module

- **FR-PAY-01: One-Click Payment (Mock)**: Simulate payment processing.
- **FR-TRANS-01: Transaction History**: Log of all past payments.

---

## 🔵 PART 2: EXPANSION MODULES (PROPOSED)

### 5. Facility Booking Module (Tiện ích)

- **FR-FAC-01: View Facilities**: List available amenities (BBQ, Tennis Court, Swimming Pool, Community Hall).
- **FR-FAC-02: Check Availability**: View calendar/slots for a specific facility.
- **FR-FAC-03: Make Booking**: Reserve a time slot. Validates against existing bookings/maintenance.
- **FR-FAC-04: My Bookings**: Manage (view/cancel) active reservations.

### 6. Visitor Management Module (Khách đến thăm)

- **FR-VIS-01: Pre-register Guest**: Resident inputs guest details (Name, Plate Number, Expected Time).
- **FR-VIS-02: Generate Access QR**: System generates a temporary QR code for the guest to scan at the gate (simulated).
- **FR-VIS-03: Visitor Log**: History of guests who have visited the apartment.

### 7. Community Hub Module (Cộng đồng)

- **FR-COM-01: Digital Notice Board**: Official announcements from Management (Water cut, Fire drill) with push notifications.
- **FR-COM-02: Resident Marketplace**: "Garage Sale" feature for residents to buy/sell used items within the building.
- **FR-COM-03: Community Polls**: Voting system for building decisions (e.g., "Plant more trees?").

### 8. Package & Delivery Module (Bưu phẩm)

- **FR-DEL-01: Package Arrival Notification**: Reception logs a package; Resident receives a notification.
- **FR-DEL-02: Digital Sign-off**: Resident generates a code to pick up the package or authorizes someone else.

### 9. Emergency & Support Module (Khẩn cấp)

- **FR-SOS-01: SOS Button**: One-tap access to Security, Medical, or Fire hotline.
- **FR-SOS-02: Maintenance Request**: Report issues (broken light, leaking pipe) with photo attachment and track status.

---

## 6. Implementation Matrix (Updated)

| Module         | Feature        | Status         | Backend Support | Frontend UI |
| :------------- | :------------- | :------------- | :-------------- | :---------- |
| **Auth**       | Login/Profile  | ✅ Done        | Ready           | Ready       |
| **Fees**       | Bills/Payment  | 🚧 In Progress | Ready           | `BillsPage` |
| **Facilities** | Booking System | ⚪ Proposed    | Needs Schema    | Needs Page  |
| **Visitors**   | Guest QR       | ⚪ Proposed    | Needs Schema    | Needs Page  |
| **Community**  | Marketplace    | ⚪ Proposed    | Needs Schema    | Needs Page  |
| **Delivery**   | Package Log    | ⚪ Proposed    | Needs Schema    | Needs Page  |

# NOVA (Homix) - Project Documentation

> **Summary**: Smart Living Solutions for Apartment Residents (EXE202).
> **Target Audience**: AI Agents & Developers.

---

## 🏗️ Tech Stack

| Layer          | Technology                  | Details                                        |
| :------------- | :-------------------------- | :--------------------------------------------- |
| **Frontend**   | **Next.js 16** (App Router) | React 19, TypeScript, Tailwind CSS, shadcn/ui. |
| **Backend**    | **NestJS 10**               | TypeScript, Drizzle ORM, Swagger.              |
| **Database**   | **PostgreSQL** (Neon)       | Serverless, Drizzle ORM.                       |
| **Auth**       | **Neon Auth**               | Google OAuth, JWT (Stateless).                 |
| **Deployment** | **Vercel** (FE)             | Railway/Render (BE), Neon (DB).                |
| **Tools**      | **Husky, Commitlint**       | Conventional Commits enforced.                 |
| **Env Mgmt**   | **Doppler**                 | Secret management for Dev/Stg/Prod.            |

---

## 🎯 MVP Scope & Features

### 1. Core Features (Implemented/In-Progress)

- **Authentication**: Google Login via Neon Auth.
- **Service Fees (Bills)**:
  - Dashboard: Total due, upcoming bills widget.
  - Bills List: Filter (Unpaid/Paid), Sort via Due Date.
  - Bill Details: Breakdown of fee types (Management, Parking, Water, etc.).
  - **Mock Payment**: Simulate payment -> mark bill as paid -> log transaction.
- **Transactions**: History of past payments.

### 2. Expansion Modules (Planned/Proposed)

- **Visitor Management**: Invite guests -> Generate QR Code -> Security Check-in.
- **Facility Booking**: Book amenities (BBQ, Gym) -> Calendar Slot Validation.
- **Community**: Notice board, polling.

---

## 🗃️ Data Models (Schema Overview)

### Core Tables

```sql
users           (id, email, name, avatar, role)
apartments      (id, unit_number, block, floor)
fee_types       (id, name: 'Water', 'Parking', etc.)
bills           (id, apartment_id, fee_type_id, amount, period, due_date, status: 'pending'|'paid'|'overdue')
transactions    (id, bill_id, user_id, amount, payment_method, timestamp)
```

### Future Tables

```sql
visitors        (id, resident_id, guest_name, plate_number, access_code_qr, status, valid_time)
facilities      (id, name: 'BBQ', capacity, location)
bookings        (id, user_id, facility_id, start_time, end_time, status)
```

---

## 🔗 Architecture & Integration

### Authentication Flow

1. **FE**: User clicks "Sign in with Google".
2. **Neon Auth**: Handles OAuth -> Returns **JWT**.
3. **FE**: Stores JWT. Sends in `Authorization: Bearer <token>` header for API calls.
4. **BE**: Validates JWT signature (via JWKS or Secret) -> Extracts `user_id`.

### API Contract (Key Endpoints)

- `GET /api/bills` - List user's bills.
- `GET /api/bills/:id` - Bill detail.
- `PATCH /api/bills/:id/mark-paid` - Mock payment.
- `GET /api/transactions` - History.
- `POST /api/visitors/invite` - Create guest invitation.
- `POST /api/bookings` - Book a facility slot.

---

## �️ Development Guidelines

### Git & Code Quality

- **Commits**: Must follow Conventional Commits (e.g., `feat: add login`, `fix: header layout`).
- **Husky**: Pre-commit hooks run `biome check` (Lint/Format) and `tsc` (Typecheck).
- **Naming**: PascalCase for Components, camelCase for functions/vars.

### Environment Setup

- **Doppler**: Use `doppler run -- npm run dev` to inject secrets.
- **Files**: `.env` is ignored. Use Doppler or Vercel Environment Variables.

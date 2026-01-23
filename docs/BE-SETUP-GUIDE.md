# NOVA Backend Setup Guide

> **Hướng dẫn setup NestJS Backend cho NOVA**

---

## 🎯 Tech Stack

| Component      | Technology                          |
| -------------- | ----------------------------------- |
| **Framework**  | NestJS 10 + TypeScript              |
| **Database**   | PostgreSQL (Neon Serverless)        |
| **ORM**        | Drizzle ORM                         |
| **Auth**       | JWT (from Neon Auth)                |
| **Validation** | class-validator + class-transformer |
| **API Docs**   | Swagger/OpenAPI                     |

---

## 📊 Database Schema (8 Tables)

Đã có SQL schema tại: `docs/tai-lieu-dac-ta/4.md`

```
users           → Cư dân, Admin
apartments      → Căn hộ
fee_types       → Loại phí
bills           → Hóa đơn
transactions    → Giao dịch
notifications   → Thông báo/Nhắc hạn
maintenance_requests → Sửa chữa (future)
announcements   → Thông báo chung (future)
```

**Database URL**: Dùng Neon connection string từ project `frosty-art-37812701`

---

## 🚀 Khởi tạo NestJS Project

```bash
# 1. Cài NestJS CLI
npm i -g @nestjs/cli

# 2. Tạo project mới
nest new nova-be

# 3. Chọn npm làm package manager
? Which package manager would you ❤️  to use? npm

# 4. Vào thư mục project
cd nova-be
```

---

## 📦 Dependencies cần cài

```bash
# Database
npm install drizzle-orm @neondatabase/serverless
npm install -D drizzle-kit

# Auth & Validation
npm install @nestjs/jwt @nestjs/passport passport passport-jwt
npm install class-validator class-transformer

# Config
npm install @nestjs/config

# Swagger API Docs
npm install @nestjs/swagger swagger-ui-express
```

---

## 📂 Cấu trúc thư mục đề xuất

```
nova-be/
├── src/
│   ├── auth/                 # Auth module (JWT validation)
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── guards/
│   │   │   └── jwt-auth.guard.ts
│   │   └── strategies/
│   │       └── jwt.strategy.ts
│   │
│   ├── bills/                # Bills module (MVP)
│   │   ├── bills.controller.ts
│   │   ├── bills.service.ts
│   │   └── dto/
│   │       ├── create-bill.dto.ts
│   │       └── update-bill.dto.ts
│   │
│   ├── transactions/         # Transactions module (MVP)
│   │   ├── transactions.controller.ts
│   │   ├── transactions.service.ts
│   │   └── dto/
│   │
│   ├── apartments/           # Apartments module
│   │   ├── apartments.controller.ts
│   │   └── apartments.service.ts
│   │
│   ├── notifications/        # Notifications module
│   │   ├── notifications.controller.ts
│   │   └── notifications.service.ts
│   │
│   ├── database/             # Database config
│   │   ├── drizzle.config.ts
│   │   └── schema/
│   │       ├── users.schema.ts
│   │       ├── bills.schema.ts
│   │       ├── apartments.schema.ts
│   │       └── ...
│   │
│   ├── common/               # Shared resources
│   │   ├── decorators/
│   │   │   └── current-user.decorator.ts
│   │   ├── filters/
│   │   └── interceptors/
│   │
│   ├── app.module.ts
│   └── main.ts
│
├── drizzle.config.ts         # Drizzle ORM config
├── .env
└── package.json
```

---

## 🔐 Auth Integration (Neon Auth JWT)

### 1. Neon Auth JWT Structure

JWT từ Neon Auth có payload:

```json
{
  "sub": "user_id",
  "email": "user@example.com",
  "role": "authenticated",
  "exp": 1763848395,
  "iat": 1763847495
}
```

### 2. JWT Strategy

```typescript
// src/auth/strategies/jwt.strategy.ts
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKeyProvider: async (request, rawJwtToken, done) => {
        // Verify với JWKS endpoint của Neon Auth
        // TODO: Implement JWKS verification
        done(null, process.env.NEON_AUTH_JWT_SECRET);
      },
    });
  }

  async validate(payload: any) {
    return {
      userId: payload.sub,
      email: payload.email,
      role: payload.role,
    };
  }
}
```

### 3. Auth Guard

```typescript
// src/auth/guards/jwt-auth.guard.ts
import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {}
```

---

## 🗃️ Database Setup (Drizzle ORM)

### 1. Drizzle Config

```typescript
// drizzle.config.ts
import type { Config } from "drizzle-kit";

export default {
  schema: "./src/database/schema/*.ts",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
} satisfies Config;
```

### 2. Database Schema Example

```typescript
// src/database/schema/bills.schema.ts
import {
  pgTable,
  serial,
  varchar,
  decimal,
  date,
  timestamp,
} from "drizzle-orm/pg-core";
import { apartments } from "./apartments.schema";
import { feeTypes } from "./fee-types.schema";

export const bills = pgTable("bills", {
  id: serial("id").primaryKey(),
  apartmentId: integer("apartment_id").references(() => apartments.id),
  feeTypeId: integer("fee_type_id").references(() => feeTypes.id),
  title: varchar("title", { length: 255 }).notNull(),
  amount: decimal("amount", { precision: 15, scale: 2 }).notNull(),
  period: date("period").notNull(),
  dueDate: date("due_date").notNull(),
  status: varchar("status", { length: 50 }).default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
});
```

### 3. Environment Variables

```env
# .env
DATABASE_URL=postgresql://user:password@ep-xxx.neon.tech/neondb?sslmode=require
NEON_AUTH_JWT_SECRET=your_jwt_secret
PORT=3001
```

---

## 📡 MVP API Endpoints

### Bills Module

| Method | Endpoint                   | Description                   | Auth |
| ------ | -------------------------- | ----------------------------- | ---- |
| GET    | `/api/bills`               | Lấy danh sách bills của user  | ✅   |
| GET    | `/api/bills/:id`           | Chi tiết 1 bill               | ✅   |
| GET    | `/api/bills/upcoming`      | Bills sắp đến hạn             | ✅   |
| PATCH  | `/api/bills/:id/mark-paid` | Đánh dấu đã thanh toán (mock) | ✅   |

### Transactions Module

| Method | Endpoint                            | Description          | Auth |
| ------ | ----------------------------------- | -------------------- | ---- |
| GET    | `/api/transactions`                 | Lịch sử giao dịch    | ✅   |
| GET    | `/api/transactions/by-month/:month` | Giao dịch theo tháng | ✅   |

### Apartments Module

| Method | Endpoint             | Description               | Auth |
| ------ | -------------------- | ------------------------- | ---- |
| GET    | `/api/apartments/my` | Thông tin căn hộ của user | ✅   |

---

## 🛠️ Commands

```bash
# Development
npm run start:dev

# Build
npm run build

# Run production
npm run start:prod

# Generate Drizzle migrations
npx drizzle-kit generate:pg

# Apply migrations
npx drizzle-kit push:pg
```

---

## 🔗 CORS Configuration

```typescript
// src/main.ts
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for FE
  app.enableCors({
    origin: ["http://localhost:3000", "https://nova-fe.vercel.app"],
    credentials: true,
  });

  await app.listen(3001);
}
bootstrap();
```

---

## 📚 Next Steps

### Phase 1: Setup

- [ ] Init NestJS project
- [ ] Install dependencies
- [ ] Setup Drizzle ORM + Neon connection
- [ ] Create database schema files

### Phase 2: Auth

- [ ] Implement JWT strategy
- [ ] Create auth guards
- [ ] Test with token from FE

### Phase 3: MVP APIs

- [ ] Bills module (CRUD)
- [ ] Transactions module (Read only)
- [ ] Apartments module (Read only)

### Phase 4: Integration

- [ ] Test with FE
- [ ] Deploy to Vercel/Railway

---

## 📄 Deliverables

1. **API Documentation** - Swagger/OpenAPI spec
2. **Database Migrations** - Drizzle migration files
3. **Postman Collection** - API test collection
4. **README.md** - Setup instructions

---

## 🤝 FE-BE Integration

### Request Flow

```
FE (Next.js) → Neon Auth → JWT Token → BE (NestJS)
                                          ↓
                                     Verify JWT
                                          ↓
                                   Extract user_id
                                          ↓
                                    Query Database
```

### Example FE API Call

```typescript
// FE: src/lib/api-client.ts
import { authClient } from "@/lib/auth/client";

export async function getBills() {
  const session = await authClient.getSession();

  const response = await fetch("http://localhost:3001/api/bills", {
    headers: {
      Authorization: `Bearer ${session.data.access_token}`,
    },
  });

  return response.json();
}
```

---

## 📞 Support

Issues? Liên hệ baole (tommydao2000@gmail.com)

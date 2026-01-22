# Neon Overview - Serverless Postgres

## Neon là gì?

**Neon** là một nền tảng **Serverless PostgreSQL** được thiết kế để giúp phát triển ứng dụng nhanh hơn với các tính năng hiện đại như autoscaling, database branching, và instant restore.

## Kiến trúc tổng quan

```mermaid
graph TB
    subgraph "Client Applications"
        A[Next.js App]
        B[NestJS Backend]
        C[Mobile App]
    end

    subgraph "Neon Platform"
        D[Connection Pooler]
        E[Compute Layer<br/>Autoscaling]
        F[Storage Layer<br/>Separate Storage]
        G[Pageserver]
    end

    subgraph "Features"
        H[Branch Manager]
        I[Auth Service]
        J[Data API]
    end

    A --> D
    B --> D
    C --> D
    D --> E
    E --> G
    G --> F

    H --> F
    I --> E
    J --> E

    style A fill:#61dafb
    style B fill:#e0234e
    style E fill:#00e699
    style F fill:#0099ff
```

## Tính năng chính

### 1. Autoscaling

```mermaid
graph LR
    A[Low Traffic] -->|Scale Down| B[0.25 vCPU]
    B -->|Traffic Increases| C[0.5 vCPU]
    C -->|High Load| D[4 vCPU]
    D -->|Traffic Drops| C
    C -->|Idle| E[Scale to Zero]

    style E fill:#ff6b6b
    style D fill:#51cf66
```

**Đặc điểm:**

- ✅ Tự động scale CPU/RAM theo nhu cầu
- ✅ Scale to Zero khi không hoạt động
- ✅ Khởi động lại trong < 500ms
- 💰 Chỉ trả tiền khi sử dụng

### 2. Database Branching

```mermaid
gitGraph
    commit id: "Initial Schema"
    commit id: "Add Users Table"

    branch development
    checkout development
    commit id: "Test Feature A"
    commit id: "Add Posts Table"

    branch feature-comments
    checkout feature-comments
    commit id: "Test Comments"
    commit id: "Add Indexes"

    checkout development
    merge feature-comments

    checkout main
    merge development tag: "Deploy to Production"
```

**Use Cases:**

- 🔧 **Development** - Mỗi developer có database riêng
- 🧪 **Testing** - Test migrations trước khi deploy
- 🚀 **Preview** - Mỗi PR có database preview
- 🔄 **CI/CD** - Automated testing với data thật

### 3. Instant Restore & Point-in-Time Recovery

```mermaid
timeline
    title Database Timeline
    2026-01-20 : Database Created
               : Initial Data
    2026-01-21 : Add 1000 users
               : Migration v1
    2026-01-22 : Bug Deployed
               : Data Corruption
    2026-01-22 : Restore to 2026-01-21
               : Recovery Complete
```

**Lợi ích:**

- ⚡ Restore nhanh chóng (< 1 phút)
- 🕐 Point-in-time recovery (PITR)
- 🔒 Không mất dữ liệu
- 🎯 Restore về bất kỳ thời điểm nào trong 30 ngày

## So sánh Neon vs Traditional PostgreSQL

```mermaid
graph TB
    subgraph "Traditional PostgreSQL"
        A1[EC2/VPS Server]
        A2[Fixed Resources<br/>24/7 Running]
        A3[Manual Backups]
        A4[Complex Setup]
        A5[High Fixed Cost]
    end

    subgraph "Neon Serverless"
        B1[Managed Service]
        B2[Auto Scale<br/>Scale to Zero]
        B3[Automatic Backups]
        B4[1-Click Setup]
        B5[Pay per Use]
    end

    style A2 fill:#ff6b6b
    style A5 fill:#ff6b6b
    style B2 fill:#51cf66
    style B5 fill:#51cf66
```

| Tiêu chí        | Neon                      | Traditional Postgres  |
| --------------- | ------------------------- | --------------------- |
| **Scaling**     | Tự động, scale to zero    | Manual, fixed size    |
| **Setup**       | `npx neonctl@latest init` | Complex installation  |
| **Cost**        | Pay-per-use, từ $0        | Fixed monthly (>$20)  |
| **Branching**   | Built-in (như Git)        | Manual backup/restore |
| **Maintenance** | Fully managed             | Self-managed          |
| **Dev/Test**    | Instant branches          | Expensive copies      |
| **Latency**     | <5ms (same region)        | Depends on setup      |
| **Backups**     | Automatic PITR            | Manual setup          |

## Workflow Development với Neon

```mermaid
sequenceDiagram
    participant Dev as Developer
    participant Git as GitHub
    participant Neon as Neon Platform
    participant Vercel as Vercel

    Dev->>Git: Push feature branch
    Git->>Neon: Trigger branch creation
    Neon->>Neon: Create DB branch from main
    Neon->>Vercel: Provide preview DB URL
    Vercel->>Vercel: Deploy preview app
    Vercel-->>Dev: Preview URL ready

    Dev->>Dev: Test feature
    Dev->>Git: Merge to main
    Git->>Vercel: Deploy to production
    Neon->>Neon: Delete preview branch
```

## Pricing Plans

```mermaid
graph LR
    A[Free Plan<br/>$0/month] -->|Upgrade| B[Launch Plan<br/>$19/month]
    B -->|Upgrade| C[Scale Plan<br/>$69/month]
    C -->|Contact| D[Enterprise<br/>Custom]

    style A fill:#51cf66
    style B fill:#4dabf7
    style C fill:#7950f2
    style D fill:#ff6b6b
```

### Free Plan

- ✅ 0.5 GB storage
- ✅ 1 project
- ✅ 10 branches
- ✅ Scale to zero
- 🎯 Perfect cho development/learning

### Launch Plan ($19/month)

- ✅ 10 GB storage
- ✅ Unlimited projects
- ✅ Unlimited branches
- ✅ Auto-suspend (5 mins)
- 🎯 Ideal cho startups

### Scale Plan ($69/month)

- ✅ 50 GB storage
- ✅ High availability
- ✅ Read replicas
- ✅ Advanced monitoring
- 🎯 Production-ready

## Integration với Tech Stack

```mermaid
graph TB
    subgraph "Frontend"
        A[Next.js]
        B[React]
        C[Vue/Nuxt]
    end

    subgraph "Backend"
        D[NestJS]
        E[Express]
        F[Fastify]
    end

    subgraph "ORM/Query Builder"
        G[Prisma]
        H[Drizzle]
        I[TypeORM]
    end

    subgraph "Neon Services"
        J[Neon Database]
        K[Neon Auth]
        L[Data API]
    end

    A --> G
    B --> H
    C --> I
    D --> G
    E --> H
    F --> I

    G --> J
    H --> J
    I --> J

    J --> K
    J --> L

    style J fill:#00e699
    style K fill:#4dabf7
    style L fill:#7950f2
```

## Khi nào nên dùng Neon?

### ✅ Phù hợp khi:

- 🚀 Deploy trên serverless platforms (Vercel, Netlify, Cloudflare)
- 🔄 Cần branching workflow cho development
- 💰 Traffic không đều, muốn tiết kiệm chi phí
- ⚡ Cần setup nhanh, không muốn maintain infrastructure
- 🧪 Cần nhiều môi trường test/preview
- 🤖 Build AI applications với pgvector

### ❌ Không phù hợp khi:

- 📊 Traffic cao liên tục 24/7 (better traditional hosted)
- 🏢 Yêu cầu on-premise deployment
- 🔒 Compliance yêu cầu self-hosted
- 🎮 Real-time gaming với latency < 1ms

## Quick Start

### 1. Setup với CLI (Recommended)

```bash
# Install và init
npx neonctl@latest init

# Sẽ tự động:
# ✅ Tạo Neon account (nếu chưa có)
# ✅ Tạo project và database
# ✅ Tạo .env file với connection string
# ✅ Install dependencies nếu cần
```

### 2. Connection Flow

```mermaid
sequenceDiagram
    participant App as Your Application
    participant Pool as Connection Pooler
    participant Compute as Neon Compute
    participant Storage as Neon Storage

    App->>Pool: Connect (postgres://...)
    Pool->>Compute: Wake up if sleeping
    Compute->>Compute: Start in <500ms
    Compute-->>Pool: Ready
    Pool-->>App: Connection established

    App->>Pool: Query
    Pool->>Compute: Execute query
    Compute->>Storage: Read/Write data
    Storage-->>Compute: Data
    Compute-->>Pool: Result
    Pool-->>App: Result

    Note over Compute: Auto-suspend after 5 min idle
```

### 3. Environment Variables

```env
# Neon Connection String
DATABASE_URL="postgresql://user:pass@ep-cool-name-123456.us-east-2.aws.neon.tech/neondb?sslmode=require"

# Neon Auth URL (nếu dùng Neon Auth)
NEON_AUTH_URL="https://auth-ep-cool-name-123456.us-east-2.aws.neon.tech"

# Data API URL (nếu dùng Data API)
NEON_DATA_API_URL="https://data-ep-cool-name-123456.us-east-2.aws.neon.tech"
```

## Advanced Features

### 1. Connection Pooling

```mermaid
graph LR
    A[100 Concurrent Users] --> B[Connection Pooler]
    B --> C[5 Active DB Connections]
    C --> D[Neon Compute]

    style B fill:#4dabf7
    style C fill:#51cf66
```

**Lợi ích:**

- 🚀 Giảm số connections thực tế
- ⚡ Reuse connections hiệu quả
- 💰 Tiết kiệm tài nguyên

### 2. Read Replicas

```mermaid
graph TB
    A[Write Queries] --> B[Primary Database]
    C[Read Queries] --> D[Read Replica 1]
    C --> E[Read Replica 2]
    C --> F[Read Replica 3]

    B -.->|Replication| D
    B -.->|Replication| E
    B -.->|Replication| F

    style B fill:#ff6b6b
    style D fill:#51cf66
    style E fill:#51cf66
    style F fill:#51cf66
```

### 3. pgvector for AI

```mermaid
graph LR
    A[User Query] --> B[Generate Embedding]
    B --> C[Vector Search in Neon]
    C --> D[Similar Results]
    D --> E[LLM Context]
    E --> F[AI Response]

    style C fill:#7950f2
```

**Use Cases:**

- 🤖 Semantic search
- 💬 Chatbots với context
- 🎨 Image similarity
- 📄 Document Q&A

## Monitoring & Observability

```mermaid
graph TB
    subgraph "Neon Console"
        A[Metrics Dashboard]
        B[Query Analytics]
        C[Connection Stats]
        D[Storage Usage]
    end

    subgraph "Metrics"
        E[CPU Usage]
        F[Memory Usage]
        G[Query Performance]
        H[Connection Pool]
    end

    A --> E
    A --> F
    B --> G
    C --> H

    style A fill:#4dabf7
```

**Available Metrics:**

- 📊 CPU & Memory usage
- ⚡ Query execution time
- 🔌 Active connections
- 💾 Storage utilization
- 🌐 Geographic latency

## Best Practices

### 1. Connection Management

```typescript
// ✅ Good: Use connection pooling
import { Pool } from "@neondatabase/serverless";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// ❌ Bad: New connection per request
import { Client } from "pg";
const client = new Client({ connectionString: process.env.DATABASE_URL });
```

### 2. Branching Strategy

```mermaid
gitGraph
    commit id: "main (production)"

    branch staging
    checkout staging
    commit id: "QA testing"

    branch feature-1
    checkout feature-1
    commit id: "dev work"

    checkout staging
    branch feature-2
    commit id: "dev work 2"

    checkout staging
    merge feature-1
    merge feature-2

    checkout main
    merge staging tag: "release"
```

### 3. Security Best Practices

- 🔐 Always use SSL (`sslmode=require`)
- 🔑 Rotate credentials regularly
- 🛡️ Use environment variables
- 🚫 Never commit `.env` files
- 👥 Use IAM roles when possible

## Resources

- 📚 [Official Documentation](https://neon.com/docs)
- 🎓 [Neon University](https://neon.tech/blog/tags/tutorial)
- 💬 [Discord Community](https://discord.gg/92vNTzKDGp)
- 🐙 [GitHub Examples](https://github.com/neondatabase)
- 📹 [YouTube Tutorials](https://www.youtube.com/@neondatabase)

## Conclusion

Neon là giải pháp Serverless PostgreSQL hiện đại, phù hợp với:

- ✅ Modern web applications (Next.js, React, Vue)
- ✅ Serverless deployments
- ✅ Agile development workflows
- ✅ Cost-sensitive projects
- ✅ AI/ML applications

**Recommended Stack:**

```
Next.js (Frontend) + NestJS (Backend) + Neon (Database) + Vercel (Hosting)
```

---

_Last updated: January 22, 2026_

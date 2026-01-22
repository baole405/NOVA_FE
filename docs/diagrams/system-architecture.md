# System Architecture Diagram

## NOVA Platform - System Architecture

```mermaid
graph TB
    subgraph "CLIENT LAYER"
        C1[Web Browser]
        C2[Mobile Browser]
    end

    subgraph "PRESENTATION LAYER"
        P1[Next.js 16 App Router]
        P2[React 19 + TypeScript]
        P3[Tailwind CSS + shadcn/ui]
    end

    subgraph "SERVER LAYER"
        S1[NestJS Backend API]
        S2[REST Endpoints]
        S3[Business Logic]
        S4[Validation & Guards]
    end

    subgraph "DATA LAYER"
        D1[(PostgreSQL)]
        D2[Neon Serverless]
        D3[neon_auth Schema]
    end

    subgraph "3RD PARTY SERVICES"
        T1[Neon Auth]
        T2[Google OAuth]
        T3[Cloudinary CDN]
        T4[PayOS Payment]
    end

    %% Client to Presentation
    C1 --> P1
    C2 --> P1

    %% Presentation Layer connections
    P1 --> P2
    P2 --> P3

    %% Presentation to Server
    P1 -->|REST API| S1
    P1 -->|JWT Token| S1

    %% Server Layer connections
    S1 --> S2
    S2 --> S3
    S3 --> S4

    %% Server to Data
    S4 -->|Queries| D1
    D1 --> D2

    %% 3rd Party connections
    P1 -->|Auth SDK| T1
    T1 -->|OAuth| T2
    T1 -->|Store Users| D3
    S1 -->|Upload| T3
    S1 -->|Payment| T4

    %% Styling
    style C1 fill:#e3f2fd
    style C2 fill:#e3f2fd
    style P1 fill:#fff3e0
    style S1 fill:#e8f5e9
    style D1 fill:#fce4ec
    style T1 fill:#f3e5f5
    style T2 fill:#f3e5f5
    style T3 fill:#f3e5f5
    style T4 fill:#f3e5f5
```

## Diagram giải thích

### 🖥️ Client Layer

- Web browsers (Chrome, Firefox, Safari)
- Mobile browsers (responsive design)

### 📱 Presentation Layer (Next.js FE)

- **Next.js 16**: App Router, Server Components
- **React 19**: UI framework
- **Tailwind + shadcn/ui**: Styling

### ⚙️ Server Layer (NestJS BE)

- **NestJS**: Backend framework
- **REST API**: HTTP endpoints
- **Guards**: JWT verification, role-based access

### 💾 Data Layer

- **PostgreSQL**: Main database
- **Neon Serverless**: Managed PostgreSQL
- **neon_auth schema**: Auth tables (users, sessions)

### 🔌 3rd Party Services

- **Neon Auth**: Authentication service
- **Google OAuth**: Social login
- **Cloudinary**: Image/file storage (planned)
- **PayOS**: VN payment gateway (planned)

---

## Data Flow

```mermaid
sequenceDiagram
    participant User
    participant NextJS as Next.js (FE)
    participant NeonAuth as Neon Auth
    participant NestJS as NestJS (BE)
    participant DB as PostgreSQL

    User->>NextJS: Access app
    NextJS->>NeonAuth: Login (Google OAuth)
    NeonAuth-->>NextJS: JWT Token
    NextJS->>NestJS: API Request + JWT
    NestJS->>NestJS: Verify JWT
    NestJS->>DB: Query data
    DB-->>NestJS: Results
    NestJS-->>NextJS: JSON Response
    NextJS-->>User: Render UI
```

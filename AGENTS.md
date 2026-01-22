# AGENTS.md - Project Context for AI Agents

## Project Overview

**Project Name:** NOVA_FE  
**Repository:** baole405/NOVA_FE  
**Framework:** Next.js 15 (App Router) + TypeScript  
**Database:** Neon (Serverless PostgreSQL)  
**Authentication:** Neon Auth (powered by Better Auth v1.4.6)  
**Styling:** Tailwind CSS + shadcn/ui components

## What We've Built

### 1. Neon Platform Integration

**Date:** January 22, 2026

#### Neon Project Setup

- **Project ID:** `frosty-art-37812701`
- **Branch:** `br-lively-mud-a1qs3gv9` (production)
- **Organization:** `org-empty-sunset-77949072`
- **User:** baole (tommydao2000@gmail.com)
- **Command Used:** `npx neonctl@latest init`

#### Neon Auth Configuration

- **Status:** Provisioned and ready
- **Auth Service:** Serverless authentication built on Better Auth
- **Package:** `@neondatabase/auth` v1.4.6
- **Console URL:** https://console.neon.tech/app/projects/frosty-art-37812701/auth

**Features Enabled:**

- ✅ Email/Password authentication
- ✅ Google OAuth (replaced GitHub with Gmail)
- ✅ Email OTP support
- ✅ JWT token generation
- ✅ Session management
- ✅ Database branching (auth data branches with database)

### 2. Authentication Implementation

#### Files Created/Modified

**Environment Configuration:**

```
.env.local
├── NEON_AUTH_BASE_URL=<pending-from-console>
└── NODE_ENV=development
```

**Auth Infrastructure:**

```
src/lib/auth/
├── client.ts          # Client-side auth client (createAuthClient)
└── server.ts          # Server-side auth client (createAuthServer)

src/app/api/auth/
└── [...path]/route.ts # Auth API handler (GET/POST proxy to Neon Auth)

middleware.ts          # Edge middleware protecting /account/* and /dashboard/*
```

**Auth Pages:**

```
src/app/auth/[path]/
└── page.tsx           # Dynamic auth pages (sign-in, sign-up, sign-out)

src/app/account/[path]/
└── page.tsx           # Account management (settings, security)

src/app/login/
└── page.tsx           # Custom login page using shadcn/ui
```

**Components:**

```
src/components/
└── login-form.tsx     # Login form with Neon Auth integration
                       # - Email/password sign-in
                       # - Google OAuth
                       # - Error handling
                       # - Loading states
```

**UI Components (shadcn/ui):**

```
src/components/ui/
├── button.tsx
├── input.tsx
├── label.tsx
├── separator.tsx
├── field.tsx          # New: Field wrapper components
└── navigation-menu.tsx
```

**Root Layout Updates:**

```
src/app/layout.tsx     # Added NeonAuthUIProvider wrapper
                       # Includes UserButton component
                       # suppressHydrationWarning enabled

src/app/globals.css    # Imported Neon Auth styles
                       # @import '@neondatabase/auth/style.css'
```

### 3. Documentation Created

#### Neon Platform Documentation

**Location:** `docs/neon/`

**Files:**

1. **neon-overview.md** (507 lines)
   - Complete Neon platform architecture
   - Autoscaling mechanics
   - Database branching workflow
   - Storage architecture
   - Pricing comparison
   - 14 Mermaid diagrams

2. **neon-auth.md** (1012 lines)
   - Neon Auth complete guide
   - Authentication flows (sign-in/sign-up)
   - JWT integration
   - RLS (Row Level Security) setup
   - Branch-aware authentication
   - OAuth providers (Google, GitHub)
   - 20 Mermaid diagrams

3. **better-auth-migration.md**
   - Migration from Stack Auth to Better Auth
   - Breaking changes explanation
   - Before/after code examples
   - Environment variable changes
   - Component replacement guide
   - 8 Mermaid diagrams

**Mermaid Extension Fixed:**

- Installed: `bierner.markdown-mermaid` extension
- All diagrams now render in VS Code preview (Ctrl+Shift+V)

### 4. Key Architectural Decisions

#### Authentication Flow

```typescript
// Sign-in with email/password
const { data, error } = await authClient.auth.signIn.email({
  email: "user@example.com",
  password: "password123",
});

// Google OAuth sign-in
await authClient.auth.signIn.social({
  provider: "google",
  callbackURL: "/",
});
```

#### Protected Routes

- **Middleware:** Edge middleware protects `/account/*` and `/dashboard/*`
- **Redirect:** Unauthenticated users → `/auth/sign-in`
- **Session:** Automatic session management via cookies

#### Database Architecture Discussion

- **PostgreSQL:** Neon serverless Postgres recommended
- **ORM:** Drizzle ORM recommended over Prisma/TypeORM
  - Reasons: Fastest, smallest bundle (7kb), type-safe, serverless-ready
- **Backend:** NestJS integration planned
- **Integration:** Drizzle + NestJS + Neon Postgres = optimal stack

### 5. Component Library

#### shadcn/ui Components Added

**Command:** `npx shadcn@latest add login-02`

**Generated:**

- `src/components/ui/separator.tsx` (NEW)
- `src/components/ui/field.tsx` (NEW)
- `src/app/login/page.tsx` (NEW)
- `src/components/login-form.tsx` (NEW - modified for Neon Auth)

**Modifications:**

- Replaced GitHub OAuth → Google OAuth
- Integrated Neon Auth SDK
- Added error handling and loading states
- Updated branding: "Acme Inc." → "NOVA"
- Fixed sign-up link: `/auth/sign-up`

### 6. Development Environment

**Tools & Commands:**

```bash
# Neon CLI
npx neonctl@latest init          # Initialize Neon project

# shadcn/ui
npx shadcn@latest add login-02   # Add login component

# Package manager
npm install @neondatabase/auth   # Install Neon Auth SDK
npm run dev                       # Start dev server
npm run fix-lint                  # Fix linting issues
```

**VS Code Extensions:**

- ✅ `anthropic.claude-code` (Claude Code with MCP)
- ✅ `bierner.markdown-mermaid` (Mermaid diagram support)
- ✅ `suhelmakkad.shadcn-ui` (shadcn/ui integration)

## Important URLs & Resources

### Neon Documentation

- **Main Docs:** https://neon.com/docs/introduction
- **Neon Auth Docs:** https://neon.com/docs/guides/neon-auth
- **Better Auth Docs:** https://better-auth.com
- **Console:** https://console.neon.tech

### Project-Specific URLs

- **Project Console:** https://console.neon.tech/app/projects/frosty-art-37812701
- **Auth Dashboard:** https://console.neon.tech/app/projects/frosty-art-37812701/auth
- **Branch:** https://console.neon.tech/app/projects/frosty-art-37812701/branches/br-lively-mud-a1qs3gv9

### Framework & Library Docs

- **Next.js 15:** https://nextjs.org/docs
- **shadcn/ui:** https://ui.shadcn.com
- **Drizzle ORM:** https://orm.drizzle.team
- **NestJS:** https://nestjs.com
- **Tailwind CSS:** https://tailwindcss.com

### Package Documentation

- **@neondatabase/auth:** https://www.npmjs.com/package/@neondatabase/auth
- **Better Auth:** https://github.com/better-auth/better-auth

## Current Status & Next Steps

### ✅ Completed

1. Neon project initialization
2. Neon Auth provisioning (Beta)
3. Complete authentication setup (files, middleware, routes)
4. Custom login page with Google OAuth
5. Comprehensive documentation (42+ Mermaid diagrams)
6. VS Code Mermaid support

### ⚠️ Pending

1. **Get Auth URL from Console**
   - Navigate to: https://console.neon.tech/app/projects/frosty-art-37812701/auth
   - Copy Auth URL
   - Update `.env.local`: `NEON_AUTH_BASE_URL=<actual-url>`

2. **Test Authentication Flow**

   ```bash
   npm run dev
   # Visit: http://localhost:3000/login
   # Test: Email/password sign-in
   # Test: Google OAuth sign-in
   ```

3. **Verify Protected Routes**
   - Visit `/account/settings` (should redirect if not authenticated)
   - Visit `/dashboard` (should redirect if not authenticated)

4. **Future Enhancements**
   - Integrate Drizzle ORM for database queries
   - Set up NestJS backend API
   - Implement PayOS payment integration (mentioned for course project)
   - Add email verification flow
   - Configure RLS policies

## Stack Auth vs Better Auth Migration

### Why Better Auth?

**Stack Auth** (deprecated, no new users since late 2024):

- 4 environment variables required
- Separate user management
- No native database branching

**Better Auth** (current, recommended):

- ✅ 1 environment variable
- ✅ Database as source of truth
- ✅ Native Neon branching support
- ✅ Auth data branches with database automatically
- ✅ Better performance
- ✅ More OAuth providers

### Migration Path

All new projects should use `@neondatabase/auth` (Better Auth) instead of `@stackframe/stack`.

See `docs/neon/better-auth-migration.md` for detailed migration guide.

## Deployment Options

### Vercel (Recommended for Next.js)

- **Free Plan:** Unlimited projects, 100GB bandwidth/month
- **Pros:** Native Next.js support, fast builds
- **Cons:** 100 deployments/day limit

### Cloudflare Pages (Alternative)

- **Free Plan:** Unlimited bandwidth, 500 builds/month
- **Pros:** Unlimited bandwidth, edge optimization
- **Cons:** Slower Next.js builds, 1 concurrent build

**Recommendation for NOVA_FE:** Vercel for best Next.js DX

## Database Schema

### Neon Auth Tables (Auto-created in `neon_auth` schema)

```sql
neon_auth.user          -- User accounts
neon_auth.session       -- Active sessions
neon_auth.account       -- OAuth accounts
neon_auth.verification  -- Email verification tokens
```

### Application Tables (To be created with Drizzle)

```typescript
// Example with Drizzle ORM
import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const articles = pgTable("articles", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content"),
  userId: text("user_id").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});
```

## Project Context for AI Agents

### User Profile

- **Name:** baole
- **Email:** tommydao2000@gmail.com
- **Language:** Vietnamese (primary), English (technical)
- **Context:** University student, "qua môn" (pass the course) mentioned
- **Course:** SES8/EXE202

### Project Goals

1. Build modern Next.js frontend with authentication
2. Learn serverless PostgreSQL (Neon)
3. Understand Better Auth migration
4. Integrate payment system (PayOS planned)
5. Pass university course requirements

### Communication Style

- User prefers concise, direct answers
- Responds well to Vietnamese technical explanations
- Values practical examples over theory
- Expects AI to "fix it" rather than provide manual instructions

## Technical Notes

### Drizzle ORM Context

**Question:** "drizzle là framework của postgres?"  
**Answer:** No, Drizzle is a TypeScript ORM that supports multiple databases:

- PostgreSQL (Neon, Supabase, Vercel Postgres)
- MySQL
- SQLite
- Cloudflare D1

**Why Drizzle for this project:**

- Smallest bundle size (7kb vs Prisma 500kb)
- Best serverless performance
- Full TypeScript type safety
- SQL-like syntax
- Perfect for Neon Postgres

### Neon Auth Features

- **Branching:** Auth users branch automatically with database
- **OAuth:** Google + GitHub supported (project uses Google only)
- **Email OTP:** Built-in support
- **JWT:** Automatic token generation
- **RLS:** Row-Level Security compatible
- **Edge:** Works on Vercel Edge, Cloudflare Workers

## File Structure Summary

```
nova-fe/
├── .env.local                      # Environment variables (Auth URL pending)
├── middleware.ts                   # Auth middleware (protects routes)
├── package.json                    # @neondatabase/auth installed
├── next.config.ts
├── tsconfig.json
├── biome.json
├── components.json                 # shadcn/ui config
│
├── docs/
│   ├── MERMAID-FIX.md             # Mermaid troubleshooting
│   └── neon/
│       ├── neon-overview.md       # 507 lines, 14 diagrams
│       ├── neon-auth.md           # 1012 lines, 20 diagrams
│       └── better-auth-migration.md # Migration guide, 8 diagrams
│
├── src/
│   ├── app/
│   │   ├── layout.tsx             # NeonAuthUIProvider wrapper
│   │   ├── globals.css            # Neon Auth styles imported
│   │   ├── page.tsx               # Home page
│   │   ├── login/
│   │   │   └── page.tsx           # Custom login page (shadcn)
│   │   ├── auth/[path]/
│   │   │   └── page.tsx           # Dynamic auth pages
│   │   ├── account/[path]/
│   │   │   └── page.tsx           # Account management
│   │   ├── server-example/
│   │   │   └── page.tsx           # Server-side auth demo
│   │   ├── api/
│   │   │   └── auth/[...path]/
│   │   │       └── route.ts       # Auth API handler
│   │   └── actions/
│   │       ├── articles.ts
│   │       └── upload.ts
│   │
│   ├── components/
│   │   ├── login-form.tsx         # Neon Auth integrated form
│   │   ├── nova-editor.tsx
│   │   ├── nova-article-viewer.tsx
│   │   ├── nav/
│   │   │   └── nav-bar.tsx
│   │   └── ui/                    # shadcn/ui components
│   │       ├── button.tsx
│   │       ├── input.tsx
│   │       ├── label.tsx
│   │       ├── field.tsx          # NEW
│   │       ├── separator.tsx      # NEW
│   │       ├── card.tsx
│   │       ├── badge.tsx
│   │       └── navigation-menu.tsx
│   │
│   ├── lib/
│   │   ├── utils.ts
│   │   └── auth/
│   │       ├── client.ts          # createAuthClient()
│   │       └── server.ts          # createAuthServer()
│   │
│   └── types/
│       └── api.ts
│
└── public/
```

## Command History

```bash
# Session 1: Neon Setup
npx neonctl@latest init

# Session 2: UI Components
npx shadcn@latest add login-02

# Session 3: Development
npm run dev                    # Started server (multiple times)
npm run fix-lint               # Exit code 1 (linting issues)
```

## Known Issues & Resolutions

### Issue 1: Mermaid Diagrams Not Rendering

**Status:** ✅ RESOLVED  
**Solution:** Installed `bierner.markdown-mermaid` extension  
**Usage:** Press `Ctrl+Shift+V` to preview markdown

### Issue 2: Stack Auth vs Better Auth Confusion

**Status:** ✅ RESOLVED  
**Context:** Course material uses Stack Auth (deprecated)  
**Solution:** Migrated to Better Auth (@neondatabase/auth)  
**Documentation:** See `docs/neon/better-auth-migration.md`

### Issue 3: Auth URL Not Set

**Status:** ⚠️ PENDING  
**Action Required:** User needs to copy Auth URL from Neon Console  
**File:** `.env.local` → `NEON_AUTH_BASE_URL=<pending>`

### Issue 4: Lint Errors

**Status:** ⚠️ NEEDS INVESTIGATION  
**Command:** `npm run fix-lint` exited with code 1  
**Next Step:** Check biome.json or run linter to see errors

## Video Course Context

Based on screenshot timestamps, user is following a video course covering:

1. **Signin & Signup with Stack Auth** (01:17:04 - 01:35:35)
2. **Protecting Routes** (01:35:36 - 01:51:33)
3. **Creating Protected Server Actions** (01:51:34 - 02:02:39)

**Note:** Course uses Stack Auth, but we've implemented Better Auth (newer, recommended by Neon).

## Quick Reference Commands

```bash
# Start development server
npm run dev

# Install dependencies
npm install

# Add shadcn/ui components
npx shadcn@latest add <component-name>

# Neon CLI
npx neonctl@latest auth      # Manage auth
npx neonctl@latest branches  # Manage branches
npx neonctl@latest projects  # Manage projects

# Linting
npm run fix-lint
```

## Environment Variables Reference

```env
# .env.local
NEON_AUTH_BASE_URL=<get-from-console>    # Required for auth
NODE_ENV=development                      # Development mode

# Future variables (when adding Drizzle)
DATABASE_URL=<neon-connection-string>    # For Drizzle ORM
```

## AI Agent Instructions

When assisting with this project:

1. **Check Neon Console** for latest auth configuration
2. **Refer to docs/neon/** for Neon-specific implementations
3. **Use Better Auth** patterns, NOT Stack Auth
4. **Follow shadcn/ui** conventions for UI components
5. **Prefer Drizzle ORM** for database operations
6. **Test auth flows** before marking complete
7. **Update this file** when making significant changes

## Contact & Support

- **User:** baole (tommydao2000@gmail.com)
- **Project:** NOVA_FE (FPT University - SES8/EXE202)
- **Neon Support:** https://neon.com/docs/introduction/support
- **Better Auth Community:** https://github.com/better-auth/better-auth/discussions

---

**Last Updated:** January 22, 2026  
**Document Version:** 1.0  
**Status:** Active Development

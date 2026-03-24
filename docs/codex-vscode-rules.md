# codex-vscode-rules

## 1. Core Principles

1. Runtime app tren deploy khong duoc dung mock data.
2. API source of truth la backend deploy.
3. Secrets khong duoc commit vao repo hoac ghi vao tai lieu public.
4. Moi thay doi quan trong phai cap nhat docs trong cung dot lam viec.

## 2. Environment Rules

- FE production endpoint phai dung NEXT_PUBLIC_API_URL tro den BE deploy.
- BE env duoc quan ly qua Doppler/DO/Vercel, khong hardcode trong source.
- Khong luu secret values trong markdown tai lieu.
- QA flow uu tien PRD-first cho backend: test tren moi truong prd truoc localhost.
- Khong dung localhost backend lam nguon chung minh demo.

## 3. Data Rules

- Cam import mock data trong runtime pages/components/hooks da release.
- Neu endpoint chua san sang:
  - An feature hoac dat status planned,
  - Khong dung fake data de gia lap production.

## 4. Architecture Rules

- FE route phai map ro endpoint BE.
- Role-based access can ro rang (resident/manager).
- Booking status transitions phai theo hop le nghiep vu.

## 5. Documentation Rules

Bat buoc duy tri:

- SRS.md
- ERD.md
- Project_flows.md
- codex-vscode-changelog.md
- codex-vscode-rules.md

Moi khi co thay doi:

1. Cap nhat changelog.
2. Cap nhat % completion trong Project_flows neu co thay doi dang ke.
3. Neu schema doi, cap nhat ERD (image + note).

## 6. Mobile Policy

- Mobile la uu tien cao trong roadmap.
- Mobile khong bat buoc giong toan bo FE ve UX/module.
- Mobile can giu dung contract API, auth, va status nghiep vu cot loi.

## 7. QA/Verification Rules

- Truoc merge:
  - Build pass cho module bi anh huong.
  - Smoke test luong chinh: Auth, Bill->Payment, Booking moderation.
- Truoc release:
  - Xac nhan khong con mock imports trong runtime code.
  - Co anh chung minh endpoint thanh cong tu Swagger PRD.

## 9. Working Agreement (2026-03-23)

1. Cho phep chinh nhe API contract:
   - Them endpoint payment-status.
   - Chuan hoa error response.
2. Uu tien xu ly theo thu tu P0 -> P1 theo stabilization plan.
3. Gui va xac nhan screenshot theo checklist sau moi flow test.

## 8. Security Rules

- Khong chia se credentials, tokens, DB URL/password trong issue/PR/chat logs.
- Neu lo thong tin nhay cam, rotate secret ngay va cap nhat env manager.

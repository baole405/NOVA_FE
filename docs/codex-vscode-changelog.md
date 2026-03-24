# codex-vscode-changelog

## 2026-03-23

### Scope

- Chuan hoa huong di: zero mock data tren runtime app deploy.
- Uu tien luong that cho BE + FE, va tao nen tang de day nhanh Mobile.

### Changes implemented in code

- Backend:
  - Them root landing page Hello World + link sang /api/docs.
  - Them RootModule va dang ky vao AppModule.
  - Dieu chinh global prefix de route GET / khong bi prefix /api.
  - Them booking manager APIs:
    - GET /bookings/admin
    - PATCH /bookings/:id/status
    - PATCH /bookings/:id
  - Mo rong create booking enum de ho tro swimming_pool.
- Frontend:
  - Chuyen manager bookings client tu mock sang API that.
  - Chuyen fallback API URL sang backend deploy DigitalOcean.

### Docs added

- SRS.md
- ERD.md
- Project_flows.md
- codex-vscode-changelog.md
- codex-vscode-rules.md

### Observed blockers

- Frontend build hien fail do thieu dependency recharts (pre-existing).
- Local runtime backend can du PAYOS\_\* env day du de boot full app.

### Notes

- docs/outcomes duoc xem la tai lieu hoc phan, khong la nguon su that van hanh ky thuat.
- Mobile la uu tien cao, nhung khong can giong 100% FE.

## 2026-03-23 (Batch 2 - Planning)

### Scope

- Lap ke hoach hardening backend theo B2C + PayOS + mobile readiness.
- Them tai lieu screen navigation cho mobile demo.

### Changes implemented in docs

- Backend docs:
  - Tao ke hoach: BE-Stabilization-Plan-B2C-PayOS.md
  - Bao gom roadmap P0/P1/P2, Swagger test plan, checklist anh chung minh endpoint.
- Frontend docs:
  - Tao Mobile_screen_navigation.md
  - Dinh nghia role-based navigation, tab flows, demo paths, API dependency theo man hinh.

### Docs added/updated

- BE-Stabilization-Plan-B2C-PayOS.md
- Mobile_screen_navigation.md
- codex-vscode-changelog.md (updated)

### Next actions

- User test Swagger theo checklist va gui screenshot cho moi flow.
- Sau khi co anh chung minh, thuc hien batch P0 backend hardening.

## 2026-03-23 (Batch 3 - P0 Backend Hardening)

### Scope

- Thuc hien P0 backend hardening cho B2C + PayOS + mobile readiness.
- Cap nhat rules theo huong PRD-first testing.

### Changes implemented in code

- Backend:
  - Them global error response filter voi format thong nhat:
    - { statusCode, code, message, timestamp, path }
  - Them endpoint payment status cho mobile:
    - GET /api/bills/:id/payment-status
  - Chuyen mark-paid manual thanh manager-only (resident phai qua PayOS).
  - Bo sung webhook idempotency theo transactionRef va billId+payos.
  - Tang response create payment link de de test Swagger:
    - checkoutUrl, orderCode, amount, testMode

### Changes implemented in docs

- Cap nhat codex-vscode-rules.md:
  - Them rule PRD-first test backend (khong dung localhost lam chung minh demo).
  - Ghi nhan working agreements da duoc user chap thuan.
- Cap nhat BE-Stabilization-Plan-B2C-PayOS.md:
  - Them nguyen tac PRD-first.
  - Danh dau trang thai agreements = Approved.

### Validation

- Backend build pass sau thay doi P0.

### Next actions

- User test flow tren Swagger PRD va gui anh theo checklist:
  - Auth -> Payment create-link -> Webhook -> Payment-status -> Transactions
  - Replay webhook de chung minh idempotency.

## 2026-03-24 (Batch 4 - Payment + Notification + Bill Creation Fix)

### Scope

- Fix payment redirect ve web nhung bill khong chuyen sang paid.
- Fix noti bi rong trong runtime flow do chua co trigger that va pagination mac dinh.
- Bo sung API tao bill manager de demo backend truc tiep tren Swagger.

### Changes implemented in code

- Backend:
  - Them fallback reconcile endpoint:
    - POST /api/payments/reconcile/:billId
  - PaymentsService bo sung luong doi soat sau redirect:
    - Query PayOS order theo orderCode (neu webhook cham/loi).
    - Neu da paid thi cap nhat bill + transaction theo idempotency.
  - Tao helper trung tam cho idempotency va cap nhat paid de dung chung webhook/reconcile.
  - Bo sung trigger notifications khi:
    - Thanh toan thanh cong (webhook/reconcile)
    - Manager mark-paid
    - Manager tao bill moi
  - Them API tao bill:
    - POST /api/bills (manager only)
    - Ho tro line items + auto tinh tong tien neu khong truyen amount.
- Frontend:
  - payment returnUrl/cancelUrl kem billId de track bill sau redirect.
  - Bills page goi reconcile va polling ngan sau ?payment=success.
  - Notifications API client set mac dinh limit/offset ro rang (limit=20, offset=0).

### Validation

- Backend build pass: npm run build.
- Frontend build van fail do thieu recharts (pre-existing, khong lien quan batch fix).

### Next actions

- Test PRD voi account resident:
  - Tao link thanh toan -> thanh toan xong -> redirect ve /bills?payment=success&billId=...
  - Verify bill status doi sang paid qua reconcile.
  - Verify notification payment duoc tao.
- Test manager tao bill tren Swagger:
  - POST /api/bills -> resident nhan bill moi + notification moi.

---

## Changelog format (for next entries)

- Date
- Scope
- Changes implemented in code
- Docs added/updated
- Blockers
- Next actions

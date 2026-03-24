# Project Flows (BE + FE + Mobile)

## 1. Modules Inventory

| Module                        |  BE |  FE | Mobile | Notes                                                                          |
| ----------------------------- | --: | --: | -----: | ------------------------------------------------------------------------------ |
| Auth                          | 85% | 85% |    60% | Da co email/password + Google OAuth; can hardening callback va token lifecycle |
| Apartments                    | 70% | 55% |    50% | FE manager apartment view con mot phan mock                                    |
| Bills                         | 80% | 75% |    55% | Luong xem bill on; can tiep tuc bo mock trong man manager                      |
| Payments                      | 75% | 70% |    50% | Da co create link + webhook, can E2E monitoring                                |
| Transactions                  | 75% | 60% |    45% | FE route lich su can hoan thien day du                                         |
| Bookings (resident)           | 80% | 70% |    55% | Tao booking duoc, can hardening overlap + race                                 |
| Bookings (manager moderation) | 75% | 65% |    40% | Da co API admin list/update/status, can UAT voi data that                      |
| Facilities                    | 20% | 30% |    35% | Con thieu endpoint/real integration cho quan ly slot                           |
| Announcements                 | 35% | 30% |    20% | Nhieu man hinh dang o muc stub/mock                                            |
| Complaints/Maintenance        | 30% | 25% |    25% | Can chot API contract that                                                     |
| Notifications                 | 60% | 40% |    35% | Co nen tang, can trigger flow day du                                           |
| Stats                         | 55% | 45% |    20% | Dashboard manager con can data that day du                                     |

Ghi chu: % la uoc luong ky thuat tinh den 2026-03-23, dung cho planning, khong phai so lieu KPI chinh thuc.

## 2. Main Business Flows

### Flow A - Auth + Role Routing

1. User dang nhap (email/password hoac Google OAuth).
2. FE luu access token.
3. FE goi /auth/me lay profile + role.
4. Dieu huong den dashboard theo role.

### Flow B - Bill to Cash

1. Resident mo bills list.
2. Xem bill detail + bill items.
3. Tao payment link.
4. User thanh toan qua gateway.
5. Webhook ve BE cap nhat bill paid.
6. Tao transaction record.
7. FE cap nhat UI theo status that.

### Flow C - Booking Moderation

1. Resident tao booking theo slot/time.
2. BE validate overlap.
3. Booking vao trang thai pending/confirmed theo policy.
4. Manager vao man booking admin xem toan bo request.
5. Manager confirm/reject/cancel va update notes.
6. FE refresh va hien thi state moi.

### Flow D - Manager Operations

1. Manager vao dashboard xem stats.
2. Theo doi bills/bookings/notifications.
3. Xu ly cac muc can can thiệp (booking, bill, complaint).

## 3. Priority and Execution Order

1. Mobile first in roadmap implementation.
2. Tuy nhien, mobile khong can replicate toan bo FE.
3. Uu tien cho mobile:
   - Auth
   - Bills/Payment
   - Booking
   - Notifications
4. Cac feature social/community co the lam phase sau.

## 4. Definition of Done for Current Phase

- Khong con mock data trong runtime luong chinh da release.
- FE production chi goi BE production.
- Swagger route va root BE route hoat dong de test nhanh.
- Co tai lieu SRS + ERD + Flows + Rules + Changelog cap nhat.

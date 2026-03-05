# Booking Detail Sheet Redesign — Design Doc

**Date:** 2026-03-05
**Status:** Approved

## Goal

Redesign the shared `BookingDetailSheet` component to support both manager and resident roles, add `numberOfParticipants` and `notes` editable fields, and add cancel buttons with role-specific logic.

## Type Changes (`lib/manager-bookings.ts`)

- Add `"cancelled"` to `ManagerBooking.status` union
- Add `numberOfParticipants?: number` to `ManagerBooking`
- Add new `UpdateBookingPayload { notes?: string; numberOfParticipants?: number }` interface
- Extend `UpdateBookingStatusPayload.status` to include `"cancelled"`
- Add `updateBooking()` API stub (mock)
- Update mock data: add `numberOfParticipants` to BBQ and pool entries

## Hook Changes (`hooks/use-manager-bookings.ts`)

- Add `updateBooking(id, payload)` callback alongside existing `updateStatus`

## Component Props (`BookingDetailSheet`)

```typescript
interface BookingDetailSheetProps {
  booking: ManagerBooking | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  role: "manager" | "resident";
  onUpdateStatus: (id: number, payload: UpdateBookingStatusPayload) => Promise<void>;
  onUpdateBooking: (id: number, payload: UpdateBookingPayload) => Promise<void>;
}
```

## UI Layout

```
┌─────────────────────────────────┐
│ [ServiceIcon] Chi tiết đặt chỗ  │  SheetHeader
│ Mã #7                           │
├─────────────────────────────────┤
│ [StatusBadge]    [FacilityPill] │  prominent at top
├─────────────────────────────────┤
│ Cư dân (manager only)           │
│   Nguyễn Văn An · A101          │
├─────────────────────────────────┤
│ Thời gian                       │
│   15/03/2026 · 11:00 – 14:00   │
├─────────────────────────────────┤
│ Số người tham gia               │
│   [  3  ] [Lưu][Hủy]           │  inline number input, save on change
├─────────────────────────────────┤
│ Ghi chú                         │
│   [textarea: Tiệc sinh nhật ]   │  click-to-edit textarea
│                   [Lưu][Hủy]   │  buttons appear on change
├─────────────────────────────────┤
│ Đặt lúc: 05/03/2026 10:00      │
├─────────────────────────────────┤
│        [Action buttons]         │
└─────────────────────────────────┘
```

## Status Badge (updated)

| Status | Label | Color |
|--------|-------|-------|
| pending | Đang chờ | amber |
| confirmed | Đã duyệt | green |
| rejected | Từ chối | red |
| cancelled | Đã hủy | gray |

## Action Button Logic

| Role | Status | Buttons |
|------|--------|---------|
| manager | pending | Duyệt (green) · Từ chối (destructive) |
| manager | confirmed | Hủy booking (destructive outline) |
| manager | rejected / cancelled | none |
| resident | pending | Hủy booking (destructive outline) |
| resident | confirmed | Hủy booking (destructive outline) |
| resident | rejected / cancelled | none |

## Inline Edit Behavior

- Both `numberOfParticipants` and `notes` are always rendered as input/textarea
- On change from initial value → Save + Cancel buttons appear
- Save: calls `onUpdateBooking(id, { field: value })`, hides buttons, updates local state
- Cancel: reverts to booking value, hides buttons
- Both roles (manager + resident) can edit both fields

## Files Changed

1. `src/lib/manager-bookings.ts` — types, mock data, `updateBooking()` stub
2. `src/hooks/use-manager-bookings.ts` — add `updateBooking` action
3. `src/components/manager/bookings/booking-detail-sheet.tsx` — full redesign
4. `src/components/manager/bookings/booking-table.tsx` — add `cancelled` to statusConfig
5. `src/components/manager/bookings/booking-management-client.tsx` — pass `role` + `onUpdateBooking`

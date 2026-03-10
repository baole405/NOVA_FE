# Booking Detail Sheet Redesign Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Redesign `BookingDetailSheet` into a shared role-aware component supporting both manager and resident, with inline-editable `numberOfParticipants` + `notes` fields, `cancelled` status, and cancel buttons per role/status logic.

**Architecture:** 5 files change in order: lib types first → hook → sheet component (full rewrite) → table (add cancelled + new props) → client wrapper (wire everything). The sheet is the only component that knows about `role`; BookingTable and BookingManagementClient act as pass-throughs.

**Tech Stack:** Next.js 15 App Router, TypeScript strict, shadcn/ui (Sheet, Badge, Button, Input, Textarea, Label), Tailwind CSS v4, date-fns v3, Biome linter

---

### Task 1: Update types and mock data in `lib/manager-bookings.ts`

**Files:**
- Modify: `src/lib/manager-bookings.ts`

**Step 1: Rewrite the file with all type updates**

Replace the entire file with:

```typescript
// Manager-facing booking API

export interface ManagerBooking {
  id: number;
  serviceType: "parking" | "bbq" | "swimming_pool";
  slotNumber?: string;
  date: string;
  endDate?: string;
  startTime: string;
  endTime: string;
  status: "pending" | "confirmed" | "rejected" | "cancelled";
  notes?: string;
  numberOfParticipants?: number;
  createdAt: string;
  residentName: string;
  apartmentUnit: string;
}

export interface UpdateBookingStatusPayload {
  status: "confirmed" | "rejected" | "cancelled";
}

export interface UpdateBookingPayload {
  notes?: string;
  numberOfParticipants?: number;
}

// Mock data — remove when backend admin endpoints are ready
export const MOCK_MANAGER_BOOKINGS: ManagerBooking[] = [
  {
    id: 1,
    serviceType: "bbq",
    slotNumber: "A1",
    date: "2026-03-10",
    startTime: "10:00",
    endTime: "12:00",
    status: "pending",
    notes: "Khoảng 15 người",
    numberOfParticipants: 15,
    createdAt: "2026-03-05T08:00:00Z",
    residentName: "Nguyễn Văn An",
    apartmentUnit: "A101",
  },
  {
    id: 2,
    serviceType: "swimming_pool",
    slotNumber: "L1",
    date: "2026-03-11",
    startTime: "06:00",
    endTime: "07:00",
    status: "pending",
    numberOfParticipants: 2,
    createdAt: "2026-03-05T09:00:00Z",
    residentName: "Trần Thị Bình",
    apartmentUnit: "B205",
  },
  {
    id: 3,
    serviceType: "parking",
    slotNumber: "P12",
    date: "2026-03-06",
    endDate: "2026-04-06",
    startTime: "00:00",
    endTime: "23:59",
    status: "confirmed",
    createdAt: "2026-03-04T10:00:00Z",
    residentName: "Lê Minh Châu",
    apartmentUnit: "C302",
  },
  {
    id: 4,
    serviceType: "bbq",
    slotNumber: "B2",
    date: "2026-03-12",
    startTime: "17:00",
    endTime: "20:00",
    status: "rejected",
    notes: "Đã có nhóm khác đặt",
    numberOfParticipants: 8,
    createdAt: "2026-03-03T14:00:00Z",
    residentName: "Phạm Đức Dũng",
    apartmentUnit: "D410",
  },
  {
    id: 5,
    serviceType: "swimming_pool",
    slotNumber: "L2",
    date: "2026-03-13",
    startTime: "07:00",
    endTime: "08:00",
    status: "pending",
    numberOfParticipants: 1,
    createdAt: "2026-03-05T11:00:00Z",
    residentName: "Hoàng Thị Em",
    apartmentUnit: "A202",
  },
  {
    id: 6,
    serviceType: "parking",
    slotNumber: "P05",
    date: "2026-03-07",
    startTime: "00:00",
    endTime: "23:59",
    status: "confirmed",
    createdAt: "2026-03-02T08:00:00Z",
    residentName: "Vũ Quang Phúc",
    apartmentUnit: "B108",
  },
  {
    id: 7,
    serviceType: "bbq",
    slotNumber: "A2",
    date: "2026-03-15",
    startTime: "11:00",
    endTime: "14:00",
    status: "cancelled",
    notes: "Tiệc sinh nhật",
    numberOfParticipants: 20,
    createdAt: "2026-03-05T13:00:00Z",
    residentName: "Đặng Thị Giang",
    apartmentUnit: "C115",
  },
];

// TODO: replace mock with real API when backend adds admin endpoints
export async function getAllBookings(): Promise<ManagerBooking[]> {
  // TODO: return fetchApi<ManagerBooking[]>("/bookings/admin");
  return Promise.resolve(MOCK_MANAGER_BOOKINGS);
}

// TODO: replace mock with real API
export async function updateBookingStatus(
  id: number,
  payload: UpdateBookingStatusPayload,
): Promise<ManagerBooking> {
  // TODO: return fetchApi<ManagerBooking>(`/bookings/${id}/status`, { method: "PATCH", body: JSON.stringify(payload) });
  const booking = MOCK_MANAGER_BOOKINGS.find((b) => b.id === id);
  if (!booking) throw new Error("Booking not found");
  return Promise.resolve({ ...booking, status: payload.status });
}

// TODO: replace mock with real API
export async function updateBooking(
  id: number,
  payload: UpdateBookingPayload,
): Promise<ManagerBooking> {
  // TODO: return fetchApi<ManagerBooking>(`/bookings/${id}`, { method: "PATCH", body: JSON.stringify(payload) });
  const booking = MOCK_MANAGER_BOOKINGS.find((b) => b.id === id);
  if (!booking) throw new Error("Booking not found");
  return Promise.resolve({ ...booking, ...payload });
}
```

**Step 2: Type-check**

Run: `npm run type-check`
Expected: no errors

**Step 3: Commit**

```bash
git add src/lib/manager-bookings.ts
git commit -m "feat: add cancelled status, numberOfParticipants, UpdateBookingPayload to manager-bookings lib"
```

---

### Task 2: Update `hooks/use-manager-bookings.ts`

**Files:**
- Modify: `src/hooks/use-manager-bookings.ts`

**Step 1: Rewrite the hook with `updateBooking` added**

Replace the entire file with:

```typescript
"use client";

import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import type {
  ManagerBooking,
  UpdateBookingPayload,
  UpdateBookingStatusPayload,
} from "@/lib/manager-bookings";
import {
  getAllBookings,
  updateBooking,
  updateBookingStatus,
} from "@/lib/manager-bookings";

interface UseManagerBookingsReturn {
  bookings: ManagerBooking[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  updateStatus: (
    id: number,
    payload: UpdateBookingStatusPayload,
  ) => Promise<void>;
  updateBookingFields: (
    id: number,
    payload: UpdateBookingPayload,
  ) => Promise<void>;
}

export function useManagerBookings(): UseManagerBookingsReturn {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<ManagerBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    if (!user) return;
    try {
      setLoading(true);
      const data = await getAllBookings();
      setBookings(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load bookings");
      console.log("Failed to fetch manager bookings:", err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const updateStatus = useCallback(
    async (id: number, payload: UpdateBookingStatusPayload) => {
      const updated = await updateBookingStatus(id, payload);
      // Optimistic update: replace booking in local state
      setBookings((prev) =>
        prev.map((b) => (b.id === updated.id ? updated : b)),
      );
    },
    [],
  );

  const updateBookingFields = useCallback(
    async (id: number, payload: UpdateBookingPayload) => {
      const updated = await updateBooking(id, payload);
      // Optimistic update: replace booking in local state
      setBookings((prev) =>
        prev.map((b) => (b.id === updated.id ? updated : b)),
      );
    },
    [],
  );

  return { bookings, loading, error, refetch, updateStatus, updateBookingFields };
}
```

**Step 2: Type-check**

Run: `npm run type-check`
Expected: no errors

**Step 3: Commit**

```bash
git add src/hooks/use-manager-bookings.ts
git commit -m "feat: add updateBookingFields to useManagerBookings hook"
```

---

### Task 3: Redesign `BookingDetailSheet`

**Files:**
- Modify: `src/components/manager/bookings/booking-detail-sheet.tsx`

**Note:** shadcn/ui `Input`, `Textarea`, and `Label` components must exist. If missing, run:
```bash
npx shadcn@latest add input textarea label
```

**Step 1: Rewrite the entire component**

Replace the entire file with:

```typescript
"use client";

import { format } from "date-fns";
import { Car, Droplets, Loader2, Users, Utensils } from "lucide-react";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import type {
  ManagerBooking,
  UpdateBookingPayload,
  UpdateBookingStatusPayload,
} from "@/lib/manager-bookings";

const serviceTypeLabels: Record<ManagerBooking["serviceType"], string> = {
  parking: "Bãi đậu xe",
  bbq: "Khu BBQ",
  swimming_pool: "Hồ bơi",
};

const serviceTypeIcons: Record<ManagerBooking["serviceType"], React.ReactNode> =
  {
    parking: <Car className="h-5 w-5" />,
    bbq: <Utensils className="h-5 w-5" />,
    swimming_pool: <Droplets className="h-5 w-5" />,
  };

const statusConfig: Record<
  ManagerBooking["status"],
  { label: string; className: string }
> = {
  pending: {
    label: "Đang chờ",
    className:
      "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  },
  confirmed: {
    label: "Đã duyệt",
    className:
      "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  },
  rejected: {
    label: "Từ chối",
    className: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  },
  cancelled: {
    label: "Đã hủy",
    className:
      "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
  },
};

interface BookingDetailSheetProps {
  booking: ManagerBooking | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  role: "manager" | "resident";
  onUpdateStatus: (
    id: number,
    payload: UpdateBookingStatusPayload,
  ) => Promise<void>;
  onUpdateBooking: (
    id: number,
    payload: UpdateBookingPayload,
  ) => Promise<void>;
}

export function BookingDetailSheet({
  booking,
  open,
  onOpenChange,
  role,
  onUpdateStatus,
  onUpdateBooking,
}: BookingDetailSheetProps) {
  const [isStatusSubmitting, setIsStatusSubmitting] = useState(false);

  // Inline edit — numberOfParticipants
  const [participants, setParticipants] = useState("");
  const [participantsDirty, setParticipantsDirty] = useState(false);
  const [isSavingParticipants, setIsSavingParticipants] = useState(false);

  // Inline edit — notes
  const [notes, setNotes] = useState("");
  const [notesDirty, setNotesDirty] = useState(false);
  const [isSavingNotes, setIsSavingNotes] = useState(false);

  // Sync local edit state when booking changes (different row opened)
  useEffect(() => {
    if (booking) {
      setParticipants(String(booking.numberOfParticipants ?? ""));
      setNotes(booking.notes ?? "");
      setParticipantsDirty(false);
      setNotesDirty(false);
    }
  }, [booking]);

  if (!booking) return null;

  const status = statusConfig[booking.status];

  // Cancel button: manager only when confirmed; resident when pending or confirmed
  const showCancelButton =
    (role === "manager" && booking.status === "confirmed") ||
    (role === "resident" &&
      (booking.status === "pending" || booking.status === "confirmed"));

  // Approve + Reject: manager only when pending
  const showApproveReject = role === "manager" && booking.status === "pending";

  const handleStatusAction = async (
    newStatus: "confirmed" | "rejected" | "cancelled",
  ) => {
    setIsStatusSubmitting(true);
    try {
      await onUpdateStatus(booking.id, { status: newStatus });
      onOpenChange(false);
    } catch (err) {
      console.log("Failed to update booking status:", err);
    } finally {
      setIsStatusSubmitting(false);
    }
  };

  const handleSaveParticipants = async () => {
    setIsSavingParticipants(true);
    try {
      const value =
        participants.trim() === "" ? undefined : Number(participants);
      await onUpdateBooking(booking.id, { numberOfParticipants: value });
      setParticipantsDirty(false);
    } catch (err) {
      console.log("Failed to save participants:", err);
    } finally {
      setIsSavingParticipants(false);
    }
  };

  const handleCancelParticipants = () => {
    setParticipants(String(booking.numberOfParticipants ?? ""));
    setParticipantsDirty(false);
  };

  const handleSaveNotes = async () => {
    setIsSavingNotes(true);
    try {
      await onUpdateBooking(booking.id, { notes: notes.trim() || undefined });
      setNotesDirty(false);
    } catch (err) {
      console.log("Failed to save notes:", err);
    } finally {
      setIsSavingNotes(false);
    }
  };

  const handleCancelNotes = () => {
    setNotes(booking.notes ?? "");
    setNotesDirty(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            {serviceTypeIcons[booking.serviceType]}
            Chi tiết đặt chỗ
          </SheetTitle>
          <SheetDescription>Mã đặt chỗ #{booking.id}</SheetDescription>
        </SheetHeader>

        <div className="mt-4 space-y-5">
          {/* Status + facility pill */}
          <div className="flex items-center justify-between gap-2">
            <Badge variant="secondary" className={status.className}>
              {status.label}
            </Badge>
            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-primary/10 text-primary">
              {serviceTypeLabels[booking.serviceType]}
              {booking.slotNumber ? ` · ${booking.slotNumber}` : ""}
            </span>
          </div>

          {/* Resident info — manager only */}
          {role === "manager" && (
            <div className="p-3 rounded-lg bg-muted/50 space-y-1.5">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Cư dân
              </p>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Họ tên</span>
                <span className="font-medium">{booking.residentName}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Căn hộ</span>
                <span className="font-medium">{booking.apartmentUnit}</span>
              </div>
            </div>
          )}

          {/* Time */}
          <div className="p-3 rounded-lg bg-muted/50 space-y-1.5">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Thời gian
            </p>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Ngày</span>
              <span className="font-medium">
                {format(new Date(booking.date), "dd/MM/yyyy")}
                {booking.endDate &&
                  ` – ${format(new Date(booking.endDate), "dd/MM/yyyy")}`}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Giờ</span>
              <span className="font-medium">
                {booking.startTime.slice(0, 5)} –{" "}
                {booking.endTime.slice(0, 5)}
              </span>
            </div>
          </div>

          {/* Number of participants — inline edit */}
          <div className="space-y-2">
            <Label className="flex items-center gap-1.5 text-sm font-medium">
              <Users className="h-3.5 w-3.5" />
              Số người tham gia
            </Label>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                min={1}
                value={participants}
                onChange={(e) => {
                  setParticipants(e.target.value);
                  setParticipantsDirty(
                    e.target.value !==
                      String(booking.numberOfParticipants ?? ""),
                  );
                }}
                placeholder="Nhập số người..."
                className="w-32"
              />
              {participantsDirty && (
                <>
                  <Button
                    size="sm"
                    disabled={isSavingParticipants}
                    onClick={handleSaveParticipants}
                  >
                    {isSavingParticipants ? (
                      <Loader2 className="h-3 w-3 animate-spin" />
                    ) : (
                      "Lưu"
                    )}
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    disabled={isSavingParticipants}
                    onClick={handleCancelParticipants}
                  >
                    Hủy
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Notes — inline edit */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Ghi chú</Label>
            <Textarea
              value={notes}
              onChange={(e) => {
                setNotes(e.target.value);
                setNotesDirty(e.target.value !== (booking.notes ?? ""));
              }}
              placeholder="Thêm ghi chú..."
              className="resize-none"
              rows={3}
            />
            {notesDirty && (
              <div className="flex justify-end gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  disabled={isSavingNotes}
                  onClick={handleCancelNotes}
                >
                  Hủy
                </Button>
                <Button
                  size="sm"
                  disabled={isSavingNotes}
                  onClick={handleSaveNotes}
                >
                  {isSavingNotes ? (
                    <Loader2 className="h-3 w-3 animate-spin" />
                  ) : (
                    "Lưu"
                  )}
                </Button>
              </div>
            )}
          </div>

          <p className="text-xs text-muted-foreground">
            Đặt lúc: {format(new Date(booking.createdAt), "dd/MM/yyyy HH:mm")}
          </p>

          {/* Approve / Reject — manager + pending only */}
          {showApproveReject && (
            <div className="flex gap-3 pt-2">
              <Button
                className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                disabled={isStatusSubmitting}
                onClick={() => handleStatusAction("confirmed")}
              >
                {isStatusSubmitting && (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                )}
                Duyệt
              </Button>
              <Button
                variant="destructive"
                className="flex-1"
                disabled={isStatusSubmitting}
                onClick={() => handleStatusAction("rejected")}
              >
                Từ chối
              </Button>
            </div>
          )}

          {/* Cancel button */}
          {showCancelButton && (
            <div className="pt-2">
              <Button
                variant="outline"
                className="w-full border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
                disabled={isStatusSubmitting}
                onClick={() => handleStatusAction("cancelled")}
              >
                {isStatusSubmitting && (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                )}
                Hủy booking
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
```

**Step 2: Type-check**

Run: `npm run type-check`
Expected: no errors (if Input/Textarea/Label missing, install them first — see note above)

**Step 3: Commit**

```bash
git add src/components/manager/bookings/booking-detail-sheet.tsx
git commit -m "feat: redesign BookingDetailSheet with role prop, inline edits, cancel button"
```

---

### Task 4: Update `BookingTable` — add `cancelled` status + new props

**Files:**
- Modify: `src/components/manager/bookings/booking-table.tsx`

**Step 1: Add `cancelled` to statusConfig and `SelectItem`**

Replace the `statusConfig` object (lines 35–53):

```typescript
const statusConfig: Record<
  ManagerBooking["status"],
  { label: string; className: string }
> = {
  pending: {
    label: "Đang chờ",
    className:
      "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  },
  confirmed: {
    label: "Đã duyệt",
    className:
      "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  },
  rejected: {
    label: "Từ chối",
    className: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  },
  cancelled: {
    label: "Đã hủy",
    className:
      "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
  },
};
```

**Step 2: Update `BookingTableProps` to add `role` and `onUpdateBooking`**

Replace the `BookingTableProps` interface:

```typescript
interface BookingTableProps {
  bookings: ManagerBooking[];
  role: "manager" | "resident";
  onUpdateStatus: (
    id: number,
    payload: UpdateBookingStatusPayload,
  ) => Promise<void>;
  onUpdateBooking: (
    id: number,
    payload: UpdateBookingPayload,
  ) => Promise<void>;
}
```

**Step 3: Update import to include `UpdateBookingPayload`**

Change the import from `@/lib/manager-bookings`:

```typescript
import type {
  ManagerBooking,
  UpdateBookingPayload,
  UpdateBookingStatusPayload,
} from "@/lib/manager-bookings";
```

**Step 4: Update function signature and pass new props to `BookingDetailSheet`**

Change the function signature:

```typescript
export function BookingTable({
  bookings,
  role,
  onUpdateStatus,
  onUpdateBooking,
}: BookingTableProps) {
```

Add `"Đã hủy"` filter option in the status Select — after the `rejected` item:

```tsx
<SelectItem value="cancelled">Đã hủy</SelectItem>
```

Pass `role` and `onUpdateBooking` to `BookingDetailSheet` (replace current `<BookingDetailSheet ...>`):

```tsx
<BookingDetailSheet
  booking={selectedBooking}
  open={sheetOpen}
  onOpenChange={setSheetOpen}
  role={role}
  onUpdateStatus={onUpdateStatus}
  onUpdateBooking={onUpdateBooking}
/>
```

**Step 5: Type-check**

Run: `npm run type-check`
Expected: no errors

**Step 6: Commit**

```bash
git add src/components/manager/bookings/booking-table.tsx
git commit -m "feat: add cancelled status and role/onUpdateBooking props to BookingTable"
```

---

### Task 5: Update `BookingManagementClient` to wire new props

**Files:**
- Modify: `src/components/manager/bookings/booking-management-client.tsx`

**Step 1: Rewrite the file**

Replace the entire file with:

```typescript
"use client";

import { Loader2 } from "lucide-react";
import { BookingTable } from "@/components/manager/bookings/booking-table";
import { useManagerBookings } from "@/hooks/use-manager-bookings";

export function BookingManagementClient() {
  const { bookings, loading, error, updateStatus, updateBookingFields } =
    useManagerBookings();

  if (loading) {
    return (
      <div className="flex justify-center items-center p-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center text-destructive">
        Lỗi khi tải dữ liệu: {error}
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 md:p-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-primary">
          Quản lý Đặt chỗ
        </h1>
        <p className="text-muted-foreground mt-1">
          Duyệt và từ chối các yêu cầu đặt tiện ích
        </p>
      </div>

      <BookingTable
        bookings={bookings}
        role="manager"
        onUpdateStatus={updateStatus}
        onUpdateBooking={updateBookingFields}
      />
    </div>
  );
}
```

**Step 2: Type-check + lint**

Run: `npm run type-check && npm run lint`
Expected: no errors

**Step 3: Commit**

```bash
git add src/components/manager/bookings/booking-management-client.tsx
git commit -m "feat: wire role and onUpdateBooking into BookingManagementClient"
```

---

### Task 6: Manual verification checklist

Start dev server: `npm run dev`
Open: `http://localhost:5000/manager/bookings`

- [ ] Table badge shows "Đã hủy" (gray) for booking #7
- [ ] Status filter has "Đã hủy" option
- [ ] Click pending booking (#1, #2, #5) → Sheet shows **Duyệt** + **Từ chối**, no cancel button
- [ ] Click confirmed booking (#3, #6) → Sheet shows **Hủy booking** button only
- [ ] Click rejected booking (#4) → Sheet has no action buttons
- [ ] Click cancelled booking (#7) → Sheet shows "Đã hủy" badge, no action buttons
- [ ] Resident info section visible for manager role
- [ ] Số người tham gia shows correct value from mock data
- [ ] Change số người → Lưu / Hủy buttons appear; click Lưu → buttons disappear, value stays
- [ ] Change số người → click Hủy → value reverts
- [ ] Change ghi chú → Lưu / Hủy appear; click Lưu → note saved
- [ ] Change ghi chú → click Hủy → note reverts
- [ ] Click **Duyệt** → Sheet closes, badge updates to "Đã duyệt"
- [ ] Click **Hủy booking** on confirmed → Sheet closes, badge updates to "Đã hủy"
- [ ] Run `npm run type-check` → 0 errors
- [ ] Run `npm run lint` → 0 errors

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

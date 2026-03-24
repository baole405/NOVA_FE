import { fetchApi } from "@/lib/api-client";

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
  // numberOfParticipants removed — cannot be edited after booking
}
export async function getAllBookings(): Promise<ManagerBooking[]> {
  return fetchApi<ManagerBooking[]>("/bookings/admin");
}

export async function updateBookingStatus(
  id: number,
  payload: UpdateBookingStatusPayload,
): Promise<ManagerBooking> {
  return fetchApi<ManagerBooking>(`/bookings/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

export async function updateBooking(
  id: number,
  payload: UpdateBookingPayload,
): Promise<ManagerBooking> {
  return fetchApi<ManagerBooking>(`/bookings/${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

// Bookings API

import { fetchApi } from "./api-client";

export interface Booking {
  id: number;
  serviceType: "parking" | "bbq" | "swimming_pool";
  slotNumber?: string;
  date: string;
  endDate?: string;
  startTime: string;
  endTime: string;
  status: string;
  notes?: string;
  createdAt: string;
}

export interface CreateBookingPayload {
  serviceType: "parking" | "bbq" | "swimming_pool";
  date: string;
  startTime: string;
  endTime: string;
  slotNumber?: string;
  endDate?: string;
  notes?: string;
  price?: number;
}

export async function getMyBookings(): Promise<Booking[]> {
  return fetchApi<Booking[]>("/bookings/me");
}

export async function createBooking(
  payload: CreateBookingPayload,
): Promise<Booking> {
  return fetchApi<Booking>("/bookings", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

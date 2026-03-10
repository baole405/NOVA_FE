// Facility data — CRUD managed by managers, consumed by residents when booking

// --- Parking ---
export interface ParkingSlot {
  id: string; // "A1", "B3"
  label: string; // display: "A1 - Tầng B1 (Ô tô)"
  floor: string; // "B1", "B2"
  type: "car" | "motorbike" | "bicycle";
  status: "available" | "occupied" | "maintenance";
  pricePerDay: number;
  pricePerMonth: number;
}

// --- BBQ ---
export interface BBQSlot {
  id: string; // "Area 1"
  name: string; // "Khu vực 1 (Sân thượng)"
  capacity: number; // max people
  pricePerHour: number;
  status: "available" | "maintenance";
}

// --- Pool ---
export interface PoolSlot {
  id: string; // "Pool-1" (thường chỉ 1)
  name: string; // "Hồ bơi Vô cực"
  location: string; // "Tầng thượng Block A"
  capacity: number; // max people per session
  pricePerHour: number;
  openTime: string; // "08:00"
  closeTime: string; // "22:00"
  maxDurationHours: number; // 4
  status: "available" | "maintenance";
}

export type FacilityType = "parking" | "bbq" | "swimming_pool";

// --- Mock data ---
export const MOCK_PARKING_SLOTS: ParkingSlot[] = [
  {
    id: "A1",
    label: "A1 - Tầng B1 (Ô tô)",
    floor: "B1",
    type: "car",
    status: "available",
    pricePerDay: 20000,
    pricePerMonth: 500000,
  },
  {
    id: "A2",
    label: "A2 - Tầng B1 (Ô tô)",
    floor: "B1",
    type: "car",
    status: "available",
    pricePerDay: 20000,
    pricePerMonth: 500000,
  },
  {
    id: "A3",
    label: "A3 - Tầng B1 (Ô tô)",
    floor: "B1",
    type: "car",
    status: "occupied",
    pricePerDay: 20000,
    pricePerMonth: 500000,
  },
  {
    id: "A4",
    label: "A4 - Tầng B1 (Ô tô)",
    floor: "B1",
    type: "car",
    status: "available",
    pricePerDay: 20000,
    pricePerMonth: 500000,
  },
  {
    id: "A5",
    label: "A5 - Tầng B1 (Ô tô)",
    floor: "B1",
    type: "car",
    status: "maintenance",
    pricePerDay: 20000,
    pricePerMonth: 500000,
  },
  {
    id: "B1",
    label: "B1 - Tầng B1 (Xe máy)",
    floor: "B1",
    type: "motorbike",
    status: "available",
    pricePerDay: 5000,
    pricePerMonth: 120000,
  },
  {
    id: "B2",
    label: "B2 - Tầng B1 (Xe máy)",
    floor: "B1",
    type: "motorbike",
    status: "available",
    pricePerDay: 5000,
    pricePerMonth: 120000,
  },
  {
    id: "B3",
    label: "B3 - Tầng B1 (Xe máy)",
    floor: "B1",
    type: "motorbike",
    status: "occupied",
    pricePerDay: 5000,
    pricePerMonth: 120000,
  },
  {
    id: "P12",
    label: "P12 - Tầng B2 (Ô tô)",
    floor: "B2",
    type: "car",
    status: "available",
    pricePerDay: 20000,
    pricePerMonth: 500000,
  },
  {
    id: "P05",
    label: "P05 - Tầng B2 (Xe máy)",
    floor: "B2",
    type: "motorbike",
    status: "available",
    pricePerDay: 5000,
    pricePerMonth: 120000,
  },
];

export const MOCK_BBQ_SLOTS: BBQSlot[] = [
  {
    id: "BBQ-1",
    name: "Khu vực 1 (Hồ bơi)",
    capacity: 20,
    pricePerHour: 150000,
    status: "available",
  },
  {
    id: "BBQ-2",
    name: "Khu vực 2 (Sân thượng)",
    capacity: 30,
    pricePerHour: 200000,
    status: "available",
  },
  {
    id: "BBQ-3",
    name: "Khu vực 3 (Sân vườn)",
    capacity: 25,
    pricePerHour: 180000,
    status: "available",
  },
  {
    id: "BBQ-4",
    name: "Khu vực 4 (Ven sông)",
    capacity: 15,
    pricePerHour: 250000,
    status: "maintenance",
  },
  {
    id: "BBQ-5",
    name: "Khu vực 5 (VIP)",
    capacity: 50,
    pricePerHour: 350000,
    status: "available",
  },
];

export const MOCK_POOL_SLOTS: PoolSlot[] = [
  {
    id: "POOL-1",
    name: "Hồ bơi Vô cực",
    location: "Tầng thượng Block A",
    capacity: 30,
    pricePerHour: 50000,
    openTime: "08:00",
    closeTime: "22:00",
    maxDurationHours: 4,
    status: "available",
  },
];

// --- API stubs (TODO: replace with fetchApi when BE ready) ---
export async function getParkingSlots(): Promise<ParkingSlot[]> {
  // TODO: return fetchApi<ParkingSlot[]>("/facilities/parking");
  return Promise.resolve(MOCK_PARKING_SLOTS);
}

export async function getBBQSlots(): Promise<BBQSlot[]> {
  // TODO: return fetchApi<BBQSlot[]>("/facilities/bbq");
  return Promise.resolve(MOCK_BBQ_SLOTS);
}

export async function getPoolSlots(): Promise<PoolSlot[]> {
  // TODO: return fetchApi<PoolSlot[]>("/facilities/pool");
  return Promise.resolve(MOCK_POOL_SLOTS);
}

export async function createParkingSlot(
  data: Omit<ParkingSlot, "id">,
): Promise<ParkingSlot> {
  // TODO: return fetchApi<ParkingSlot>("/facilities/parking", { method: "POST", body: JSON.stringify(data) });
  const newSlot: ParkingSlot = { ...data, id: `P${Date.now()}` };
  MOCK_PARKING_SLOTS.push(newSlot);
  return Promise.resolve(newSlot);
}

export async function updateParkingSlot(
  id: string,
  data: Partial<ParkingSlot>,
): Promise<ParkingSlot> {
  // TODO: return fetchApi<ParkingSlot>(`/facilities/parking/${id}`, { method: "PATCH", body: JSON.stringify(data) });
  const idx = MOCK_PARKING_SLOTS.findIndex((s) => s.id === id);
  if (idx === -1) throw new Error("Slot not found");
  MOCK_PARKING_SLOTS[idx] = { ...MOCK_PARKING_SLOTS[idx], ...data };
  return Promise.resolve(MOCK_PARKING_SLOTS[idx]);
}

export async function deleteParkingSlot(id: string): Promise<void> {
  // TODO: return fetchApi<void>(`/facilities/parking/${id}`, { method: "DELETE" });
  const idx = MOCK_PARKING_SLOTS.findIndex((s) => s.id === id);
  if (idx !== -1) MOCK_PARKING_SLOTS.splice(idx, 1);
}

export async function createBBQSlot(
  data: Omit<BBQSlot, "id">,
): Promise<BBQSlot> {
  // TODO: return fetchApi<BBQSlot>("/facilities/bbq", { method: "POST", body: JSON.stringify(data) });
  const newSlot: BBQSlot = { ...data, id: `BBQ-${Date.now()}` };
  MOCK_BBQ_SLOTS.push(newSlot);
  return Promise.resolve(newSlot);
}

export async function updateBBQSlot(
  id: string,
  data: Partial<BBQSlot>,
): Promise<BBQSlot> {
  // TODO: return fetchApi<BBQSlot>(`/facilities/bbq/${id}`, { method: "PATCH", body: JSON.stringify(data) });
  const idx = MOCK_BBQ_SLOTS.findIndex((s) => s.id === id);
  if (idx === -1) throw new Error("BBQ slot not found");
  MOCK_BBQ_SLOTS[idx] = { ...MOCK_BBQ_SLOTS[idx], ...data };
  return Promise.resolve(MOCK_BBQ_SLOTS[idx]);
}

export async function deleteBBQSlot(id: string): Promise<void> {
  // TODO: return fetchApi<void>(`/facilities/bbq/${id}`, { method: "DELETE" });
  const idx = MOCK_BBQ_SLOTS.findIndex((s) => s.id === id);
  if (idx !== -1) MOCK_BBQ_SLOTS.splice(idx, 1);
}

export async function updatePoolSlot(
  id: string,
  data: Partial<PoolSlot>,
): Promise<PoolSlot> {
  // TODO: return fetchApi<PoolSlot>(`/facilities/pool/${id}`, { method: "PATCH", body: JSON.stringify(data) });
  const idx = MOCK_POOL_SLOTS.findIndex((s) => s.id === id);
  if (idx === -1) throw new Error("Pool slot not found");
  MOCK_POOL_SLOTS[idx] = { ...MOCK_POOL_SLOTS[idx], ...data };
  return Promise.resolve(MOCK_POOL_SLOTS[idx]);
}

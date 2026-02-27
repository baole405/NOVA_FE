// User-related types

export interface Apartment {
  id: string;
  unitNumber: string; // Số căn hộ (vd: A101)
  floor: number;
  block: string; // Tòa nhà (vd: Block A)
  area: number; // Diện tích m2
}

export interface Vehicle {
  id: string;
  imageUrl?: string;
  type: "car" | "motorbike" | "bicycle";
  licensePlate: string;
  ownerId: string; // User ID
}

export interface FamilyMember {
  id: string;
  name: string;
  relation: string; // Mối quan hệ (vd: Vợ, Con)
  dob?: string; // Ngày sinh (ISO Date)
  userId: string; // User ID
}

export interface UserProfile {
  id: string;
  name: string;
  idNumber: string; // Số CMND/CCCD
  dob?: string;
  email: string;
  phone?: string;
  avatarUrl?: string;
  role: "resident" | "owner" | "admin";
  apartment?: Apartment;
  vehicles?: Vehicle[];
  familyMembers?: FamilyMember[];
}

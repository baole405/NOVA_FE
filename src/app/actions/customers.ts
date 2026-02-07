"use server";

import type { Apartment } from "@/types";

// Mock data store (in production, this would interact with the database)
interface CreateCustomerData {
  name: string;
  email: string;
  phone?: string;
  idNumber?: string;
  dob?: string;
  role: "resident" | "owner";
  apartment: {
    unitNumber: string;
    block: string;
    floor: number;
    area: number;
  };
}

interface CreateCustomerResult {
  success: boolean;
  message?: string;
  data?: {
    id: string;
    name: string;
    email: string;
    apartment: Apartment;
  };
}

/**
 * Server action to create a new customer account
 * In production, this would:
 * 1. Validate the user is an admin/manager
 * 2. Insert into the database using Drizzle ORM
 * 3. Send welcome email to the new customer
 */
export async function createCustomerAccount(
  data: CreateCustomerData,
): Promise<CreateCustomerResult> {
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // FUTURE: Replace with actual database insertion using Drizzle ORM
    // Example:
    // const [user] = await db.insert(users).values({
    //   name: data.name,
    //   email: data.email,
    //   phone: data.phone,
    //   idNumber: data.idNumber,
    //   dob: data.dob,
    //   role: data.role,
    // }).returning();
    //
    // const [apartment] = await db.insert(apartments).values({
    //   userId: user.id,
    //   unitNumber: data.apartment.unitNumber,
    //   block: data.apartment.block,
    //   floor: data.apartment.floor,
    //   area: data.apartment.area,
    // }).returning();

    // Mock validation - check if email already exists
    if (data.email === "existing@example.com") {
      return {
        success: false,
        message: "Email này đã được sử dụng",
      };
    }

    // Mock successful creation
    const mockId = `user_${Date.now()}`;
    const apartmentId = `apt_${Date.now()}`;

    console.log("Creating customer account:", {
      id: mockId,
      ...data,
    });

    return {
      success: true,
      message: "Tạo tài khoản thành công",
      data: {
        id: mockId,
        name: data.name,
        email: data.email,
        apartment: {
          id: apartmentId,
          unitNumber: data.apartment.unitNumber,
          block: data.apartment.block,
          floor: data.apartment.floor,
          area: data.apartment.area,
        },
      },
    };
  } catch (error) {
    console.error("Error creating customer account:", error);
    return {
      success: false,
      message: "Có lỗi xảy ra khi tạo tài khoản",
    };
  }
}

/**
 * Server action to get all customers (for listing page)
 * FUTURE: Implement with Drizzle ORM
 */
export async function getCustomers() {
  // Mock data
  return {
    success: true,
    data: [
      {
        id: "1",
        name: "Nguyễn Văn A",
        email: "nguyenvana@example.com",
        role: "resident",
        apartment: {
          id: "apt_1",
          unitNumber: "A101",
          block: "Block A",
          floor: 1,
          area: 50,
        },
      },
    ],
  };
}

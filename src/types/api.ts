// Generic API types and re-exports

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Re-export all backend DTOs
export * from "./dto";

// Re-export all entity-specific types
export * from "./auth";
export * from "./bills";
export * from "./notifications";
export * from "./transactions";
export * from "./user";

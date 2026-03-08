// Role values returned by backend JWT — change these when backend role values are confirmed
export const ROLES = {
  MANAGER: "manager",
  RESIDENT: "resident",
} as const;

export type AppRole = (typeof ROLES)[keyof typeof ROLES];

// Route prefixes for role-based routing
export const MANAGER_ROUTE_PREFIX = "/manager";
export const RESIDENT_DEFAULT_ROUTE = "/dashboard";
export const MANAGER_DEFAULT_ROUTE = "/manager";
export const LOGIN_ROUTE = "/login";

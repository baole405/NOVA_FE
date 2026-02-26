// Backend DTOs for auth API

export interface User {
  id: number;
  username: string;
  email: string;
  fullName?: string;
  role?: string;
  phoneNumber?: string;
  image?: string;
}

export interface LoginPayload {
  usernameOrEmail: string;
  password: string;
}

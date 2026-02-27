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

export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
  fullName: string;
  phoneNumber: string;
}

export interface RegisterResponse {
  user: User;
  access_token: string;
}

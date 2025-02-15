
import { Dictionary, RegistrationFormData } from "./registration";

export type { Dictionary, RegistrationFormData };

export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: number;
    username: string;
    role: string;
  };
}

export interface RegistrationResponse {
  id: number;
  status: "pending" | "approved" | "rejected";
  fullName: string;
  email: string;
  date: string;
  message?: string;
  iin?: string;
  mobilePhone?: string;
}

export interface DictionaryResponse {
  [key: string]: Dictionary[];
}

export interface RegistrationDetailsResponse extends RegistrationFormData {
  id: number;
  status: "pending" | "approved" | "rejected";
  date: string;
}

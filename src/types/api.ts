
import { RegistrationFormData,initRegistrationFormData} from "./registration";
import { Dictionary, dictionaryWithLabel } from "./dictionary";

export type { RegistrationFormData,Dictionary  };
export {initRegistrationFormData, dictionaryWithLabel};
export interface Error {
    status: string;
    code: number;
    message: string;
}
export interface ApiResponse<T> {
  data: T;
  error?: Error;
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
  ticketNumber: number;
  status: "pending" | "reregistration";
}

export interface RegistrationDetailsResponse extends RegistrationFormData {
  id: number;
  status: "pending" | "approved" | "rejected";
  date: string;
}
export interface Paging {
    skip?: number
    limit?: number
    orderBy?: string
    order?: number
}
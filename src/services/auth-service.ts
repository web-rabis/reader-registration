
import { LoginRequest, LoginResponse, ApiResponse } from "@/types/api";
import apiClient from "@/services/api-client.ts";
import {clearStorageKeys, KEY_PAGING, KEY_SEARCH} from "@/lib/stateStorage.ts";

export const authService = {
  login: async (credentials: LoginRequest): Promise<ApiResponse<LoginResponse>> => {
      clearStorageKeys([KEY_SEARCH, KEY_PAGING ]);
    return await apiClient.post("/v1/admin/auth/sign-in", credentials);
  },

  logout: () => {
      clearStorageKeys([KEY_SEARCH, KEY_PAGING ]);
    localStorage.removeItem("librarian-token");
  },
};


import { LoginRequest, LoginResponse, ApiResponse } from "@/types/api";

export const authService = {
  login: async (credentials: LoginRequest): Promise<ApiResponse<LoginResponse>> => {
    // В реальном приложении это будет реальный API-запрос
    if (credentials.username === "admin" && credentials.password === "admin") {
      return {
        status: 200,
        data: {
          token: "dummy-jwt-token",
          user: {
            id: 1,
            username: "admin",
            role: "librarian",
          },
        },
      };
    }
    throw new Error("Invalid credentials");
  },

  logout: () => {
    localStorage.removeItem("librarian-token");
  },
};


import { RegistrationFormData, ApiResponse, RegistrationResponse } from "@/types/api";
import apiClient from "./api-client";

export const registrationService = {
  submit: async (formData: RegistrationFormData): Promise<ApiResponse<RegistrationResponse>> => {
    // В будущем здесь будет реальный API-запрос
    // return await apiClient.post("/registrations", formData);
    return {
      status: 200,
      data: {
        id: Math.floor(Math.random() * 1000),
        status: "pending",
        message: "Заявка успешно отправлена",
      },
    };
  },

  getAll: async (): Promise<ApiResponse<RegistrationResponse[]>> => {
    // В будущем здесь будет реальный API-запрос
    // return await apiClient.get("/registrations");
    return {
      status: 200,
      data: [
        {
          id: 1,
          status: "pending",
          message: "На рассмотрении",
        },
        {
          id: 2,
          status: "approved",
          message: "Одобрено",
        },
      ],
    };
  },

  approve: async (id: number): Promise<ApiResponse<RegistrationResponse>> => {
    // В будущем здесь будет реальный API-запрос
    // return await apiClient.post(`/registrations/${id}/approve`);
    return {
      status: 200,
      data: {
        id,
        status: "approved",
        message: "Заявка одобрена",
      },
    };
  },

  reject: async (id: number): Promise<ApiResponse<RegistrationResponse>> => {
    // В будущем здесь будет реальный API-запрос
    // return await apiClient.post(`/registrations/${id}/reject`);
    return {
      status: 200,
      data: {
        id,
        status: "rejected",
        message: "Заявка отклонена",
      },
    };
  },
};


import {
    RegistrationFormData,
    ApiResponse,
    RegistrationResponse,
} from "@/types/api";
import apiClient from "./api-client";

export const registrationService = {
  submit: async (formData: RegistrationFormData): Promise<ApiResponse<RegistrationResponse>> => {
    return await apiClient.post("/v1/reader/registration", formData);
    // return {
    //   status: 200,
    //   data: {
    //     id: Math.floor(Math.random() * 1000),
    //     status: "pending",
    //     fullName: `${formData.lastName} ${formData.firstName}`,
    //     email: formData.email,
    //     date: new Date().toISOString().split('T')[0],
    //     message: "Заявка успешно отправлена",
    //   },
    // };
  },


};

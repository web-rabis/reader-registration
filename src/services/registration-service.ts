import { RegistrationFormData, ApiResponse, RegistrationResponse, RegistrationDetailsResponse } from "@/types/api";
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
        fullName: `${formData.lastName} ${formData.firstName}`,
        email: formData.email,
        date: new Date().toISOString().split('T')[0],
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
          fullName: "Иванов Иван Иванович",
          email: "ivanov@example.com",
          date: "2024-03-20",
          message: "На рассмотрении",
          iin: "880101300123",
          mobilePhone: "+7 (701) 123-45-67",
        },
        {
          id: 2,
          status: "approved",
          fullName: "Петрова Мария Сергеевна",
          email: "petrova@example.com",
          date: "2024-03-19",
          message: "Одобрено",
          iin: "900202400234",
          mobilePhone: "+7 (702) 234-56-78",
        },
        {
          id: 3,
          status: "rejected",
          fullName: "Сидоров Алексей Петрович",
          email: "sidorov@example.com",
          date: "2024-03-18",
          message: "Отклонено",
          iin: "850303500345",
          mobilePhone: "+7 (703) 345-67-89",
        },
        {
          id: 4,
          status: "pending",
          fullName: "Кузнецова Елена Александровна",
          email: "kuznetsova@example.com",
          date: "2024-03-17",
          message: "На рассмотрении",
          iin: "920404600456",
          mobilePhone: "+7 (704) 456-78-90",
        },
        {
          id: 5,
          status: "approved",
          fullName: "Смирнов Дмитрий Иванович",
          email: "smirnov@example.com",
          date: "2024-03-16",
          message: "Одобрено",
          iin: "870505700567",
          mobilePhone: "+7 (705) 567-89-01",
        },
        {
          id: 6,
          status: "pending",
          fullName: "Волкова Анна Михайловна",
          email: "volkova@example.com",
          date: "2024-03-15",
          message: "На рассмотрении",
          iin: "930606800678",
          mobilePhone: "+7 (706) 678-90-12",
        },
        {
          id: 7,
          status: "approved",
          fullName: "Морозов Игорь Сергеевич",
          email: "morozov@example.com",
          date: "2024-03-14",
          message: "Одобрено",
          iin: "890707900789",
          mobilePhone: "+7 (707) 789-01-23",
        },
        {
          id: 8,
          status: "rejected",
          fullName: "Новикова Ольга Владимировна",
          email: "novikova@example.com",
          date: "2024-03-13",
          message: "Отклонено",
          iin: "940808000890",
          mobilePhone: "+7 (708) 890-12-34",
        }
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
        fullName: "Тестов Тест Тестович",
        email: "test@example.com",
        date: new Date().toISOString().split('T')[0],
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
        fullName: "Тестов Тест Тестович",
        email: "test@example.com",
        date: new Date().toISOString().split('T')[0],
        message: "Заявка отклонена",
      },
    };
  },

  getById: async (id: number): Promise<ApiResponse<RegistrationDetailsResponse>> => {
    // В будущем здесь будет реальный API-запрос
    // return await apiClient.get(`/registrations/${id}`);
    return {
      status: 200,
      data: {
        id,
        photo: null,
        iin: "123456789012",
        lastName: "Иванов",
        firstName: "Иван",
        birthDate: "1990-01-01",
        address: "г. Алматы, ул. Примерная, 1",
        phoneNumber: "+7 (727) 123-45-67",
        mobilePhone: "+7 (701) 123-45-67",
        email: "ivanov@example.com",
        gender: 1,
        education: 1,
        socialStatus: 1,
        specialization: 1,
        institute: 1,
        faculty: 1,
        course: "4",
        workplace: "ТОО Рога и Копыта",
        position: "Инженер",
        academicDegree: 1,
        status: "pending",
        date: "2024-03-20",
      },
    };
  },

  update: async (id: number, formData: RegistrationFormData): Promise<ApiResponse<RegistrationResponse>> => {
    // В будущем здесь будет реальный API-запрос
    // return await apiClient.put(`/registrations/${id}`, formData);
    return {
      status: 200,
      data: {
        id,
        status: "pending",
        fullName: `${formData.lastName} ${formData.firstName}`,
        email: formData.email,
        date: new Date().toISOString().split('T')[0],
        message: "Данные успешно обновлены",
      },
    };
  },
};

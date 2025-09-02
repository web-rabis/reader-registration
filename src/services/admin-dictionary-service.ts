import {ApiResponse, Dictionary} from "@/types/api.ts";
import apiClient from "@/services/api-client.ts";


export const adminDictionaryService = {
    getGenders: async (): Promise<ApiResponse<Dictionary[]>> => {
        // В будущем здесь будет реальный API-запрос
        return await apiClient.get("/v1/admin/dictionary/sex");
        // return { status: 200, data: genderDictionary };
    },
    getNationalities: async (): Promise<ApiResponse<Dictionary[]>> => {
        // В будущем здесь будет реальный API-запрос
        return await apiClient.get("/v1/admin/dictionary/nationality");
        // return { status: 200, data: nationalityDictionary };
    },

    getEducations: async (): Promise<ApiResponse<Dictionary[]>> => {
        return await apiClient.get("/v1/admin/dictionary/education");
        // return { status: 200, data: educationDictionary };
    },

    getSocialStatuses: async (): Promise<ApiResponse<Dictionary[]>> => {
        return await apiClient.get("/v1/admin/dictionary/social-status");
        // return { status: 200, data: socialStatusDictionary };
    },

    getSpecializations: async (): Promise<ApiResponse<Dictionary[]>> => {
        return await apiClient.get("/v1/admin/dictionary/speciality");
        // return { status: 200, data: specializationDictionary };
    },

    getInstitutes: async (): Promise<ApiResponse<Dictionary[]>> => {
        // return { status: 200, data: instituteDictionary };
        return await apiClient.get("/v1/admin/dictionary/institution");
    },

    getFaculties: async (): Promise<ApiResponse<Dictionary[]>> => {
        // return { status: 200, data: facultyDictionary };
        return await apiClient.get("/v1/admin/dictionary/faculty");
    },

    getAcademicDegrees: async (): Promise<ApiResponse<Dictionary[]>> => {
        // return { status: 200, data: academicDegreeDictionary };
        return await apiClient.get("/v1/admin/dictionary/academic-degree");
    },
    getTypeCardBackground: async (id: number): Promise<string> => {
        const response = await apiClient.get(`/v1/admin/dictionary/type-card/${id}/backgrounds`);
        return response.data; // строка base64
    },
};

import {
    ReaderByIdResponse,
    ReaderListRequest,
    ReaderListResponse, ReaderSearchParams,
} from "@/types/admin-api.ts";
import {ApiResponse, Paging} from "@/types/api.ts";
import apiClient from "@/services/api-client.ts";
import {RegistrationFormData} from "@/types/registration.ts";

export const adminReaderService = {
    getReaderAll: async (params: ReaderSearchParams, paging:Paging): Promise<ApiResponse<ReaderListResponse>> => {
        const queryParams = new URLSearchParams()
        if (paging.skip !== undefined) queryParams.append('skip', paging.skip.toString())
        if (paging.limit !== undefined) queryParams.append('limit', paging.limit.toString())
        if (params.status !== undefined) queryParams.append('status', params.status)
        if (params.query !== undefined && params.query.length >= 3) queryParams.append('query', params.query)
        if (params.advancedSearch) {
            if (params.expirationDate !== undefined) queryParams.append('expirationDate', params.expirationDate)
        }
        return await apiClient.get(`/v1/admin/reader?${queryParams.toString()}`);
    },

    approveReaderRegistration: async (id: number): Promise<ApiResponse<string>> => {
        return await apiClient.put(`/v1/admin/reader/${id}/approve`);
    },

    rejectReaderRegistration: async (id: number): Promise<ApiResponse<string>> => {
        return await apiClient.put(`/v1/admin/reader/${id}/reject`);
    },

    renewalReaderRegistration: async (id: number): Promise<ApiResponse<string>> => {
        return await apiClient.put(`/v1/admin/reader/${id}/renewal-registration`);
    },

    getReaderById: async (id: number): Promise<ApiResponse<ReaderByIdResponse>> => {
        return await apiClient.get(`/v1/admin/reader/${id}`);
    },

    getReaderPhoto: async (id: number): Promise<string> => {
        const response = await apiClient.get(`/v1/admin/reader/${id}/photo`);
        return response.data; // строка base64
    },


    updateReader: async (id: number, formData: RegistrationFormData): Promise<ApiResponse<string>> => {
        return await apiClient.put(`/v1/admin/reader/${id}`, formData);
    },
}
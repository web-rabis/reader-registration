import {ApiResponse, Dictionary} from "@/types/api.ts";
import apiClient from "@/services/api-client.ts";
import {TypeCard} from "@/types/dictionary.ts";
import {VisitStatusResponse} from "@/types/control.ts";


export const adminControlService = {
    visitsStatus: async (id:string): Promise<ApiResponse<VisitStatusResponse>> => {
        return await apiClient.get(`/v1/admin/reader/${id}/visits/status`);
    },
    visitsCheckIn: async (id:number): Promise<ApiResponse<string>> => {
        return await apiClient.post(`/v1/admin/reader/${id}/visits/check-in`);
    },
    visitsCheckOut: async (id:number): Promise<ApiResponse<string>> => {
        return await apiClient.post(`/v1/admin/reader/${id}/visits/check-out`);
    },
};

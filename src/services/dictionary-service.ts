
import { Dictionary, ApiResponse } from "@/types/api";
import apiClient from "./api-client";
import {
  genderDictionary,
  educationDictionary,
  socialStatusDictionary,
  specializationDictionary,
  instituteDictionary,
  facultyDictionary,
  academicDegreeDictionary,
} from "@/mocks/dictionaries";

export const dictionaryService = {
  getGenders: async (): Promise<ApiResponse<Dictionary[]>> => {
    // В будущем здесь будет реальный API-запрос
    // return await apiClient.get("/dictionaries/genders");
    return { status: 200, data: genderDictionary };
  },

  getEducations: async (): Promise<ApiResponse<Dictionary[]>> => {
    return { status: 200, data: educationDictionary };
  },

  getSocialStatuses: async (): Promise<ApiResponse<Dictionary[]>> => {
    return { status: 200, data: socialStatusDictionary };
  },

  getSpecializations: async (): Promise<ApiResponse<Dictionary[]>> => {
    return { status: 200, data: specializationDictionary };
  },

  getInstitutes: async (): Promise<ApiResponse<Dictionary[]>> => {
    return { status: 200, data: instituteDictionary };
  },

  getFaculties: async (): Promise<ApiResponse<Dictionary[]>> => {
    return { status: 200, data: facultyDictionary };
  },

  getAcademicDegrees: async (): Promise<ApiResponse<Dictionary[]>> => {
    return { status: 200, data: academicDegreeDictionary };
  },
};

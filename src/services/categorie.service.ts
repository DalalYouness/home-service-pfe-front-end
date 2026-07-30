import type { ServiceResponseDto } from "../types/ServiceResponseDto";
import apiClient from "./api.client";

export const categorieService = {
  getAllServices: async (): Promise<ServiceResponseDto> => {
    const response = await apiClient.get("/api/v1/service/all");
    return response.data;
  },
};

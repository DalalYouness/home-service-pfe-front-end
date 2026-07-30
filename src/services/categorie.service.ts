import type { PageResponse, ServiceResponseDto } from "../types/categorie";
import apiClient from "./api.client";

export const categorieService = {
  getAllServices: async (
    page = 0,
    size = 10,
  ): Promise<PageResponse<ServiceResponseDto>> => {
    const response = await apiClient.get<PageResponse<ServiceResponseDto>>(
      "/api/v1/service/all",
      {
        params: { page, size },
      },
    );
    return response.data;
  },
};

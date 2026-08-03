import type {
  AddServiceReqProviderDTO,
  PageResponse,
  ServiceResponseDto,
} from "../types/categorie";
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

  addServiceToProvider: async (dto: AddServiceReqProviderDTO) => {
    // parce que la reponse du backend est un message, on peut typer la réponse comme { message: string }
    const response = await apiClient.post<{ message: string }>(
      "/api/v1/expertise/add-more-service",
      dto,
    );
    return response.data;
  },
};

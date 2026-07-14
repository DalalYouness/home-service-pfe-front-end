import apiClient from "./api.client";
import type { LoginRequestDto, AuthResponseDto } from "../types/auth";

export const authService = {
  login: async (credentials: LoginRequestDto): Promise<AuthResponseDto> => {
    const response = await apiClient.post<AuthResponseDto>(
      "/api/v1/auth/login",
      credentials,
    );
    return response.data;
  },
};

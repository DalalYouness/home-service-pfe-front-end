import apiClient from "./api.client";
import type {
  LoginRequestDto,
  AuthResponseDto,
  ResetPasswordRequestDto,
} from "../types/auth";
import type { RegisterRequestDto } from "../types/register";

export const authService = {
  login: async (credentials: LoginRequestDto): Promise<AuthResponseDto> => {
    const response = await apiClient.post<AuthResponseDto>(
      "/api/v1/auth/login",
      credentials,
    );
    return response.data;
  },

  register: async (formData: RegisterRequestDto): Promise<AuthResponseDto> => {
    const response = await apiClient.post<AuthResponseDto>(
      "/api/v1/auth/register",
      formData,
    );
    return response.data;
  },

  resetPassword: async (formData: ResetPasswordRequestDto): Promise<void> => {
    await apiClient.put<void>("/api/v1/auth/reset-password", formData);
  },
};

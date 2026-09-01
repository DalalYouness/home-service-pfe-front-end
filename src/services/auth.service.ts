import apiClient from "./api.client";
import type {
  LoginRequestDto,
  AuthResponseDto,
  ResetPasswordRequestDto,
} from "../types/auth";
import type { RegisterRequestDto } from "../types/register";
import type { PageResponse, UserProfileMinDto } from "../types/admin";

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
  getAllUsers: async (
    page: number = 0,
    size: number = 10,
  ): Promise<PageResponse<UserProfileMinDto>> => {
    const response = await apiClient.get<PageResponse<UserProfileMinDto>>(
      "/api/v1/auth/users",
      {
        params: { page, size },
      },
    );
    return response.data;
  },
  createAdmin: async (data: RegisterRequestDto): Promise<UserProfileMinDto> => {
    const response = await apiClient.post<UserProfileMinDto>(
      "/api/v1/auth/add-administrator",
      data,
    );
    return response.data;
  },
};

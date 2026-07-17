import type { ChangeEmailRequestDto } from "../types/changeEmail";
import type { AuthResponseDto } from "../types/auth";
import apiClient from "./api.client";

export const profileService = {
  changeEmail: async (
    formData: ChangeEmailRequestDto,
  ): Promise<AuthResponseDto> => {
    const token = localStorage.getItem("token");
    const response = await apiClient.put(
      "/api/v1/auth/change-email",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  },
  deleteAccount: async () => {
    const token = localStorage.getItem("token");
    const response = await apiClient.delete("/api/v1/auth/delete-account", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
};

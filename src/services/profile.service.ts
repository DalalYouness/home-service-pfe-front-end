import type { ChangeEmailRequestDto } from "../types/changeEmail";
import type { AuthResponseDto } from "../types/auth";
import apiClient from "./api.client";
import type { UserProfilResponseDTO } from "../types/UserProfilResponseDTO";
import type { UpdateProfileRequestDto } from "../types/UpdateProfileRequestDto";

// j'injecte pas le token dans le service parce l'intercepteur du request d'axios fait ca
export const profileService = {
  getProfil: async (): Promise<UserProfilResponseDTO> => {
    const response = await apiClient.get("/api/v1/auth/profile");
    return response.data;
  },
  // 2. Change Email
  changeEmail: async (
    formData: ChangeEmailRequestDto,
  ): Promise<AuthResponseDto> => {
    const response = await apiClient.put<AuthResponseDto>(
      "/api/v1/auth/change-email",
      formData,
    );
    return response.data;
  },

  // 3. Delete Account
  deleteAccount: async (): Promise<void> => {
    const response = await apiClient.delete("/api/v1/auth/delete-account");
    return response.data;
  },

  updateProfil: async (
    formData: UpdateProfileRequestDto,
  ): Promise<UserProfilResponseDTO> => {
    const response = await apiClient.put(
      "/api/v1/auth/update-profile",
      formData,
    );
    return response.data;
  },
};

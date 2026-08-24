import type { ChangeEmailRequestDto } from "../types/changeEmail";
import type { AuthResponseDto } from "../types/auth";
import apiClient from "./api.client";
import type { UserProfilResponseDTO } from "../types/UserProfilResponseDTO";
import type { UpdateProfileRequestDto } from "../types/UpdateProfileRequestDto";
import type {
  BecomePrestataireDto,
  BecomePrestataiteRespDto,
  ProviderDetailsPrivate,
  ProviderDetailsPublic,
  ProvidersPublic,
  SwitchModeResponse,
} from "../types/prestataire";

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

  becomeProvider: async (
    dto: BecomePrestataireDto,
  ): Promise<BecomePrestataiteRespDto> => {
    const response = await apiClient.post<BecomePrestataiteRespDto>(
      "/api/v1/auth/become-prestataire",
      dto,
    );
    return response.data;
  },

  switchToClient: async (): Promise<SwitchModeResponse> => {
    const response = await apiClient.post("/api/v1/auth/switch-to-client");
    return response.data;
  },

  switchToProvider: async (): Promise<SwitchModeResponse> => {
    const response = await apiClient.post("/api/v1/auth/switch-to-provider");
    return response.data;
  },

  getAllProvidersByServiceId: async (
    serviceId: number,
  ): Promise<ProvidersPublic[]> => {
    const response = await apiClient.get(
      `/api/v1/expertise/${serviceId}/providers`,
    );
    return response.data;
  },

  getProviderPublicDetails: async (
    providerId: number,
  ): Promise<ProviderDetailsPublic> => {
    const response = await apiClient.get(
      `/api/v1/auth/${providerId}/public-profile`,
    );
    return response.data;
  },

  getProviderPrivateDetails: async (
    providerId: number,
  ): Promise<ProviderDetailsPrivate> => {
    const response = await apiClient.get(
      `/api/v1/auth/${providerId}/private-profil`,
    );
    return response.data;
  },
};

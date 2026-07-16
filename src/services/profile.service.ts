import axios from "axios";
import type {
  ChangeEmailRequestDto,
  ChangeEmailResponse,
} from "../types/changeEmail";

export const profileService = {
  changeEmail: async (
    formData: ChangeEmailRequestDto,
  ): Promise<ChangeEmailResponse> => {
    const response = await axios.put("/api/v1/change-email", formData);
    return response.data;
  },
};

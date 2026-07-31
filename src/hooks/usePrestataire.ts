import { useState } from "react";
import type {
  BecomePrestataireDto,
  PrestataireInfo,
} from "../types/prestataire";
import { profileService } from "../services/profile.service";
import { useAuth } from "../context/AuthContext";

type PrestataireErrors = Partial<Record<keyof PrestataireInfo, string>>;

export const usePrestataire = () => {
  // Extract context methods to handle local session role transition
  const { updateUser, updateToken } = useAuth();

  const [prestataireInfo, setPrestataireInfo] = useState<PrestataireInfo>({
    interventionArea: "",
    service: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<PrestataireErrors>({});

  // Client-side input validation strategy
  const validateForm = (): boolean => {
    const newErrors: PrestataireErrors = {};
    const areaValue = prestataireInfo.interventionArea.trim();

    if (!areaValue) {
      newErrors.interventionArea = "La zone d'intervention est obligatoire";
    } else if (areaValue.length < 3 || areaValue.length > 30) {
      newErrors.interventionArea =
        "La zone doit contenir entre 3 et 30 caractères";
    }

    if (!prestataireInfo.service) {
      newErrors.service = "Veuillez sélectionner un service";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Main submit handler responsible for role switching
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const prestataireReq: BecomePrestataireDto = {
        interventionArea: prestataireInfo.interventionArea,
      };

      // Call API to update status in Identity/Profile Service
      const response = await profileService.becomeProvider(prestataireReq);

      // 1. Update JWT Token in Context & LocalStorage with new claims
      if (response.token) {
        updateToken(response.token);
      }

      // 2. Synchronize local user role to PRESTATAIRE
      updateUser({
        roles: ["ROLE_PRESTATAIRE"],
      });
    } catch (err) {
      // Global Interceptor handles 500/Network errors; local handling if needed
      console.error("Failed to convert user to prestataire:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Clear relevant error as the user types
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    if (errors[name as keyof PrestataireInfo]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }

    setPrestataireInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return {
    prestataireInfo,
    handleChange,
    handleSubmit,
    errors,
    isLoading,
  };
};

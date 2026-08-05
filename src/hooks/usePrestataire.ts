import { useState } from "react";
import type {
  BecomePrestataireDto,
  PrestataireInfo,
} from "../types/prestataire";
import type { AddServiceReqProviderDTO } from "../types/categorie";
import { profileService } from "../services/profile.service";
import { categorieService } from "../services/categorie.service";
import { useAuth } from "../context/AuthContext";

type PrestataireErrors = Partial<Record<keyof PrestataireInfo, string>>;

export const usePrestataire = () => {
  const { updateUser, updateToken } = useAuth();

  const [prestataireInfo, setPrestataireInfo] = useState<PrestataireInfo>({
    interventionArea: "",
    serviceId: null,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<PrestataireErrors>({});

  const validateForm = (): boolean => {
    const newErrors: PrestataireErrors = {};
    const areaValue = prestataireInfo.interventionArea.trim();

    if (!areaValue) {
      newErrors.interventionArea = "La zone d'intervention est obligatoire";
    } else if (areaValue.length < 3 || areaValue.length > 30) {
      newErrors.interventionArea =
        "La zone doit contenir entre 3 et 30 caractères";
    }

    if (!prestataireInfo.serviceId) {
      newErrors.serviceId = "Veuillez sélectionner un service";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const prestataireReq: BecomePrestataireDto = {
        interventionArea: prestataireInfo.interventionArea,
      };

      // 1. Upgrade user role and fetch new JWT token
      const response = await profileService.becomeProvider(prestataireReq);

      if (response.token) {
        updateToken(response.token);
      }

      if (response.roles) {
        updateUser({
          roles: response.roles,
          activeMode: "PRESTATAIRE",
        });
      }

      // FIXED: Used categorieService instead of providerService to perform the API request
      if (prestataireInfo.serviceId) {
        const addServiceDto: AddServiceReqProviderDTO = {
          serviceId: prestataireInfo.serviceId,
        };
        await categorieService.addServiceToProvider(addServiceDto);
      }
    } catch (err) {
      console.error("Failed to convert user or add service:", err);
    } finally {
      setIsLoading(false);
    }
  };

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
      [name]: name === "serviceId" ? (value ? Number(value) : null) : value,
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

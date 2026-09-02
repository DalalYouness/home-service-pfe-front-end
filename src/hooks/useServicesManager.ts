import { useState } from "react";
import { useServices } from "./useServices";
import { categorieService } from "../services/categorie.service";
import type { CategoryRequestDto } from "../types/categorie";

export const useServicesManager = () => {
  // --- Récupérer les services ---
  const { services, isLoadingServices } = useServices();

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // --- Ajouter un service ---
  const handleAddService = async (
    dto: CategoryRequestDto,
    onSuccess?: (message: string) => void,
  ) => {
    try {
      setIsSubmitting(true);
      setError(null);

      const response = await categorieService.addService(dto);

      if (onSuccess) {
        onSuccess(response.message || "Service ajouté avec succès !");
      }

      return response;
    } catch (err: any) {
      const errorMessage =
        err?.response?.data?.message ||
        "Une erreur est survenue lors de l'ajout du service.";
      setError(errorMessage);
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- Modifier un service ---
  const handleUpdateService = async (
    id: number,
    dto: CategoryRequestDto,
    onSuccess?: (message: string) => void,
  ) => {
    try {
      setIsSubmitting(true);
      setError(null);

      const response = await categorieService.updateService(id, dto);

      if (onSuccess) {
        onSuccess("Service modifié avec succès !");
      }

      return response;
    } catch (err: any) {
      const errorMessage =
        err?.response?.data?.message ||
        "Une erreur est survenue lors de la modification du service.";
      setError(errorMessage);
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    services,
    isLoadingServices,
    isSubmitting,
    error,
    setError,
    handleAddService,
    handleUpdateService,
  };
};

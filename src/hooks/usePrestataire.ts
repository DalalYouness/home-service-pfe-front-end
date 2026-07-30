import { useState } from "react";
import type { PrestataireInfo } from "../types/PrestataireInfo";

type PrestataireErrors = Partial<Record<keyof PrestataireInfo, string>>;

export const usePrestataire = () => {
  const [prestataireInfo, setPrestataireInfo] = useState<PrestataireInfo>({
    interventionArea: "",
    service: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<PrestataireErrors>({});

  const validateForm = () => {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      setIsLoading(true);
      setErrors(null);
      try {
        //our logique
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
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

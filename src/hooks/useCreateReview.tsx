import { useState } from "react";

import type { ReviewCreateRequest } from "../types/review";
import { reviewService } from "../services/review.service";

export const useCreateReview = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreateReview = async (
    data: ReviewCreateRequest,
    onSuccess?: () => void,
  ) => {
    setLoading(true);
    setError(null);
    try {
      await reviewService.createReview(data);
      setLoading(false);
      if (onSuccess) onSuccess();
      return { success: true };
    } catch (err: any) {
      setLoading(false);
      const errorMessage =
        err?.response?.data?.message || "Erreur lors de l'envoi de l'avis";
      setError(errorMessage);
      return { success: false, message: errorMessage };
    }
  };

  return {
    handleCreateReview,
    loading,
    error,
  };
};

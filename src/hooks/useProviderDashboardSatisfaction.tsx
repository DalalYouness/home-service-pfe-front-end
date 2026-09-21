import { useState, useEffect } from "react";

import type { ProviderDashboardSatisfactionResponse } from "../types/review";
import { reviewService } from "../services/review.service";

export const useProviderDashboardSatisfaction = (
  providerId?: number | string,
) => {
  const [data, setData] =
    useState<ProviderDashboardSatisfactionResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!providerId) {
      setLoading(false);
      return;
    }

    let isMounted = true;

    const fetchSatisfactionData = async () => {
      try {
        setLoading(true);
        setError(null);

        const result =
          await reviewService.getProviderDashboardSatisfaction(providerId);

        if (isMounted) {
          setData(result);
        }
      } catch (err: any) {
        if (isMounted) {
          console.error(
            "Erreur lors du chargement du dashboard de satisfaction:",
            err,
          );
          setError(
            err?.response?.data?.message ||
              "Impossible de charger les données de satisfaction.",
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchSatisfactionData();

    return () => {
      isMounted = false; // Cleanup
    };
  }, [providerId]);

  return { data, loading, error };
};

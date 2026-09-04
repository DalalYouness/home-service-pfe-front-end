import { useState, useEffect } from "react";
import { reviewService } from "../services/review.service";
import type { ProviderStatsResponse } from "../types/review";

export const useProviderStats = (providerId: string | number) => {
  const [stats, setStats] = useState<ProviderStatsResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!providerId) {
      setLoading(false);
      return;
    }

    let isMounted = true;

    const fetchStats = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await reviewService.getProviderStats(String(providerId));

        if (isMounted) {
          setStats(data);
        }
      } catch (err: any) {
        if (isMounted) {
          console.error("Erreur lors de la récupération des stats:", err);
          setError(err.message || "Impossible de charger les statistiques.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchStats();

    return () => {
      // Cleanup function to prevent state updates on unmounted component (i have to return to that concept later to understand it better)
      isMounted = false;
    };
  }, [providerId]);

  return { stats, loading, error };
};

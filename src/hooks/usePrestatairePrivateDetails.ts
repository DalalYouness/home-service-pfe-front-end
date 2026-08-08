import { useState, useEffect } from "react";
import { profileService } from "../services/profile.service";
import type { ProviderDetailsPrivate } from "../types/prestataire";

export const usePrestatairePrivateDetails = (
  providerId: number,
  isOpen: boolean,
) => {
  const [provider, setProvider] = useState<ProviderDetailsPrivate | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!isOpen || !providerId) return;

    let isMounted = true;
    setIsLoading(true);

    profileService
      .getProviderPrivateDetails(providerId)
      .then((data) => {
        if (isMounted) setProvider(data);
      })
      .catch(() => {
        // interceptor will handle the error, no need to do anything here
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [providerId, isOpen]);

  return { provider, isLoading };
};

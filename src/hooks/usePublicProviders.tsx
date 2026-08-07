import { useState, useEffect } from "react";
import { profileService } from "../services/profile.service";
import type { ProvidersPublic } from "../types/prestataire";

export const usePublicProviders = (serviceId: number, isOpen: boolean) => {
  const [providers, setProviders] = useState<ProvidersPublic[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!serviceId || !isOpen) {
      setIsLoading(false);
      return;
    }

    let isMounted = true;
    setIsLoading(true);

    profileService
      .getAllProvidersByServiceId(serviceId)
      .then((data) => {
        if (isMounted) setProviders(data);
      })
      .catch((err) => {
        console.error("Error fetching providers:", err);
        if (isMounted) setProviders([]);
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false; // Cleanup flag
    };
  }, [serviceId, isOpen]);

  return { providers, isLoading };
};

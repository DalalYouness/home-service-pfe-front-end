import { useState, useEffect } from "react";
import { providerService, ProvidersPublic } from "../services/providerService";

export const usePublicProviders = (serviceId: number) => {
  const [providers, setProviders] = useState<ProvidersPublic[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!serviceId) return;

    setIsLoading(true);
    providerService
      .getAllProvidersByServiceId(serviceId)
      .then((data) => setProviders(data))
      .finally(() => setIsLoading(false));
  }, [serviceId]);

  return { providers, isLoading };
};

import { useState, useEffect } from "react";
import { profileService } from "../services/profile.service";
import type { ProvidersPublic } from "../types/prestataire";

export const usePublicProviders = (serviceId: number, isOpen: boolean) => {
  const [providers, setProviders] = useState<ProvidersPublic[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // hit ila kan isOpen false, bach ma nfetchiwch data ila modal kan mamfouhch , ce qui est logique, sinon kan fetchiw data ila modal mamfouhch
    if (!serviceId || !isOpen) return;

    setIsLoading(true);
    profileService
      .getAllProvidersByServiceId(serviceId)
      .then(setProviders)
      .finally(() => setIsLoading(false));
  }, [serviceId, isOpen]);

  return { providers, isLoading };
};

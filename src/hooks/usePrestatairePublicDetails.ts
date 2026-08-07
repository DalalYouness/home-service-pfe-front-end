import { useState, useEffect } from "react";
import { profileService } from "../services/profile.service";
import type { ProviderDetailsPublic } from "../types/prestataire";

export function usePrestatairePublicDetails(providerId?: number) {
  const [publicProviderDetail, setPublicProviderDetail] =
    useState<ProviderDetailsPublic | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!providerId) {
      setIsLoading(false);
      return;
    }

    let isMounted = true;
    setIsLoading(true);

    profileService
      .getProviderPublicDetails(providerId)
      .then((data) => {
        if (isMounted) {
          setPublicProviderDetail(data);
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [providerId]);

  return {
    publicProviderDetail,
    isLoading,
  };
}

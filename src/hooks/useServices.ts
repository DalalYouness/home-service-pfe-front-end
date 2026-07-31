import { useEffect, useState } from "react";
import { categorieService } from "../services/categorie.service";
import type { ServiceResponseDto } from "../types/categorie";

export const useServices = () => {
  const [services, setServices] = useState<ServiceResponseDto[]>([]);
  const [isLoadingServices, setIsLoadingServices] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    // Fetch initial list of dynamic services for selection
    const fetchServices = async () => {
      try {
        setIsLoadingServices(true);
        const servicesResponse = await categorieService.getAllServices();
        if (isMounted) {
          setServices(servicesResponse.content);
        }
      } catch (err) {
        console.error("Error fetching services list:", err);
      } finally {
        if (isMounted) {
          setIsLoadingServices(false);
        }
      }
    };

    fetchServices();

    // Prevent state updates if component unmounts mid-request
    return () => {
      isMounted = false;
    };
  }, []);

  return { services, isLoadingServices };
};

import { useEffect, useState } from "react";
import { categorieService } from "../services/categorie.service";
import type { ServiceResponseDto } from "../types/categorie";

export const useServices = () => {
  const [services, setservices] = useState<ServiceResponseDto[]>([]);
  useEffect(() => {
    let isMounted = true;
    const fetchServices = async () => {
      const servicesResponse = await categorieService.getAllServices();
      if (isMounted) {
        setservices(servicesResponse.content);
      }
    };

    fetchServices();
    return () => {
      isMounted = false;
    };
  }, []);
  return services;
};

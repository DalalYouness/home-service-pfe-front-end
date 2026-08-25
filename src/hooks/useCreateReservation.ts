import { useState } from "react";
import { reservationService } from "../services/reservation.service";
import type {
  ReservationCreateRequest,
  ReservationResponse,
} from "../types/reservation";

export const useCreateReservation = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<ReservationResponse | null>(null);

  const handleCreateReservation = async (
    payload: ReservationCreateRequest,
    onSuccess?: (res: ReservationResponse) => void,
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      const responseData = await reservationService.createReservation(payload);
      setData(responseData);

      if (onSuccess) {
        onSuccess(responseData);
      }
      return responseData;
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message ||
        "Erreur lors de la création de la réservation";
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleCreateReservation,
    isLoading,
    error,
    data,
  };
};

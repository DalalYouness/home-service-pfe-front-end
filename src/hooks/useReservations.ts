import { useState, useEffect, useCallback } from "react";
import { reservationService } from "../services/reservation.service";
import { type ReservationResponse } from "../types/reservation";

export const useReservations = (clientId: number | undefined) => {
  const [bookings, setBookings] = useState<ReservationResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBookings = useCallback(async () => {
    if (!clientId) return;

    try {
      setLoading(true);
      setError(null);
      const data = await reservationService.getAllClientBookings(clientId);
      // parce que c'est une page
      const content = data.content;
      setBookings(data.content);
    } catch (err: any) {
      console.error("Erreur fetching reservations:", err);
      setError("Impossible de charger les réservations.");
    } finally {
      setLoading(false);
    }
  }, [clientId]);

  useEffect(() => {
    if (clientId) {
      fetchBookings();
    } else {
      setLoading(false);
    }
  }, [clientId, fetchBookings]);

  return { bookings, loading, error, refetchBookings: fetchBookings };
};

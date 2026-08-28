import { useState, useEffect, useCallback } from "react";
import { reservationService } from "../services/reservation.service";
import { type ReservationResponse, BookingStatus } from "../types/reservation";
import type { AppMode } from "../context/AuthContext";

export const useReservations = (
  userId: number | undefined,
  mode: AppMode = "CLIENT",
) => {
  const [bookings, setBookings] = useState<ReservationResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // 1. Fetch Bookings dynamically based on mode
  const fetchBookings = useCallback(async () => {
    if (!userId) return;

    try {
      setLoading(true);
      setError(null);

      if (mode === "PRESTATAIRE") {
        const data = await reservationService.getAllProviderBookings(userId);
        setBookings(data.content);
      } else {
        const data = await reservationService.getAllClientBookings(userId);
        setBookings(data.content);
      }
    } catch (err: any) {
      console.error(`Erreur fetching reservations (${mode}):`, err);
      setError("Impossible de charger les réservations.");
    } finally {
      setLoading(false);
    }
  }, [userId, mode]);

  useEffect(() => {
    if (userId) {
      fetchBookings();
    } else {
      setLoading(false);
    }
  }, [userId, fetchBookings]);

  // 2. Cancel Booking Function (Optimistic Update)
  const handleCancelBooking = async (reservationId: number) => {
    try {
      await reservationService.cancelBooking(reservationId);

      setBookings((prevBookings) =>
        prevBookings.map((b) =>
          b.id === reservationId
            ? { ...b, status: BookingStatus.CANCELLED }
            : b,
        ),
      );
      return { success: true };
    } catch (err: any) {
      console.error("Erreur cancellation:", err);
      return {
        success: false,
        message: err.response?.data?.message || "Échec de l'annulation.",
      };
    }
  };

  return {
    bookings,
    loading,
    error,
    refetchBookings: fetchBookings,
    cancelBooking: handleCancelBooking,
  };
};

import type {
  ReservationCreateRequest,
  ReservationResponse,
} from "../types/reservation";
import apiClient from "./api.client";

export const reservationService = {
  createReservation: async (
    requestDto: ReservationCreateRequest,
  ): Promise<ReservationResponse> => {
    const response = await apiClient.post("/api/v1/reservations", requestDto);
    return response.data;
  },
};

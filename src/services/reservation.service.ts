import type {
  ReservationCreateRequest,
  ReservationResponse,
} from "../types/reservation";
import apiClient from "./api.client";

const ENDPOINT = "/api/v1/reservations";
export const reservationService = {
  // client functions
  createReservation: async (
    requestDto: ReservationCreateRequest,
  ): Promise<ReservationResponse> => {
    const response = await apiClient.post(ENDPOINT, requestDto);
    return response.data;
  },

  getAllClientBookings: async (
    clientId: number,
  ): Promise<ReservationResponse[]> => {
    const response = await apiClient.get(`${ENDPOINT}/client/${clientId}`);
    return response.data;
  },

  cancelBooking: async (reservationId: number) => {
    const response = await apiClient.patch(
      `${ENDPOINT}/${reservationId}/cancel`,
    );
    return response.data;
  },
};

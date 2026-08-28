import type {
  ReservationCreateRequest,
  ReservationResponse,
  ReservationValidateRequest,
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

  /* provider usecases */
  getAllProviderBookings: async (
    providerId: number,
  ): Promise<ReservationResponse[]> => {
    const response = await apiClient.get(`${ENDPOINT}/provider/${providerId}`);
    return response.data;
  },

  rejectBooking: async (reservationId: number) => {
    const response = await apiClient.patch(
      `${ENDPOINT}/${reservationId}/reject`,
    );
    return response.data;
  },

  validateBooking: async (
    reservationId: number,
    data: ReservationValidateRequest = { dureeReel: 60 },
  ): Promise<ReservationResponse> => {
    const response = await apiClient.patch<ReservationResponse>(
      `${ENDPOINT}/${reservationId}/validate`,
      data,
    );
    return response.data;
  },

  completeBooking: async (reservationId: number) => {
    const response = await apiClient.patch(
      `${ENDPOINT}/${reservationId}/complete`,
    );
    return response.data;
  },
};

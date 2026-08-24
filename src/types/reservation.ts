export const BookingStatus = {
  PENDING: "PENDING",
  REJECTED: "REJECTED",
  CONFIRMED: "CONFIRMED",
  CANCELLED: "CANCELLED",
  COMPLETED: "COMPLETED",
} as const;

export type BookingStatus = (typeof BookingStatus)[keyof typeof BookingStatus];

export interface ReservationCreateRequest {
  idClient: number;
  idProvider: number;
  serviceId: number;
  dateRdv: string;
}

export interface ReservationResponse {
  id: number;
  dateRdv: string;
  dureeReel?: number;
  status: BookingStatus;
  idClient: number;
  idProvider: number;
  idService: number;
}

/**
 * Statuts possibles d'une réservation dans le système.
 */
export const BookingStatus = {
  PENDING: "PENDING", // En attente d'acceptation par le prestataire
  REJECTED: "REJECTED", // Refusée par le prestataire
  CONFIRMED: "CONFIRMED", // Confirmée par le prestataire
  CANCELLED: "CANCELLED", // Annulée par le client ou le prestataire
  COMPLETED: "COMPLETED", // Prestation terminée avec succès
} as const;

export type BookingStatus = (typeof BookingStatus)[keyof typeof BookingStatus];

/**
 * Payload envoyé lors de la création d'une nouvelle réservation.
 * Doit correspondre exactement au `ReservationCreateRequest` DTO du backend.
 */
export interface ReservationCreateRequest {
  idClient: number;
  idProvider: number;
  idService: number;
  dateRdv: string; // Format ISO-8601 (ex: "YYYY-MM-DDTHH:mm:ss")
}

/**
 * Structure de la réponse renvoyée par le serveur après la récupération ou création d'une réservation.
 */
export interface ReservationResponse {
  id: number;
  dateRdv: string;
  dureeReel?: number;
  status: BookingStatus;
  idClient: number;
  idProvider: number;
  idService: number;
  providerName: string;
  clientName: string;
  serviceName: string;
}

export interface ReservationValidateRequest {
  dureeReel: number;
}

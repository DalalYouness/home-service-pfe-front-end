export interface ReviewCreateRequest {
  reservationId: number;
  isRecommended: boolean;
  comment: string;
}

export interface ReviewResponse {
  id: number;
  clientName: string;
  comment: string;
  isRecommended: boolean;
  createdAt: string;
}

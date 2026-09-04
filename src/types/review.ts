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

export interface ProviderStatsResponse {
  providerId: number;
  tauxRecommandation: number;
  totalClientsVotants: number;
}

export interface ProviderDashboardSatisfactionResponse {
  providerId: number;
  totalVotes: number;
  positiveVotesCount: number;
  negativeVotesCount: number;
  tauxRecommendation: number;
}

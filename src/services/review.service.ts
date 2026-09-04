import type {
  ProviderDashboardSatisfactionResponse,
  ProviderStatsResponse,
  ReviewCreateRequest,
  ReviewResponse,
} from "../types/review";
import apiClient from "./api.client";

export const reviewService = {
  createReview: async (
    reviewCreateRequest: ReviewCreateRequest,
  ): Promise<ReviewResponse> => {
    const response = await apiClient.post<ReviewResponse>(
      "api/v1/reviews",
      reviewCreateRequest,
    );
    return response.data;
  },
  getProviderStats: async (
    providerId: string,
  ): Promise<ProviderStatsResponse> => {
    const response = await apiClient.get<ProviderStatsResponse>(
      `api/v1/reviews/provider/${providerId}/stats`,
    );
    return response.data;
  },

  getProviderDashboardSatisfaction: async (
    providerId: number | string,
  ): Promise<ProviderDashboardSatisfactionResponse> => {
    const response = await apiClient.get<ProviderDashboardSatisfactionResponse>(
      `api/v1/reviews/provider/${providerId}/dashboard`,
    );
    return response.data;
  },
};

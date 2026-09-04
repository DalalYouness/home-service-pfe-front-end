import type { ReviewCreateRequest, ReviewResponse } from "../types/review";
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
};

import apiClient from "./api.client";

export const notificationService = {
  getUnreadCount: async (userId: number): Promise<number> => {
    const response = await apiClient.get<number>(
      `api/v1/notifications/user/${userId}/unread-count`,
    );
    return response.data;
  },
};

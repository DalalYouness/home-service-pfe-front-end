import type { NotificationResponse } from "../types/notification";
import apiClient from "./api.client";

export const notificationService = {
  getUnreadCount: async (userId: number): Promise<number> => {
    const response = await apiClient.get<number>(
      `api/v1/notifications/user/${userId}/unread-count`,
    );
    return response.data;
  },

  getAllUserNotifications: async (
    userId: number,
  ): Promise<NotificationResponse[]> => {
    const response = await apiClient.get(`/api/v1/notifications/${userId}`);
    return response.data;
  },
};

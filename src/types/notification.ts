export const NotificationType = {
  BOOKING_CREATED: "BOOKING_CREATED",
  BOOKING_CONFIRMED: "BOOKING_CONFIRMED",
  BOOKING_CANCELLED: "BOOKING_CANCELLED",
  BOOKING_COMPLETED: "BOOKING_COMPLETED",
  BOOKING_REJECTED: "BOOKING_REJECTED",
  REVIEW_RECEIVED: "REVIEW_RECEIVED",
} as const;

export type NotificationType =
  (typeof NotificationType)[keyof typeof NotificationType];

export interface NotificationResponse {
  id: number;
  message: string;
  isRead: boolean;
  notificationType: NotificationType;
  createdAt: string;
  userId: number;
}

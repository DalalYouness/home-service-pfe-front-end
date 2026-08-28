import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../context/AuthContext";
import { notificationService } from "../services/notification.service";
import { useWebSocket } from "./useWebSocket";
import type { NotificationResponse } from "../types/notification";

export const useNotifications = () => {
  const { user, token } = useAuth();
  const userId = user?.id;

  const [notifications, setNotifications] = useState<NotificationResponse[]>(
    [],
  );
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // 1. Fetch initial Unread Count & Notifications List
  const fetchNotificationsData = useCallback(async () => {
    if (!userId) return;

    try {
      setLoading(true);
      setError(null);

      const [list, count] = await Promise.all([
        notificationService.getAllUserNotifications(userId),
        notificationService.getUnreadCount(userId),
      ]);

      setNotifications(list);
      setUnreadCount(count);
    } catch (err: any) {
      console.error("Erreur fetching notifications:", err);
      setError("Impossible de charger les notifications.");
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      fetchNotificationsData();
    }
  }, [userId, fetchNotificationsData]);

  // 2. Real-time updates via WebSocket
  useWebSocket(token, () => {
    setUnreadCount((prev) => prev + 1);
    fetchNotificationsData();
  });

  return {
    notifications,
    unreadCount,
    loading,
    error,
    refetchNotifications: fetchNotificationsData,
  };
};

// import { useState, useEffect } from "react";
// import { useAuth } from "../context/AuthContext";
// import { notificationService } from "../services/notification.service";
// import { useWebSocket } from "./useWebSocket";

// export const useNotifications = () => {
//   const { user, token } = useAuth();
//   const [unreadCount, setUnreadCount] = useState<number>(0);

//   useEffect(() => {
//     if (user?.id) {
//       notificationService
//         .getUnreadCount(user.id)
//         .then((count) => {
//           setUnreadCount(count);
//         })
//         .catch((err) => console.error("Erreur unread count:", err));
//     }
//   }, [user?.id]);

//   useWebSocket(token, () => {
//     setUnreadCount((prev) => prev + 1);
//   });

//   return { unreadCount };
// };

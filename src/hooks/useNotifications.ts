import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { notificationService } from "../services/notification.service";
import { useWebSocket } from "./useWebSocket";

export const useNotifications = () => {
  const { user, token } = useAuth();
  const [unreadCount, setUnreadCount] = useState<number>(0);

  useEffect(() => {
    if (user?.id) {
      notificationService
        .getUnreadCount(user.id)
        .then((count) => {
          setUnreadCount(count);
        })
        .catch((err) => console.error("Erreur unread count:", err));
    }
  }, [user?.id]);

  useWebSocket(token, () => {
    setUnreadCount((prev) => prev + 1);
  });

  return { unreadCount };
};

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { notificationService } from "../services/notification.service";

interface UseMarkAsReadOptions {
  onSuccess?: () => void;
}

export const useMarkAsRead = (options?: UseMarkAsReadOptions) => {
  const [loadingId, setLoadingId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleNotificationClick = async (notificationId: number) => {
    if (!notificationId) return;

    setLoadingId(notificationId);
    setError(null);

    try {
      // 1. Call API markAsRead
      await notificationService.markAsRead(notificationId);

      // 2. Refetch via useNotifications hook
      if (options?.onSuccess) {
        options.onSuccess();
      }

      // 3. Navigate to reservations page
      navigate("/user/my-reservations");
    } catch (err: any) {
      console.error("Erreur lors du marquage de la notification:", err);
      setError(err?.message || "Impossible de marquer comme lue.");

      navigate("/user/my-reservations");
    } finally {
      setLoadingId(null);
    }
  };

  return {
    handleNotificationClick,
    loadingId,
    error,
  };
};

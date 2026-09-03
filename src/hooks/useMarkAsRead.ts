import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { notificationService } from "../services/notification.service";

interface UseMarkAsReadProps {
  onSuccess?: () => void;
}

export const useMarkAsRead = (props?: UseMarkAsReadProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleNotificationClick = async (notificationId: number) => {
    if (!notificationId) return;

    setIsLoading(true);
    setError(null);

    try {
      // 1. Call API Operation markAsRead
      await notificationService.markAsRead(notificationId);

      // 2. Refresh Notifications state in UI
      if (props?.onSuccess) {
        props.onSuccess();
      }

      // 3. Direct Redirection to Reservations page
      navigate("/user/my-reservations");
    } catch (err: any) {
      console.error("Erreur lors du marquage de la notification:", err);
      setError(err?.message || "Une erreur est survenue");

      navigate("/user/my-reservations");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleNotificationClick,
    isLoading,
    error,
  };
};

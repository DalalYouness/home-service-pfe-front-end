import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { AppEvent } from "../events/appEvents";
import { SessionExpiredModal } from "./SessionExpiredModal";
import { useAuth } from "../context/AuthContext";

const GlobalErrorHandler = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [isSessionExpired, setIsSessionExpired] = useState(false);

  useEffect(() => {
    // 1. Handle Session Expiration (401)
    const handleSessionExpired = () => {
      setIsSessionExpired(true);
    };

    // 2. Handle Internal Server Error (500)
    const handleInternalServerError = () => {
      navigate("/500");
    };

    // Attach global event listeners
    window.addEventListener(AppEvent.SESSION_EXPIRED, handleSessionExpired);
    window.addEventListener(
      AppEvent.INTERNAL_SERVER_ERROR,
      handleInternalServerError,
    );

    return () => {
      window.removeEventListener(
        AppEvent.SESSION_EXPIRED,
        handleSessionExpired,
      );
      window.removeEventListener(
        AppEvent.INTERNAL_SERVER_ERROR,
        handleInternalServerError,
      );
    };
  }, [navigate]);

  const handleModalClose = () => {
    setIsSessionExpired(false);
    logout();
    navigate("/", { replace: true });
  };

  return (
    <>
      <SessionExpiredModal
        isOpen={isSessionExpired}
        onClose={handleModalClose}
      />
    </>
  );
};

export default GlobalErrorHandler;

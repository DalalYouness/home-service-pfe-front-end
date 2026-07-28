// done hmdulilah
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
      logout();
      setIsSessionExpired(true);
    };

    // 3. Handle Internal Server Error (500)
    const handleInternalServerError = () => {
      navigate("/500");
    };

    //-----------------------listerers-------------------------------------

    // Attach global event listeners
    window.addEventListener(AppEvent.SESSION_EXPIRED, handleSessionExpired);

    window.addEventListener(
      AppEvent.INTERNAL_SERVER_ERROR,
      handleInternalServerError,
    );
    //-----------------------------------------------------------------------
    // Cleanup listeners when the component unmounts
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
  }, [navigate, logout]);

  return (
    <>
      <SessionExpiredModal
        isOpen={isSessionExpired}
        onClose={() => setIsSessionExpired(false)}
      />
    </>
  );
};

export default GlobalErrorHandler;

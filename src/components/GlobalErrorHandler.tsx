import { useEffect } from "react";
import { useNavigate } from "react-router";
import { AppEvent } from "../events/appEvents";

const GlobalErrorHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // 1. Handle Session Expiration (401)
    const handleSessionExpired = () => {
      // Clear authentication data
      localStorage.removeItem("token");

      // Redirect to login page
      navigate("/", { replace: true });
    };

    // 2. Handle Resource Not Found (404)
    const handleResourceNotFound = () => {
      navigate("/404");
    };

    // 3. Handle Internal Server Error (500)
    const handleInternalServerError = () => {
      navigate("/500");
    };

    // Attach global event listeners
    window.addEventListener(AppEvent.SESSION_EXPIRED, handleSessionExpired);

    window.addEventListener(
      AppEvent.RESOURCE_NOT_FOUND,
      handleResourceNotFound,
    );

    window.addEventListener(
      AppEvent.INTERNAL_SERVER_ERROR,
      handleInternalServerError,
    );

    // Cleanup listeners when the component unmounts
    return () => {
      window.removeEventListener(
        AppEvent.SESSION_EXPIRED,
        handleSessionExpired,
      );

      window.removeEventListener(
        AppEvent.RESOURCE_NOT_FOUND,
        handleResourceNotFound,
      );

      window.removeEventListener(
        AppEvent.INTERNAL_SERVER_ERROR,
        handleInternalServerError,
      );
    };
  }, [navigate]);

  // This component doesn't render any UI.
  // It only listens for global application events.
  return null;
};

export default GlobalErrorHandler;

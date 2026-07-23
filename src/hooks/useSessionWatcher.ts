import { useEffect, useState } from "react";

export const useSessionWatcher = () => {
  const [isSessionExpired, setisSessionExipred] = useState(false);

  useEffect(() => {
    const handleSessionExpired = () => {
      setisSessionExipred(true);
    };
    const cleanUpListner = () => {
      window.removeEventListener("session-expired", handleSessionExpired);
    };
    window.addEventListener("session-expired", handleSessionExpired);
    return cleanUpListner;
  }, []);

  const closeSessionModal = () => setisSessionExipred(false);

  return {
    isSessionExpired,
    closeSessionModal,
  };
};

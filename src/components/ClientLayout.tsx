import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { ClientNavbar } from "./ClientNavBar";
import { ClientSidebar } from "./ClientSideBar";
import { SessionExpiredModal } from "./SessionExpiredModal";

interface UserStateData {
  name: string;
  description: string;
}

export const ClientLayout: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserStateData>({
    name: "Chargement...",
    description: "",
  });

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

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/");
      return;
    }

    try {
      const parsedUser = JSON.parse(storedUser);
      const rawRole = parsedUser.roles?.[0]?.roleName;

      setUser({
        name: parsedUser.fullname || "Utilisateur",
        description: `Espace ${rawRole.toLowerCase()}`,
      });
    } catch (error) {
      console.error("Error parsing user from localStorage", error);
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      <ClientNavbar user={user} />
      <div className="flex flex-1">
        <ClientSidebar />
        <main className="flex-1 p-6 md:p-2 max-w-7xl mx-auto w-full pb-15 md:pb-8">
          <Outlet />
        </main>
      </div>
      <SessionExpiredModal
        isOpen={isSessionExpired}
        onClose={() => setisSessionExipred(false)}
      />
    </div>
  );
};

import { Navigate, Outlet } from "react-router-dom";
import { ClientNavbar } from "./ClientNavBar";
import { ClientSidebar } from "./ClientSideBar";

import { useAuth } from "../context/AuthContext";

export const ClientLayout: React.FC = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      <ClientNavbar />
      <div className="flex flex-1">
        <ClientSidebar />
        <main className="flex-1 p-6 md:p-2 max-w-7xl mx-auto w-full pb-15 md:pb-8">
          <Outlet />
        </main>
      </div>
    </div>
  ) : (
    <Navigate to="/" replace />
  );
};

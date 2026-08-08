import { Navigate, Outlet } from "react-router-dom";
import { UserNavbar } from "./UserNavBar";
import { UserSidebar } from "./UserSideBar";
import { useAuth } from "../context/AuthContext";

export const UserLayout: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      <UserNavbar />
      <div className="flex flex-1 min-h-0">
        <UserSidebar />
        <main className="flex-1 p-4 md:p-6 max-w-7xl mx-auto w-full min-w-0 overflow-hidden pb-16 md:pb-8">
          <Outlet />
        </main>
      </div>
    </div>
  ) : (
    <Navigate to="/" replace />
  );
};

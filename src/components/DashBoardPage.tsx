import { useAuth } from "../context/AuthContext";
import ClientDashboard from "./ClientDashboard";

import AdminDashboard from "./AdminDashboard";
import { PrestataireDashboard } from "./PrestataireDashboard";

export const DashBoardPage = () => {
  const { currentMode } = useAuth();

  if (currentMode === "ADMIN") return <AdminDashboard />;
  if (currentMode === "PRESTATAIRE") return <PrestataireDashboard />;

  return <ClientDashboard />;
};

export default DashBoardPage;

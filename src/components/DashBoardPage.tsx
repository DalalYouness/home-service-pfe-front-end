import { useAuth } from "../context/AuthContext";
import ClientDashboard from "./ClientDashboard";
import PrestataireDashboard from "./PrestataireDashboard";
import AdminDashboard from "./AdminDashboard";

export const DashBoardPage = () => {
  const { currentMode } = useAuth();

  if (currentMode === "ADMIN") return <AdminDashboard />;
  if (currentMode === "PRESTATAIRE") return <PrestataireDashboard />;

  return <ClientDashboard />;
};

export default DashBoardPage;

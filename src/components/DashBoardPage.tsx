import { useAuth } from "../context/AuthContext";
import ClientDashboard from "./ClientDashboard";
import PrestataireDashboard from "./PrestataireDashboard";

export const DashBoardPage = () => {
  const { currentMode } = useAuth();
  if (currentMode == "PRESTATAIRE") return <PrestataireDashboard />;
  return <ClientDashboard />;
};

import { useAuth } from "../context/AuthContext";
import ClientDashboard from "./ClientDashboard";

export const DashBoardPage = () => {
  const { currentMode } = useAuth();
  if (currentMode == "PRESTATAIRE") return <PrestataireDashboard />;
  return <ClientDashboard />;
};

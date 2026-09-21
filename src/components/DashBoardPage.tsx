import { useAuth } from "../context/AuthContext";
import ClientDashboard from "./ClientDashboard";
import AdminDashboard from "./AdminDashboard";
import { PrestataireDashboard } from "./PrestataireDashboard";

export const DashBoardPage = () => {
  const { currentMode, user } = useAuth();

  if (currentMode === "ADMIN") return <AdminDashboard />;

  if (currentMode === "PRESTATAIRE" && user?.id) {
    return <PrestataireDashboard providerId={user.id} />;
  }

  return <ClientDashboard />;
};

export default DashBoardPage;

// import { useAuth } from "../context/AuthContext";
// import ClientDashboard from "./ClientDashboard";

// import AdminDashboard from "./AdminDashboard";
// import { PrestataireDashboard } from "./PrestataireDashboard";

// export const DashBoardPage = () => {
//   const { currentMode } = useAuth();

//   if (currentMode === "ADMIN") return <AdminDashboard />;
//   if (currentMode === "PRESTATAIRE") return <PrestataireDashboard />;

//   return <ClientDashboard />;
// };

// export default DashBoardPage;

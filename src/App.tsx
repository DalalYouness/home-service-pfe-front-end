import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import RegisterForm from "./components/RegisterForm";
import { ClientLayout } from "./components/ClientLayout"; // استيراد الـ Layout الأب

// غادي تصاوب هاد الـ Components خاويين دابا غير باش تيستي بيهم
const ClientDashboard = () => (
  <div className="text-xl font-bold text-emerald-950">
    Tableau de bord (Dashboard)
  </div>
);
const MonCompte = () => (
  <div className="text-xl font-bold text-emerald-950">
    Mon Compte (Modifier profil, password...)
  </div>
);

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/*  1 - public routes open to all visitors */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegisterForm />} />

        {/* 2 - client private routes*/}
        <Route path="/client" element={<ClientLayout />}>
          {/* /client/dashboard */}
          <Route path="dashboard" element={<ClientDashboard />} />

          {/* /client/compte */}
          <Route path="compte" element={<MonCompte />} />

          {/* important thing when user go directly to /client i have to redirect him to /client/dashboard*/}
          <Route index element={<Navigate to="dashboard" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

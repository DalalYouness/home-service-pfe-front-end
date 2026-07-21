import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import RegisterForm from "./components/RegisterForm";
import { ClientLayout } from "./components/ClientLayout";
import { MonCompte } from "./components/MonCompte";
import ForbiddenPage from "./errors/ForbiddenPage";
import NotFoundPage from "./errors/NotFoundPage";
import ServerErrorPage from "./errors/ServerErrorPage";
import Profil from "./components/Profil";

// for test
const ClientDashboard = () => (
  <div className="text-xl font-bold text-emerald-950">
    Tableau de bord (Dashboard)
  </div>
);

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/*  1 - public routes open to all visitors */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegisterForm />} />
        {/* erros pages */}
        <Route path="/403" element={<ForbiddenPage />} />
        <Route path="/404" element={<NotFoundPage />} />
        <Route path="/500" element={<ServerErrorPage />} />
        {/* 2 - client private routes*/}
        <Route path="/client" element={<ClientLayout />}>
          {/* /client/dashboard */}
          <Route path="dashboard" element={<ClientDashboard />} />

          {/* /client/compte */}
          <Route path="account-setting" element={<MonCompte />} />

          {/* profile component */}
          <Route path="myprofil" element={<Profil />} />
          {/* important thing when user go directly to /client i have to redirect him to /client/dashboard*/}
          <Route index element={<Navigate to="dashboard" replace />} />
        </Route>
        {/* ay path mamsaybinoch o ktabto ilo7ni l 404 */}
        <Route path="*" element={<NotFoundPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

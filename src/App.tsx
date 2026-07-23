import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import RegisterForm from "./components/RegisterForm";
import { ClientLayout } from "./components/ClientLayout";
import { MonCompte } from "./components/MonCompte";
import ForbiddenPage from "./errors/ForbiddenPage";
import NotFoundPage from "./errors/NotFoundPage";
import ServerErrorPage from "./errors/ServerErrorPage";
import Profil from "./components/Profil";
import { Toaster } from "sonner";

// for test
const ClientDashboard = () => (
  <div className="text-xl font-bold text-emerald-950">
    Tableau de bord (Dashboard)
  </div>
);

export default function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          className: "border-2 font-sans rounded-2xl shadow-lg",
          style: {
            fontSize: "14px",
          },
          classNames: {
            error: "bg-red-50 text-red-900 border-red-200",
            success: "bg-emerald-50 text-emerald-900 border-emerald-200",
            warning: "bg-amber-50 text-amber-900 border-amber-200",
            info: "bg-blue-50 text-blue-900 border-blue-200",
            description: "text-gray-500 text-xs",
          },
        }}
      />
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

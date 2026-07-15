import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import RegisterForm from "./components/RegisterForm";
import { ClientNavbar } from "./components/ClientNavBar";

const user = {
  name: "youness dalal",
};
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route
          path="/client/dashboard"
          element={<ClientNavbar user={user} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

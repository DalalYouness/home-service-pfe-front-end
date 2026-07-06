import { useState } from "react";
import Navbar from "./components/NavBar";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import Categories from "./components/Catégories";
import HowItWorks from "./components/HowItWorks";
import AuthModal from "./components/AuthModal";

interface User {
  firstName: string;
  lastName: string;
  email: string;
}

export default function App() {
  const [authOpen, setAuthOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  // Landing page
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f5f0e6" }}>
      <Navbar onLoginClick={() => setAuthOpen(true)} />
      <main>
        <Hero />
        <Categories />
        <HowItWorks />
      </main>
      <Footer />
      {authOpen && (
        <AuthModal
          onClose={() => setAuthOpen(false)}
          onLoginSuccess={(u) => {
            setAuthOpen(false);
            setUser(u);
          }}
        />
      )}
    </div>
  );
}

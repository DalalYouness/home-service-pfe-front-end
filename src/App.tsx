import { useState } from "react";
import Navbar from "./components/NavBar";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import Categories from "./components/Catégories";

export default function App() {
  const [authOpen, setAuthOpen] = useState(false);

  // Landing page
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f5f0e6" }}>
      <Navbar onLoginClick={() => setAuthOpen(true)} />
      <main>
        <Hero />
        <Categories />
      </main>
      <Footer />
    </div>
  );
}

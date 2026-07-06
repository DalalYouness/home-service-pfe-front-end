import { useState } from "react";
import Navbar from "./components/NavBar";

export default function App() {
  const [authOpen, setAuthOpen] = useState(false);

  // Landing page
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f5f0e6" }}>
      <Navbar onLoginClick={() => setAuthOpen(true)} />
    </div>
  );
}

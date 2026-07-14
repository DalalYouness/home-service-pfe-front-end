import { useState } from "react";
import Navbar from "./components/NavBar";

export default function App() {
  const [authOpen, setAuthOpen] = useState(false);
  return (
    <div className="min-h-screen">
      <Navbar onLoginClick={() => setAuthOpen(true)} />
    </div>
  );
}

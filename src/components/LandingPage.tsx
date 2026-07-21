// import Footer from "./Footer";
import { useEffect } from "react";
import Navbar from "./NavBar";

const LandingPage = () => {
  // bach manqdrch n3awd ndkhol l espace client o aslan jwt t expira binma 7alit l mochkil b api request
  useEffect(() => {
    localStorage.clear();
  }, []);
  return (
    <div className="relative min-h-screen bg-cream-50">
      <Navbar />
      {/* <Footer /> */}
    </div>
  );
};

export default LandingPage;

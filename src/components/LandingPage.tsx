import Navbar from "./NavBar";
import Hero from "./Hero";
import { ServicesSection } from "./ServiceSection";
import Footer from "./Footer";
import HowItWorks from "./HowItWorks";
import BecomeProviderSection from "./BecomeProviderSection";
import CTASection from "./CTASection";

const LandingPage = () => {
  return (
    <div className="relative min-h-screen bg-cream-50 flex flex-col justify-between">
      {/* 1. Header / Navigation */}
      <Navbar />

      {/* 2. Main Content Area */}
      <main className="flex-grow">
        <Hero />
        <div id="services">
          <ServicesSection />
        </div>
        <div id="how-it-works">
          <HowItWorks />
        </div>
        {/* Section Espace Prestataire */}
        <BecomeProviderSection />
        <CTASection />
      </main>

      {/* 3. Footer Section (In the bottom) */}
      <Footer />
    </div>
  );
};

export default LandingPage;

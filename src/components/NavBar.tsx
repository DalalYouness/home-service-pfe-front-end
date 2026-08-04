import { useState } from "react";
import { Menu, X, User } from "lucide-react";

import Logo from "./Logo";
import LoginForm from "./LoginForm";

export default function Navbar() {
  // Mobile menu state
  const [menuOpen, setMenuOpen] = useState(false);

  // Login modal state
  const [isAuthModalOpen, setIsAuthOpen] = useState(false);

  return (
    <>
      {/* Navbar background darkened to 90% for contrast comfort */}
      <nav className="fixed top-0 right-0 left-0 z-50 bg-forest-950/90 backdrop-blur-md border-b border-white/10 shadow-lg transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-20">
          {/* Logo */}
          <a
            href="#"
            className="flex items-center gap-2 group transition-transform duration-300 hover:scale-105"
          >
            <Logo size="sm" animate />
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-9">
            <a
              href="#services"
              className="relative text-sm font-semibold text-gray-100 hover:text-cream-100 transition-colors py-1 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-cream-200 hover:after:w-full after:transition-all after:duration-300"
            >
              Services
            </a>

            <a
              href="#how-it-works"
              className="relative text-sm font-semibold text-gray-100 hover:text-cream-100 transition-colors py-1 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-cream-200 hover:after:w-full after:transition-all after:duration-300"
            >
              Comment ça marche
            </a>

            <a
              href="#providers"
              className="relative text-sm font-semibold text-gray-100 hover:text-cream-100 transition-colors py-1 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-cream-200 hover:after:w-full after:transition-all after:duration-300"
            >
              Prestataires
            </a>
          </div>

          {/* Desktop Login Button */}
          <div className="hidden md:flex items-center">
            <button
              onClick={() => setIsAuthOpen(true)}
              className="group relative inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-gradient-to-r from-cream-100 via-amber-100 to-cream-200 text-forest-950 font-bold text-sm shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:shadow-[0_4px_25px_rgba(245,240,230,0.4)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer overflow-hidden border border-white/50"
            >
              <User
                size={16}
                className="text-forest-900 group-hover:rotate-12 transition-transform duration-300"
              />
              <span>Connexion</span>
            </button>
          </div>

          {/* Mobile Toggle Button */}
          <button
            className="md:hidden p-2.5 rounded-xl bg-white/10 border border-white/10 text-white hover:bg-white/20 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {menuOpen && (
          <div className="md:hidden bg-forest-950/98 backdrop-blur-xl border-b border-white/10 px-6 py-6 flex flex-col gap-5 shadow-2xl">
            <a
              href="#services"
              className="text-base font-semibold text-gray-100 hover:text-cream-100 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Services
            </a>

            <a
              href="#how-it-works"
              className="text-base font-semibold text-gray-100 hover:text-cream-100 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Comment ça marche
            </a>

            <a
              href="#providers"
              className="text-base font-semibold text-gray-100 hover:text-cream-100 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Prestataires
            </a>

            <button
              onClick={() => {
                setMenuOpen(false);
                setIsAuthOpen(true);
              }}
              className="flex items-center justify-center gap-2 text-sm font-bold text-forest-950 bg-gradient-to-r from-cream-100 to-amber-100 px-5 py-3 rounded-full w-full mt-2 shadow-lg active:scale-95 transition-all"
            >
              <User size={18} />
              <span>Connexion</span>
            </button>
          </div>
        )}
      </nav>

      <LoginForm
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthOpen(false)}
      />
    </>
  );
}

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";

interface NavbarProps {
  onLoginClick: () => void;
}

export default function Navbar({ onLoginClick }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#f5f0e6]/95 backdrop-blur-sm border-b border-[#e8dfc8]">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        <a href="#">
          <Logo size="sm" animate />
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          <a
            href="#services"
            className="text-sm font-medium text-gray-700 hover:text-forest-800 transition-colors"
          >
            Services
          </a>
          <a
            href="#how-it-works"
            className="text-sm font-medium text-gray-700 hover:text-forest-800 transition-colors"
          >
            Comment ça marche
          </a>
          <a
            href="#providers"
            className="text-sm font-medium text-gray-700 hover:text-forest-800 transition-colors"
          >
            Prestataires
          </a>
        </div>

        {/* CTA — single Connexion button */}
        <div className="hidden md:flex">
          <button
            onClick={onLoginClick}
            className="text-sm font-semibold text-white bg-forest-800 hover:bg-forest-900 transition-all duration-200 active:scale-[0.97] px-6 py-2.5 rounded-full shadow-sm"
          >
            Connexion
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#f5f0e6] border-t border-[#e8dfc8] px-6 py-4 flex flex-col gap-4">
          <a
            href="#services"
            className="text-sm font-medium text-gray-700"
            onClick={() => setMenuOpen(false)}
          >
            Services
          </a>
          <a
            href="#how-it-works"
            className="text-sm font-medium text-gray-700"
            onClick={() => setMenuOpen(false)}
          >
            Comment ça marche
          </a>
          <a
            href="#providers"
            className="text-sm font-medium text-gray-700"
            onClick={() => setMenuOpen(false)}
          >
            Prestataires
          </a>
          <button
            onClick={() => {
              setMenuOpen(false);
              onLoginClick();
            }}
            className="text-sm font-semibold text-white bg-forest-800 px-5 py-2.5 rounded-full w-full mt-1"
          >
            Connexion
          </button>
        </div>
      )}
    </nav>
  );
}

import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Linkedin,
  Heart,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Logo from "./Logo";

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="w-full bg-cream-50 text-stone-700 font-sans border-t border-stone-200/80 pt-20 pb-10 relative overflow-hidden">
      {/* Background Micro-Gradients */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-forest-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-amber-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12 mb-16">
          {/* Brand & Mission Column */}
          <div className="lg:col-span-2 space-y-5">
            {/* Logo Component */}
            <div className="flex items-center justify-start">
              <Logo variant="light-bg" size="sm" animate={false} />
            </div>

            <p className="font-sans text-stone-600 text-sm leading-relaxed max-w-sm">
              Votre plateforme de confiance pour réserver des services à
              domicile au Maroc. Nous vous mettons en relation directe avec des
              professionnels qualifiés et vérifiés.
            </p>

            {/* Micro Badge for Trust */}
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-forest-900 bg-forest-50 border border-forest-100 px-3.5 py-2 rounded-full font-sans shadow-xs">
              <ShieldCheck size={15} className="text-forest-600 shrink-0" />
              <span>Prestataires 100% vérifiés</span>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-white border border-stone-200/90 flex items-center justify-center text-forest-900 hover:text-amber-600 hover:border-amber-300 hover:shadow-md transition-all duration-200 shadow-xs"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-white border border-stone-200/90 flex items-center justify-center text-forest-900 hover:text-amber-600 hover:border-amber-300 hover:shadow-md transition-all duration-200 shadow-xs"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-white border border-stone-200/90 flex items-center justify-center text-forest-900 hover:text-amber-600 hover:border-amber-300 hover:shadow-md transition-all duration-200 shadow-xs"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div>
            <h4 className="font-serif font-bold text-forest-900 text-lg mb-5">
              Navigation
            </h4>
            <ul className="space-y-3 text-sm text-stone-600">
              <li>
                <button
                  onClick={() => navigate("/")}
                  className="hover:text-amber-600 transition-colors text-left font-medium"
                >
                  Accueil
                </button>
              </li>
              <li>
                <a
                  href="#services"
                  className="hover:text-amber-600 transition-colors block"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#how-it-works"
                  className="hover:text-amber-600 transition-colors block"
                >
                  Comment ça marche
                </a>
              </li>
              <li>
                <button
                  onClick={() => navigate("/register?role=prestataire")}
                  className="hover:text-amber-600 transition-colors text-left flex items-center gap-1.5 text-forest-800 font-semibold"
                >
                  <Sparkles size={14} className="text-amber-500" />
                  <span>Devenir Prestataire</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Popular Categories */}
          <div>
            <h4 className="font-serif font-bold text-forest-900 text-lg mb-5">
              Nos Services
            </h4>
            <ul className="space-y-3 text-sm text-stone-600">
              <li className="hover:text-amber-600 cursor-pointer transition-colors">
                Électricité
              </li>
              <li className="hover:text-amber-600 cursor-pointer transition-colors">
                Plomberie
              </li>
              <li className="hover:text-amber-600 cursor-pointer transition-colors">
                Nettoyage à domicile
              </li>
              <li className="hover:text-amber-600 cursor-pointer transition-colors">
                Peinture
              </li>
              <li className="hover:text-amber-600 cursor-pointer transition-colors">
                Jardinage
              </li>
              <li className="hover:text-amber-600 cursor-pointer transition-colors">
                Cours à domicile
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="font-serif font-bold text-forest-900 text-lg mb-5">
              Contact
            </h4>
            <ul className="space-y-3.5 text-sm text-stone-600">
              <li className="flex items-center gap-3">
                <MapPin size={18} className="text-amber-600 shrink-0" />
                <span>Casablanca, Maroc</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-amber-600 shrink-0" />
                <span>+212 6 00 00 00 00</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-amber-600 shrink-0" />
                <span>contact@dalyoo.ma</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-8 border-t border-stone-200/90 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500 font-sans">
          <p className="flex items-center gap-1.5">
            © {new Date().getFullYear()} Dalyoo. Tous droits réservés. Fait avec{" "}
            <Heart size={13} className="text-amber-500 fill-amber-500" />
          </p>

          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-forest-900 transition-colors">
              Conditions d'utilisation
            </a>
            <a href="#" className="hover:text-forest-900 transition-colors">
              Politique de confidentialité
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

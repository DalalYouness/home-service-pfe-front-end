import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Bell, LogOut, Home } from "lucide-react";

/**
 * Interface définissant les propriétés du composant ClientNavbar.
 * Permet de passer dynamiquement les informations de l'utilisateur connecté.
 */
interface ClientNavbarProps {
  user: {
    name: string;
    avatarUrl?: string;
  };
}

export const ClientNavbar: React.FC<ClientNavbarProps> = ({ user }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  /**
   * Gère la déconnexion de l'utilisateur.
   * Supprime les jetons/données de session et redirige vers la page de login.
   */
  const handleLogout = () => {
    // TODO: Supprimer le token JWT (localStorage.removeItem("token"))
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <nav className="w-full bg-white border-b border-gray-100 px-6 py-3 flex items-center justify-between shadow-sm sticky top-0 z-50">
      {/* ==========================================
          SECTION LOGO & BRANDING
          Contient l'icône de l'application et le nom de la marque.
         ========================================== */}
      <div
        className="flex items-center gap-3 cursor-pointer"
        onClick={() => navigate("/client/dashboard")}
      >
        <span className="text-xl font-bold text-emerald-950 tracking-tight">
          dalyoo
        </span>
      </div>
      {/* ==========================================
          SECTION BARRE DE RECHERCHE
          Champ de saisie stylisé pour rechercher des services ou des prestataires.
         ========================================== */}
      <div className="flex-1 max-w-xl mx-8">
        <div className="relative w-full">
          <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
            <Search className="w-4.5 h-4.5" />
          </span>
          <input
            type="text"
            placeholder="Rechercher un service, un prestataire..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 bg-neutral-50/50 border border-amber-200/40 rounded-full focus:outline-none focus:border-amber-800/40 focus:bg-white text-sm transition-all placeholder:text-gray-400"
          />
        </div>
      </div>
      {/* ==========================================
          SECTION ACTIONS UTILISATEUR & NOTIFICATIONS
          Regroupe les notifications, le profil de l'utilisateur et le bouton déconnexion.
         ========================================== */}
      <div className="flex items-center gap-6">
        {/* BOUTON NOTIFICATIONS
            Inclut un indicateur rouge dynamique (badge) pour signaler de nouvelles notifications. */}
        <button className="relative p-2 text-gray-500 hover:text-emerald-800 hover:bg-gray-50 rounded-full transition-all">
          <Bell className="w-5.5 h-5.5" />
          <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        {/* SÉPARATEUR VISUEL vertical entre les notifications et le bloc profil */}
        <div className="h-8 w-px bg-gray-200"></div>

        {/* BLOC PROFIL UTILISATEUR
            Affiche l'avatar (première lettre du nom), le nom de l'utilisateur et son rôle. */}
        <div className="flex items-center gap-3">
          {/* AVATAR DYNAMIQUE : prend la première lettre du nom de l'utilisateur */}
          <div className="w-10 h-10 bg-emerald-950 rounded-full flex items-center justify-center text-white font-bold text-base shadow-sm">
            {user.name.charAt(0).toUpperCase()}
          </div>

          <div className="flex flex-col">
            <span className="text-sm font-semibold text-emerald-950 leading-tight">
              {user.name}
            </span>
            <span className="text-xs text-gray-500 font-medium">
              Espace client
            </span>
          </div>
        </div>

        {/* BOUTON DÉCONNEXION (LOGOUT)
            Déclenche la fonction handleLogout pour fermer la session de manière sécurisée. */}
        <button
          onClick={handleLogout}
          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all ml-1"
          title="Se déconnecter"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </nav>
  );
};

// <div className="w-10 h-10 bg-emerald-800 rounded-xl flex items-center justify-center text-white shadow-md shadow-emerald-800/20">
//   {/* Icône de maison représentant les services à domicile (Yaqin) */}
//   <Home className="w-5.5 h-5.5" />
// </div>;

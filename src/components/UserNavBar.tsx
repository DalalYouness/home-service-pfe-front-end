import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Bell, LogOut, X, Repeat, Loader2 } from "lucide-react";
import { LogoutModal } from "./LogoutModal";
import { useAuth } from "../context/AuthContext";
import { useSwitchMode } from "../hooks/useSwitchMode";
import Logo from "./Logo";

export const UserNavbar = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  // Auth Context
  const { user, logout, currentMode } = useAuth();

  // Custom Hook Switch Mode
  const { hasPrestataireRole, handleModeAction, isLoading } = useSwitchMode();

  const handleLogoutConfirm = () => {
    logout();
    setIsLogoutModalOpen(false);
  };

  return (
    <>
      <nav className="w-full bg-white border-b border-gray-100 px-4 py-3 md:px-6 flex items-center justify-between shadow-sm sticky top-0 z-40 min-h-[64px]">
        {isMobileSearchOpen ? (
          <div className="w-full flex items-center gap-3 animate-in fade-in duration-150">
            <button
              onClick={() => {
                setIsMobileSearchOpen(false);
                setSearchQuery("");
              }}
              className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-all shrink-0"
              title="Fermer la recherche"
            >
              <X className="w-5.5 h-5.5" />
            </button>

            <div className="relative flex-1">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
                <Search className="w-4.5 h-4.5" />
              </span>
              <input
                type="text"
                placeholder="Rechercher..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="w-full pl-11 pr-4 py-2 bg-neutral-50 border border-amber-200/40 rounded-full focus:outline-none focus:border-amber-800/40 focus:bg-white text-sm transition-all"
              />
            </div>
          </div>
        ) : (
          <>
            {/* LOGO */}
            <Logo variant="light-bg" size="sm" />

            {/* DESKTOP SEARCH BAR */}
            <div className="flex-1 max-w-xl mx-8 hidden md:block">
              <div className="relative w-full">
                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
                  <Search className="w-4.5 h-4.5" />
                </span>
                <input
                  type="text"
                  placeholder="Rechercher un service, un prestataire..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-2.5 bg-neutral-50/50 border border-amber-200/40 rounded-full focus:outline-none focus:border-amber-800/40 focus:bg-white text-sm transition-all"
                />
              </div>
            </div>

            {/* ACTIONS & PROFILE */}
            <div className="flex items-center gap-2 md:gap-4 shrink-0">
              <button
                onClick={() => setIsMobileSearchOpen(true)}
                className="md:hidden p-2 text-gray-500 hover:text-emerald-800 hover:bg-gray-50 rounded-full transition-all"
                title="Rechercher"
              >
                <Search className="w-5.5 h-5.5" />
              </button>

              {/* Notification Button */}
              <button className="relative p-2 text-gray-500 hover:text-emerald-800 rounded-full transition-all">
                <Bell className="w-5.5 h-5.5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              </button>

              {/* DYNAMIC MODE SWITCH BUTTON USING USE-SWITCH-MODE HOOK */}
              <button
                onClick={handleModeAction}
                disabled={isLoading}
                className="hidden sm:flex items-center gap-2 px-3.5 py-2 bg-emerald-50 hover:bg-emerald-100/80 text-emerald-900 border border-emerald-200/60 rounded-xl font-medium text-xs md:text-sm transition-all shadow-xs active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <Loader2 className="w-3.5 h-3.5 text-emerald-700 animate-spin" />
                ) : (
                  hasPrestataireRole && (
                    <Repeat className="w-3.5 h-3.5 text-emerald-700" />
                  )
                )}
                <span>
                  {isLoading
                    ? "Changement..."
                    : !hasPrestataireRole
                      ? "Devenir prestataire"
                      : currentMode === "PRESTATAIRE"
                        ? "Passer en mode Client"
                        : "Passer en mode Prestataire"}
                </span>
              </button>

              {/* Divider */}
              <div className="hidden sm:block h-8 w-px bg-gray-200"></div>

              {/* Profile User Info */}
              <div className="flex items-center gap-2 md:gap-3">
                <div className="w-9 h-9 md:w-10 md:h-10 bg-emerald-950 rounded-full flex items-center justify-center text-white font-bold shrink-0">
                  {(user?.fullname || user?.email || "U")
                    .charAt(0)
                    .toUpperCase()}
                </div>

                <div className="hidden sm:flex flex-col">
                  <span className="text-sm font-semibold text-emerald-950 leading-tight">
                    {user?.fullname || "Utilisateur"}
                  </span>
                  <span className="text-xs text-gray-500 font-medium capitalize">
                    Espace {currentMode.toLowerCase()}
                  </span>
                </div>
              </div>

              {/* Logout Button */}
              <button
                onClick={() => setIsLogoutModalOpen(true)}
                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                title="Se déconnecter"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </>
        )}
      </nav>

      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogoutConfirm}
      />
    </>
  );
};

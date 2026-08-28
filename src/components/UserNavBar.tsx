import { useState } from "react";
import { Bell, LogOut, Repeat, Loader2 } from "lucide-react";
import { LogoutModal } from "./LogoutModal";
import { useAuth } from "../context/AuthContext";
import { useSwitchMode } from "../hooks/useSwitchMode";
import { useNotifications } from "../hooks/useNotifications";
import NotificationPopup from "../components/NotificationPopup";
import Logo from "./Logo";

export const UserNavbar = () => {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isNotifPopupOpen, setIsNotifPopupOpen] = useState(false);

  // Auth Context
  const { user, logout, currentMode } = useAuth();

  // Custom Hook Switch Mode
  const { hasPrestataireRole, handleModeAction, isLoading } = useSwitchMode();

  // Custom Hook Notifications
  const { unreadCount } = useNotifications();

  const handleLogoutConfirm = () => {
    logout();
    setIsLogoutModalOpen(false);
  };

  return (
    <>
      <nav className="w-full bg-white border-b border-gray-100 px-3 md:px-6 flex items-center justify-between shadow-sm sticky top-0 z-40 min-h-[64px]">
        {/* LOGO */}
        <Logo variant="light-bg" size="sm" />

        {/* ACTIONS & PROFILE */}
        <div className="flex items-center gap-1.5 sm:gap-3 md:gap-4 shrink-0">
          {/* Notification Button + Popup Container */}
          <div className="relative">
            {" "}
            <button
              onClick={() => setIsNotifPopupOpen((prev) => !prev)}
              className="relative p-2 text-gray-500 hover:text-emerald-800 rounded-full transition-all cursor-pointer"
            >
              <Bell className="w-5 h-5 sm:w-5.5 sm:h-5.5" />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[10px] font-bold rounded-full h-4 min-w-[16px] px-1 flex items-center justify-center border-2 border-white animate-pulse">
                  {unreadCount > 99 ? "99+" : unreadCount}
                </span>
              )}
            </button>
            {isNotifPopupOpen && <NotificationPopup />}
          </div>

          {/* DYNAMIC MODE SWITCH BUTTON (RESPONSIVE: MOBILE & DESKTOP) */}
          <button
            onClick={handleModeAction}
            disabled={isLoading}
            title={
              !hasPrestataireRole
                ? "Devenir prestataire"
                : currentMode === "PRESTATAIRE"
                  ? "Passer en mode Client"
                  : "Passer en mode Prestataire"
            }
            className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1.5 sm:py-2 bg-emerald-50 hover:bg-emerald-100/80 text-emerald-900 border border-emerald-200/60 rounded-xl font-medium text-xs md:text-sm transition-all shadow-xs active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer shrink-0"
          >
            {isLoading ? (
              <Loader2 className="w-3.5 h-3.5 text-emerald-700 animate-spin" />
            ) : (
              hasPrestataireRole && (
                <Repeat className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
              )
            )}

            {/* Desktop / Tablet Text */}
            <span className="hidden sm:inline">
              {isLoading
                ? "Changement..."
                : !hasPrestataireRole
                  ? "Devenir prestataire"
                  : currentMode === "PRESTATAIRE"
                    ? "Passer en mode Client"
                    : "Passer en mode Prestataire"}
            </span>

            {/*  Mobile Short Text (Pro / Client / Devenir) */}
            <span className="inline sm:hidden font-semibold text-[11px]">
              {isLoading
                ? "..."
                : !hasPrestataireRole
                  ? "Devenir"
                  : currentMode === "PRESTATAIRE"
                    ? "Client"
                    : "Pro"}
            </span>
          </button>

          {/* Divider */}
          <div className="hidden sm:block h-8 w-px bg-gray-200"></div>

          {/* Profile User Info */}
          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-emerald-950 rounded-full flex items-center justify-center text-white font-bold shrink-0 text-sm sm:text-base">
              {(user?.fullname || user?.email || "U").charAt(0).toUpperCase()}
            </div>

            <div className="hidden sm:flex flex-col">
              <span className="text-sm font-semibold text-emerald-950 leading-tight">
                {user?.fullname || "Utilisateur"}
              </span>
              <span className="text-xs text-gray-500 font-medium capitalize">
                Espace {currentMode?.toLowerCase()}
              </span>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={() => setIsLogoutModalOpen(true)}
            className="p-1.5 sm:p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all cursor-pointer"
            title="Se déconnecter"
          >
            <LogOut className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
          </button>
        </div>
      </nav>

      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogoutConfirm}
      />
    </>
  );
};

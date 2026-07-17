import React from "react";
import { Link } from "react-router-dom";
import { LogOut } from "lucide-react";

interface SessionExpiredModalProps {
  isOpen: boolean;
  onClose: () => void; // كيفما قلتي، هادي كتحمل الـ référence ديال الدالة اللي كاتنظف الـ localStorage
}

export const SessionExpiredModal: React.FC<SessionExpiredModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-cream-200 text-center space-y-4 animate-in zoom-in duration-200">
        {/* Icon */}
        <div className="mx-auto w-12 h-12 bg-rose-50 rounded-full flex items-center justify-center">
          <LogOut className="w-6 h-6 text-rose-600" />
        </div>

        {/* Content */}
        <div className="space-y-2">
          <h3 className="text-base font-bold text-forest-900">
            Session Expirée
          </h3>
          <p className="text-xs text-forest-500 leading-relaxed">
            Votre session a expiré ou n'est plus valide. Pour des raisons de
            sécurité, veuillez vous reconnecter pour accéder à votre espace.
          </p>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <Link
            to="/"
            onClick={onClose}
            className="inline-block w-full px-5 py-2.5 bg-forest-700 hover:bg-forest-800 text-white rounded-xl text-xs font-bold transition-all shadow-sm text-center"
          >
            Retourner à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
};

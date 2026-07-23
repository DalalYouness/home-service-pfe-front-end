import React, { useEffect, useState } from "react";
import { AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface SessionExpiredModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SessionExpiredModal: React.FC<SessionExpiredModalProps> = ({
  isOpen,
  onClose,
}) => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(7);

  useEffect(() => {
    if (!isOpen) return;

    setCountdown(7);

    const interval = setInterval(() => {
      setCountdown((prev) => (prev > 1 ? prev - 1 : 1));
    }, 1000);

    const timer = setTimeout(() => {
      // Clean LocalStorage
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      onClose();

      navigate("/", { replace: true });
    }, 7000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [isOpen, onClose, navigate]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl p-6 border border-cream-200 text-center space-y-4">
        <div className="mx-auto w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center text-amber-600">
          <AlertCircle className="w-6 h-6" />
        </div>

        <div className="space-y-2">
          <h3 className="text-base font-bold text-gray-900">Session expirée</h3>
          <p className="text-xs text-gray-500 leading-relaxed">
            Votre session a expiré pour des raisons de sécurité. Vous allez être
            redirigé vers l'accueil automatiquement.
          </p>
        </div>
        <div className="inline-flex items-center justify-center px-3 py-1 bg-gray-100 rounded-full text-xs font-semibold text-gray-600">
          Redirection dans {countdown}s...
        </div>
      </div>
    </div>
  );
};

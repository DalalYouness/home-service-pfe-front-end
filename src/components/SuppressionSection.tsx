import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserX, AlertTriangle, Loader2 } from "lucide-react";

export const SuppressionSection: React.FC = () => {
  const navigate = useNavigate();
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteAccount = () => {
    setIsDeleting(true);
    setTimeout(() => {
      localStorage.clear();
      navigate("/");
    }, 1500);
  };

  return (
    <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
      <div className="space-y-1">
        <h2 className="text-base font-bold text-amber-600 flex items-center gap-2">
          <UserX className="w-4 h-4 text-amber-500" />
          Suppression du compte
        </h2>
        <p className="text-xs text-forest-500">
          Fermer définitivement votre compte.
        </p>
      </div>

      <div className="md:col-span-2">
        <div className="w-full max-w-xl space-y-4">
          <p className="text-xs text-forest-700/75 leading-relaxed">
            Cette action supprimera définitivement toutes vos données de nos
            serveurs. Vous ne pourrez plus récupérer vos informations.
          </p>

          {!isDeleteConfirmOpen ? (
            <button
              onClick={() => setIsDeleteConfirmOpen(true)}
              className="px-4 py-2.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 rounded-xl text-xs font-bold transition-all border border-amber-500/10"
            >
              Supprimer le compte
            </button>
          ) : (
            <div className="border border-amber-500/20 bg-amber-500/5 p-5 rounded-2xl animate-in slide-in-from-top-2 duration-200 w-full">
              <div className="flex gap-3 items-start mb-4">
                <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-forest-900">
                    Confirmation requise
                  </h4>
                  <p className="text-[11px] text-forest-700/70 mt-1">
                    Êtes-vous sûr de vouloir supprimer définitivement votre
                    compte ?
                  </p>
                </div>
              </div>

              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setIsDeleteConfirmOpen(false)}
                  disabled={isDeleting}
                  className="px-3.5 py-2 border border-cream-200 bg-white rounded-lg text-[11px] font-bold text-forest-700 hover:bg-cream-50 transition-all"
                >
                  Annuler
                </button>
                <button
                  onClick={handleDeleteAccount}
                  disabled={isDeleting}
                  className="px-3.5 py-2 bg-amber-600 hover:bg-amber-500 disabled:bg-amber-600/60 text-white rounded-lg text-[11px] font-bold transition-all flex items-center gap-1.5"
                >
                  {isDeleting && <Loader2 className="w-3 h-3 animate-spin" />}
                  {isDeleting ? "Suppression..." : "Oui, supprimer"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

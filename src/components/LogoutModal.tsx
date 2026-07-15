import React from "react";
import { AlertTriangle } from "lucide-react";

/**
 * Interface définissant les propriétés du composant LogoutModal.
 * Ce composant a besoin de deux fonctions de rappel (callbacks) pour communiquer avec son parent.
 */
interface LogoutModalProps {
  isOpen: boolean; // Contrôle la visibilité du modal
  onClose: () => void; // Fonction appelée pour fermer le modal (sans déconnexion)
  onConfirm: () => void; // Fonction appelée pour confirmer la déconnexion
}

export const LogoutModal: React.FC<LogoutModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  // Si le modal n'est pas ouvert, on ne dessine rien (Unmount)
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* ==========================================
          ARRIÈRE-PLAN SOMBRE ET FLOUTÉ (BACKDROP)
          Bloque l'interaction avec le reste de la page et crée l'effet de focus.
         ========================================== */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose} // Ferme aussi si on clique en dehors de la boîte
      />

      {/* ==========================================
          BOÎTE DE DIALOGUE (MODAL CONTAINER)
          La carte contenant le message de confirmation et les boutons d'action.
         ========================================== */}
      <div className="relative bg-white rounded-2xl p-6 max-w-sm w-full mx-4 shadow-xl border border-gray-100 z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Icône d'avertissement stylisée */}
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-amber-50 text-amber-600 mb-4">
          <AlertTriangle className="h-6 w-6" />
        </div>

        {/* Texte de confirmation */}
        <div className="text-center mb-6">
          <h3 className="text-lg font-bold text-emerald-950">
            Confirmer la déconnexion
          </h3>
          <p className="text-sm text-gray-500 mt-2">
            Êtes-vous sûr de vouloir vous déconnecter de votre espace client ?
          </p>
        </div>

        {/* Actions (Boutons Oui / Non) */}
        <div className="flex gap-3">
          {/* Bouton Annuler (Non) */}
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-700 font-medium rounded-xl text-sm hover:bg-gray-50 transition-all focus:outline-none"
          >
            Non, rester
          </button>

          {/* Bouton Confirmer (Oui) */}
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-medium rounded-xl text-sm transition-all shadow-md shadow-red-600/10 focus:outline-none"
          >
            Oui, quitter
          </button>
        </div>
      </div>
    </div>
  );
};

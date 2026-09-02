import React from "react";
import { AlertTriangle, RefreshCw, X } from "lucide-react";
import { useServicesManager } from "../hooks/useServicesManager";
import type { ServiceResponseDto } from "../types/categorie";

interface DeleteServiceModalProps {
  isOpen: boolean;
  service: ServiceResponseDto | null;
  onClose: () => void;
  onSuccess?: (message: string) => void;
}

export const DeleteServiceModal: React.FC<DeleteServiceModalProps> = ({
  isOpen,
  service,
  onClose,
  onSuccess,
}) => {
  const { handleDeleteService, isSubmitting, error, setError } =
    useServicesManager();

  if (!isOpen || !service) return null;

  const handleClose = () => {
    setError(null);
    onClose();
  };

  const handleConfirmDelete = async () => {
    try {
      await handleDeleteService(service.id, (msg) => {
        if (onSuccess) {
          onSuccess(msg);
        }
        handleClose();
      });
    } catch (err) {
      // we don't need to do anything here since the error is already handled in the hook
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/40 backdrop-blur-xs">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-card p-5 sm:p-6 border border-cream-200 animate-in fade-in zoom-in-95 duration-150">
        {/* Close Button */}
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-gray-400 hover:bg-cream-50 transition-colors cursor-pointer"
        >
          <X size={20} />
        </button>

        {/* Warning Icon & Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-red-100 rounded-2xl text-red-600 shrink-0">
            <AlertTriangle size={24} />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-gray-900">
              Supprimer le service
            </h3>
            <p className="text-xs text-gray-500">Action irréversible</p>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs font-medium">
            {error}
          </div>
        )}

        <p className="text-xs sm:text-sm text-gray-600 mb-6">
          Êtes-vous sûr de vouloir supprimer le service{" "}
          <span className="font-bold text-forest-900">"{service.name}"</span> ?
          Cette action ne peut pas être annulée.
        </p>

        {/* Actions */}
        <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3">
          <button
            type="button"
            onClick={handleClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-2xl text-xs font-bold text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer text-center"
          >
            Annuler
          </button>
          <button
            type="button"
            disabled={isSubmitting}
            onClick={handleConfirmDelete}
            className="w-full sm:w-auto px-6 py-2.5 rounded-2xl text-xs font-semibold text-white bg-red-600 hover:bg-red-700 shadow-xs cursor-pointer disabled:opacity-50 inline-flex items-center justify-center gap-2 transition-all active:scale-95"
          >
            {isSubmitting && <RefreshCw size={14} className="animate-spin" />}
            <span>
              {isSubmitting ? "Suppression..." : "Confirmer la suppression"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

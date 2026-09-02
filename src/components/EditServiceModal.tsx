import React, { useState, useEffect } from "react";
import { Pencil, X, RefreshCw } from "lucide-react";
import { useServicesManager } from "../hooks/useServicesManager";
import type { ServiceResponseDto } from "../types/categorie";

interface EditServiceModalProps {
  isOpen: boolean;
  service: ServiceResponseDto | null;
  onClose: () => void;
  onSuccess?: (message: string) => void;
}

export const EditServiceModal: React.FC<EditServiceModalProps> = ({
  isOpen,
  service,
  onClose,
  onSuccess,
}) => {
  const { handleUpdateService, isSubmitting, error, setError } =
    useServicesManager();

  const [formData, setFormData] = useState({ name: "", description: "" });

  useEffect(() => {
    if (service) {
      setFormData({
        name: service.name || "",
        description: service.description || "",
      });
    }
  }, [service]);

  if (!isOpen || !service) return null;

  const handleClose = () => {
    setError(null);
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await handleUpdateService(
        service.id,
        {
          serviceName: formData.name,
          description: formData.description,
        },
        (successMsg) => {
          if (onSuccess) {
            onSuccess(successMsg || "Service modifié avec succès !");
          }
          handleClose();
        },
      );
    } catch (err) {
      // Error is already handled in the hook, so we don't need to do anything here
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/40 backdrop-blur-xs">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-card p-5 sm:p-6 border border-cream-200 animate-in fade-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 p-1.5 rounded-full text-gray-400 hover:bg-cream-50 transition-colors cursor-pointer"
        >
          <X size={20} />
        </button>

        {/* Modal Title */}
        <h2 className="text-lg sm:text-xl font-bold text-forest-900 mb-4 flex items-center gap-2 pr-6">
          <Pencil className="text-forest-800 shrink-0" size={20} />
          <span>Modifier le service</span>
        </h2>

        {/* Error Alert */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs font-medium">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-forest-900 mb-1">
              Nom du service <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              maxLength={50}
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-3.5 sm:px-4 py-2.5 text-xs sm:text-sm bg-[#faf8f3] border border-[#e8dfc8] rounded-2xl focus:outline-none focus:border-forest-500 text-gray-700"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-forest-900 mb-1">
              Description
            </label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full px-3.5 sm:px-4 py-2.5 text-xs sm:text-sm bg-[#faf8f3] border border-[#e8dfc8] rounded-2xl focus:outline-none focus:border-forest-500 text-gray-700 resize-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="pt-3 flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3">
            <button
              type="button"
              onClick={handleClose}
              className="w-full sm:w-auto px-5 py-2.5 rounded-2xl text-xs font-bold text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer text-center"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-6 py-2.5 rounded-2xl text-xs font-semibold text-white bg-forest-900 hover:bg-forest-800 shadow-xs cursor-pointer disabled:opacity-50 inline-flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              {isSubmitting && <RefreshCw size={14} className="animate-spin" />}
              <span>
                {isSubmitting
                  ? "Enregistrement..."
                  : "Enregistrer les modifications"}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

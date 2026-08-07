import { X, UserX } from "lucide-react";
import { usePublicProviders } from "../hooks/usePublicProviders";
import { ProviderCard } from "./ProviderCard";

type ProvidersModalProps = {
  isOpen: boolean;
  onClose: () => void;
  serviceId: number;
  serviceTitle: string;
};

export const ProvidersModal = ({
  isOpen,
  onClose,
  serviceId,
  serviceTitle,
}: ProvidersModalProps) => {
  const { providers, isLoading } = usePublicProviders(serviceId, isOpen);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="relative w-full max-w-5xl max-h-[85vh] bg-white border border-gray-100 rounded-[2.5rem] p-6 md:p-8 shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-300">
        {/* Header Section */}
        <div className="flex items-center justify-between pb-6 border-b border-gray-100">
          <div>
            <span className="text-xs font-semibold text-emerald-600 uppercase tracking-widest">
              Prestataires disponibles
            </span>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-gray-900 mt-1">
              {serviceTitle}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 border border-gray-200 text-gray-700 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Fermer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Dynamic Content Area */}
        <div className="flex-1 overflow-y-auto py-6 pr-1">
          {/* 1. Loading State (Skeletons) */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="w-full max-w-sm rounded-[1.75rem] border border-gray-100 p-5 animate-pulse flex flex-col justify-between h-[210px] bg-gray-50/50"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-14 h-14 rounded-full bg-gray-200 shrink-0" />
                    <div className="flex-1 space-y-2 py-1">
                      <div className="h-4 bg-gray-200 rounded w-3/4" />
                      <div className="h-3 bg-gray-200 rounded w-1/2" />
                    </div>
                  </div>
                  <div className="space-y-3 pt-4 border-t border-gray-100">
                    <div className="h-3 bg-gray-200 rounded w-1/4" />
                    <div className="h-10 bg-gray-200 rounded-xl w-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : providers.length === 0 ? (
            /* 2. Empty State */
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                <UserX size={32} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">
                Aucun prestataire disponible
              </h3>
              <p className="text-sm text-gray-500 max-w-sm">
                Il n'y a actuellement aucun prestataire enregistré pour le
                service{" "}
                <span className="font-semibold text-gray-700">
                  "{serviceTitle}"
                </span>
                .
              </p>
            </div>
          ) : (
            /* 3. Data Grid State */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
              {providers.map((provider) => (
                // hadi ahsan tariqa bach props onthanaw hiya nsifto destructured props directly
                <ProviderCard key={provider.id} {...provider} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

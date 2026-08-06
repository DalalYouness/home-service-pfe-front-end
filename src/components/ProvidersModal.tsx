import { X } from "lucide-react";

type ProvidersModalProps = {
  isOpen: boolean;
  onClose: () => void;
  serviceTitle: string;
};

export const ProvidersModal = ({
  isOpen,
  onClose,
  serviceTitle,
}: ProvidersModalProps) => {
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
        <div className="flex-1 overflow-y-auto py-6"></div>
      </div>
    </div>
  );
};

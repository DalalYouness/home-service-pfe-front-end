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
    // 1. Dark Overlay Overlay
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      {/* 2. Main Window - Background White / Clean Light Design */}
      <div className="relative w-full max-w-4xl max-h-[85vh] bg-white border border-gray-100 rounded-[2.5rem] p-6 md:p-8 shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-300">
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

          {/* Close Button - Clean Light Style */}
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 border border-gray-200 text-gray-700 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Fermer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Placeholder Content Area */}
        <div className="flex-1 overflow-y-auto py-12 flex flex-col items-center justify-center text-center">
          <div className="p-6 rounded-2xl bg-gray-50 border border-gray-200/80 max-w-md shadow-sm">
            <p className="text-forest-950 font-semibold text-base mb-1">
              📍 Composant ProvidersModal
            </p>
            <p className="text-xs text-gray-500 leading-relaxed">
              هنا غيكونوا الـ Prestataires كاملين اللي كايقدموا هاد الـ Service
              ({serviceTitle}).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

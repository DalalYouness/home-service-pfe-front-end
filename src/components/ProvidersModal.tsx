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
    // 1. Backdrop overlay
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-300">
      {/* 2. Main Window */}
      <div className="relative w-full max-w-4xl max-h-[85vh] bg-forest-950/90 border border-white/15 rounded-[2.5rem] p-6 md:p-8 shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-300">
        {/* Header Section */}
        <div className="flex items-center justify-between pb-6 border-b border-white/10">
          <div>
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest">
              Prestataires disponibles
            </span>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-white mt-1">
              {serviceTitle}
            </h2>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Fermer"
          >
            <X size={20} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto py-12 flex flex-col items-center justify-center text-center">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 max-w-md">
            <p className="text-cream-100 font-medium text-base mb-1">
              📍 Composant ProvidersModal
            </p>
            <p className="text-xs text-gray-400">
              هنا غيكونوا الـ Prestataires كاملين اللي كايقدموا هاد الـ Service
              ({serviceTitle}).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

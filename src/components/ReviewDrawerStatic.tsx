import React, { useState } from "react";
import ReactDOM from "react-dom";
import {
  ThumbsUp,
  ThumbsDown,
  X,
  MessageSquare,
  Send,
  Loader2,
} from "lucide-react";
import { useCreateReview } from "../hooks/useCreateReview";

interface ReviewDrawerProps {
  isOpen: boolean;
  onClose?: () => void;
  reservationId: number;
  onSuccess?: () => void;
}

export const ReviewDrawerStatic: React.FC<ReviewDrawerProps> = ({
  isOpen,
  onClose,
  reservationId,
  onSuccess,
}) => {
  const [isRecommended, setIsRecommended] = useState<boolean | null>(null);
  const [comment, setComment] = useState<string>("");

  const { handleCreateReview, loading, error } = useCreateReview();

  if (!isOpen) return null;

  const handleSelectRecommendation = (value: boolean) => {
    setIsRecommended(value);
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleSubmit = async () => {
    if (isRecommended === null) return;

    await handleCreateReview(
      {
        reservationId,
        isRecommended,
        comment,
      },
      () => {
        setIsRecommended(null);
        setComment("");
        if (onSuccess) onSuccess();
        if (onClose) onClose();
      },
    );
  };

  const content = (
    <>
      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-slide-in {
          animation: slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[9999] bg-forest-950/40 backdrop-blur-xs flex justify-end"
        onClick={onClose}
      >
        {/* Drawer Content */}
        <div
          className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col font-sans animate-slide-in border-l border-forest-100"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-5 border-b border-forest-100 bg-cream-50 flex items-center justify-between">
            <div>
              <h3 className="font-serif font-bold text-forest-900 text-lg">
                Évaluer le service
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Votre avis aide la communauté
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-stone-400 hover:text-forest-900 hover:bg-forest-100/50 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 space-y-6 flex-1 overflow-y-auto">
            {error && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs font-semibold">
                {error}
              </div>
            )}

            {/* Recommandation */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-forest-900 uppercase tracking-wider block">
                Recommandez-vous ce prestataire ?
              </label>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleSelectRecommendation(true)}
                  className={`py-4 px-4 rounded-2xl border flex flex-col items-center justify-center gap-2 font-bold text-xs cursor-pointer transition-all ${
                    isRecommended === true
                      ? "bg-forest-900 text-cream-50 border-forest-900 shadow-sm"
                      : "bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100"
                  }`}
                >
                  <ThumbsUp
                    className={`w-5 h-5 ${
                      isRecommended === true
                        ? "text-amber-400"
                        : "text-stone-400"
                    }`}
                  />
                  <span>Oui, absolument</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSelectRecommendation(false)}
                  className={`py-4 px-4 rounded-2xl border flex flex-col items-center justify-center gap-2 font-bold text-xs cursor-pointer transition-all ${
                    isRecommended === false
                      ? "bg-forest-900 text-cream-50 border-forest-900 shadow-sm"
                      : "bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100"
                  }`}
                >
                  <ThumbsDown
                    className={`w-5 h-5 ${
                      isRecommended === false
                        ? "text-amber-400"
                        : "text-stone-400"
                    }`}
                  />
                  <span>Non</span>
                </button>
              </div>
            </div>

            {/* Commentaire */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-forest-900 uppercase tracking-wider flex items-center gap-1.5">
                  <MessageSquare className="w-4 h-4 text-forest-700" />
                  <span>Votre remarque</span>
                </label>
                <span className="text-[10px] font-semibold text-stone-400 bg-stone-100 px-2 py-0.5 rounded-full">
                  Optionnel
                </span>
              </div>

              <textarea
                value={comment}
                onChange={handleCommentChange}
                placeholder="Ex: Prestataire très ponctuel et travail propre..."
                rows={4}
                className="w-full px-4 py-3 text-xs sm:text-sm bg-stone-50/50 border border-stone-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-forest-800 focus:border-transparent outline-none transition-all resize-none text-forest-950 placeholder-stone-400"
              />
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-5 border-t border-forest-100 bg-cream-50/50 flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 py-3 text-xs font-semibold text-stone-600 bg-white border border-stone-200 hover:bg-stone-50 rounded-xl transition-all cursor-pointer disabled:opacity-50"
            >
              Annuler
            </button>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading || isRecommended === null}
              className="flex-1 py-3 text-xs font-bold text-cream-50 bg-forest-900 hover:bg-forest-950 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Publier</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );

  return ReactDOM.createPortal(content, document.body);
};

export default ReviewDrawerStatic;

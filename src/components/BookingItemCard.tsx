import React, { useState } from "react";
import {
  Calendar,
  Clock,
  XCircle,
  User,
  Wrench,
  Loader2,
  Check,
  X,
} from "lucide-react";
import { type ReservationResponse, BookingStatus } from "../types/reservation";

interface BookingItemCardProps {
  booking: ReservationResponse;
  onCancel?: (bookingId: number) => Promise<void> | void;
}

export const BookingItemCard: React.FC<BookingItemCardProps> = ({
  booking,
  onCancel,
}) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);

  const rdvDateTime = booking.dateRdv ? new Date(booking.dateRdv) : null;

  const formattedDate = rdvDateTime
    ? rdvDateTime.toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "Non définie";

  const formattedTime = rdvDateTime
    ? rdvDateTime.toLocaleTimeString("fr-FR", {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "--:--";

  const getStatusBadge = (status: BookingStatus) => {
    switch (status) {
      case BookingStatus.PENDING:
        return {
          label: "En attente",
          style: "bg-amber-50 text-amber-700 border-amber-200",
        };
      case BookingStatus.CONFIRMED:
        return {
          label: "Confirmée",
          style: "bg-forest-50 text-forest-700 border-forest-200",
        };
      case BookingStatus.REJECTED:
        return {
          label: "Refusée",
          style: "bg-orange-50 text-orange-700 border-orange-200",
        };
      case BookingStatus.CANCELLED:
        return {
          label: "Annulée",
          style: "bg-red-50 text-red-600 border-red-200",
        };
      case BookingStatus.COMPLETED:
        return {
          label: "Terminée",
          style: "bg-blue-50 text-blue-700 border-blue-200",
        };
      default:
        return {
          label: status,
          style: "bg-gray-50 text-gray-600 border-gray-200",
        };
    }
  };

  const statusInfo = getStatusBadge(booking.status);
  const isCancellable =
    booking.status === BookingStatus.PENDING ||
    booking.status === BookingStatus.CONFIRMED;

  const handleConfirmCancel = async () => {
    if (!onCancel) return;
    try {
      setIsCancelling(true);
      await onCancel(booking.id);
    } finally {
      setIsCancelling(false);
      setShowConfirm(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-5 border border-forest-100/70 shadow-card hover:shadow-card-hover transition-all flex flex-col justify-between font-sans relative group">
      <div>
        {/* Top Header inside Card: ID & Status */}
        <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-cream-100">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-forest-700 bg-forest-50 px-2.5 py-1 rounded-lg border border-forest-100">
              #{booking.id}
            </span>
            <span className="text-[11px] font-semibold text-gray-400">
              Réservation
            </span>
          </div>

          <span
            className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${statusInfo.style}`}
          >
            {statusInfo.label}
          </span>
        </div>

        {/* Card Body: Details */}
        <div className="space-y-3 mb-5">
          {/* Service Info */}
          <div className="flex items-start gap-2.5">
            <Wrench className="w-4 h-4 text-forest-600 shrink-0 mt-0.5" />
            <div>
              <span className="text-[11px] text-gray-400 block font-medium">
                Service
              </span>
              <h4 className="font-serif font-bold text-forest-900 text-base leading-tight">
                {`Service #${booking.idService}`}
              </h4>
            </div>
          </div>

          {/* Provider Info */}
          <div className="flex items-start gap-2.5">
            <User className="w-4 h-4 text-forest-600 shrink-0 mt-0.5" />
            <div>
              <span className="text-[11px] text-gray-400 block font-medium">
                Prestataire
              </span>
              <p className="text-xs text-forest-800 font-semibold">
                {`Prestataire #${booking.idProvider}`}
              </p>
            </div>
          </div>

          {/* Date & Time Grid */}
          <div className="grid grid-cols-2 gap-2 pt-2 bg-cream-50/60 p-2.5 rounded-xl border border-cream-100">
            <div className="flex items-center gap-1.5 text-xs text-gray-700 font-medium">
              <Calendar className="w-3.5 h-3.5 text-forest-500 shrink-0" />
              <span className="truncate">{formattedDate}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-gray-700 font-medium">
              <Clock className="w-3.5 h-3.5 text-forest-500 shrink-0" />
              <span>{formattedTime}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Card Footer: Action Button or Inline Confirmation */}
      <div className="pt-3 border-t border-cream-100">
        {isCancellable ? (
          !showConfirm ? (
            /* State 1: Default Cancel Button */
            <button
              onClick={() => setShowConfirm(true)}
              className="w-full flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100/80 border border-red-200/60 rounded-xl transition-all cursor-pointer active:scale-95"
            >
              <XCircle className="w-4 h-4" />
              <span>Annuler la réservation</span>
            </button>
          ) : (
            /* State 2: Confirmation Buttons (Oui / Non) */
            <div className="flex items-center gap-2 animate-in fade-in duration-200">
              <button
                onClick={handleConfirmCancel}
                disabled={isCancelling}
                className="flex-1 flex items-center justify-center gap-1 px-2.5 py-2 text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl transition-all cursor-pointer active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isCancelling ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Check className="w-3.5 h-3.5" />
                )}
                <span>{isCancelling ? "Annulation..." : "Oui, annuler"}</span>
              </button>

              <button
                onClick={() => setShowConfirm(false)}
                disabled={isCancelling}
                className="px-3 py-2 text-xs font-semibold text-gray-600 hover:text-gray-800 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all cursor-pointer active:scale-95 disabled:opacity-50"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )
        ) : (
          <div className="text-center py-1">
            <span className="text-xs text-gray-400 font-medium italic">
              {booking.status === BookingStatus.CANCELLED
                ? "Réservation annulée"
                : "Aucune action disponible"}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingItemCard;

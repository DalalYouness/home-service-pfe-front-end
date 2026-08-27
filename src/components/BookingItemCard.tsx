import { Calendar, Clock, XCircle, User, Wrench } from "lucide-react";

export const BookingItemCard = ({ booking }) => {
  // تقطيع date_rdv لـ التاريخ والوقت
  const rdvDateTime = booking.date_rdv ? new Date(booking.date_rdv) : null;
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

  // ألوان الـ Badge على حسب الـ status
  const getStatusBadge = (status) => {
    switch (status) {
      case "PENDING":
        return {
          label: "En attente",
          style: "bg-amber-50 text-amber-700 border-amber-200",
        };
      case "CONFIRMED":
        return {
          label: "Confirmée",
          style: "bg-forest-50 text-forest-700 border-forest-200",
        };
      case "CANCELLED":
        return {
          label: "Annulée",
          style: "bg-red-50 text-red-600 border-red-200",
        };
      default:
        return {
          label: status,
          style: "bg-gray-50 text-gray-600 border-gray-200",
        };
    }
  };

  const statusInfo = getStatusBadge(booking.status);

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
                {booking.serviceName || `Service #${booking.id_service}`}
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
                {booking.providerName || `Prestataire #${booking.id_provider}`}
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

      {/* Card Footer: Action Button */}
      <div className="pt-3 border-t border-cream-100">
        {booking.status !== "CANCELLED" ? (
          <button className="w-full flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100/80 border border-red-200/60 rounded-xl transition-all cursor-pointer active:scale-95">
            <XCircle className="w-4 h-4" />
            <span>Annuler la réservation</span>
          </button>
        ) : (
          <div className="text-center py-1">
            <span className="text-xs text-gray-400 font-medium italic">
              Réservation annulée
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingItemCard;

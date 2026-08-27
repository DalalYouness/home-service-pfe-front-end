import { Calendar, Clock, MapPin, AlertCircle, XCircle } from "lucide-react";

export const BookingItemCard = ({ booking }) => {
  const getStatusBadge = (status) => {
    switch (status) {
      case "PENDING":
        return {
          label: "En attente",
          style: "bg-amber-50 text-amber-600 border-amber-200",
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
    <div className="bg-white rounded-2xl p-4 sm:p-5 border border-forest-100/70 shadow-card hover:shadow-card-hover transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 font-sans relative overflow-hidden">
      {/* Left Part: Service & Details */}
      <div className="flex gap-4 items-start">
        {/* Service Image / Icon placeholder */}
        <div className="w-14 h-14 rounded-xl bg-cream-100 flex items-center justify-center shrink-0 border border-cream-200">
          <span className="font-serif font-bold text-forest-800 text-lg">
            {booking.serviceTitle?.charAt(0) || "S"}
          </span>
        </div>

        {/* Info */}
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="font-serif font-bold text-forest-900 text-base sm:text-lg">
              {booking.serviceTitle}
            </h4>
            {/* Status Badge */}
            <span
              className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${statusInfo.style}`}
            >
              {statusInfo.label}
            </span>
          </div>

          <p className="text-xs text-gray-500 font-medium">
            Prestataire:{" "}
            <span className="text-forest-800 font-semibold">
              {booking.prestataireName}
            </span>
          </p>

          {/* Date, Time, Location */}
          <div className="flex items-center gap-3 text-xs text-gray-500 flex-wrap pt-1">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-forest-500" />
              {booking.bookingDate}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-forest-500" />
              {booking.bookingTime}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-forest-500" />
              {booking.city}
            </span>
          </div>
        </div>
      </div>

      {/* Right Part: Price & Actions */}
      <div className="flex md:flex-col items-center md:items-end justify-between border-t md:border-t-0 pt-3 md:pt-0 border-cream-100 gap-3">
        {/* Price */}
        <div className="text-left md:text-right">
          <span className="text-[10px] text-gray-400 block uppercase font-bold tracking-wider">
            Prix Total
          </span>
          <span className="font-serif font-bold text-forest-800 text-lg sm:text-xl">
            {booking.price} DH
          </span>
        </div>

        {/* Cancel Action Button */}
        {booking.status !== "CANCELLED" && (
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100/80 border border-red-200/60 rounded-xl transition-all cursor-pointer active:scale-95">
            <XCircle className="w-4 h-4" />
            <span>Annuler</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default BookingItemCard;

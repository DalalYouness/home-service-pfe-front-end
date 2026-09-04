import React, { useState, useMemo } from "react";
import { ReservationCardItem } from "./ReservationCardItem";
import { useReservations } from "../hooks/useReservations";
import { useAuth } from "../context/AuthContext";
import {
  Loader2,
  AlertCircle,
  CalendarX,
  RotateCw,
  Search,
  X,
} from "lucide-react";

export const AllReservations: React.FC = () => {
  const { user, currentMode } = useAuth();
  const userId = user?.id;

  const [searchTerm, setSearchTerm] = useState("");

  const {
    bookings,
    loading,
    error,
    refetchBookings,
    cancelBooking,
    confirmBooking,
    rejectBooking,
    completeBooking,
  } = useReservations(userId, currentMode);

  // filtration of bookings based on searchTerm
  const filteredBookings = useMemo(() => {
    if (!searchTerm.trim()) return bookings;

    const term = searchTerm.trim().toLowerCase();
    return bookings.filter((booking) => {
      const bookingIdMatch = booking.id?.toString().includes(term);
      const serviceMatch = booking.serviceName?.toLowerCase().includes(term);
      return bookingIdMatch || serviceMatch;
    });
  }, [bookings, searchTerm]);

  return (
    <div className="w-full space-y-5 py-6 px-4 md:px-8 pb-16 font-sans">
      {/* Header + Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-forest-100">
        <div className="space-y-1">
          <h1 className="text-xl md:text-2xl font-bold text-forest-800 tracking-tight">
            Mes Réservations
          </h1>
          <p className="text-xs md:text-sm text-forest-700/70">
            Suivez et gérez l'état de vos rendez-vous.
          </p>
        </div>

        {/* Search Bar + Refresh Button */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          {/* Input Search */}
          <div className="relative flex-1 md:w-64">
            <Search className="w-4 h-4 text-forest-600 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Rechercher par N° (ex: 9)..."
              className="w-full pl-9 pr-8 py-2 text-xs bg-white border border-forest-200/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-forest-700/20 focus:border-forest-700 transition-all text-forest-900 placeholder:text-stone-400"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-forest-900 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Refresh Button */}
          <button
            onClick={() => refetchBookings()}
            disabled={loading}
            title="Actualiser les données"
            className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-forest-800 bg-forest-50 hover:bg-forest-100 border border-forest-200/80 rounded-xl transition-all cursor-pointer active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
          >
            <RotateCw
              className={`w-3.5 h-3.5 text-forest-700 ${
                loading ? "animate-spin" : ""
              }`}
            />
            <span className="hidden sm:inline">Actualiser</span>
          </button>
        </div>
      </div>

      {/* 1. State: Loading */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <Loader2 className="w-9 h-9 text-forest-700 animate-spin" />
          <p className="text-xs text-forest-800 font-medium tracking-wide">
            Chargement de vos réservations...
          </p>
        </div>
      )}

      {/* 2. State: Error */}
      {!loading && error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center justify-between gap-3 text-red-700 text-xs sm:text-sm">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{error}</span>
          </div>
          <button
            onClick={() => refetchBookings()}
            className="text-xs font-bold underline hover:text-red-800 cursor-pointer"
          >
            Réessayer
          </button>
        </div>
      )}

      {/* 3. State: Empty List */}
      {!loading && !error && filteredBookings.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 px-4 bg-cream-50/60 rounded-3xl border border-forest-100/80 text-center">
          <div className="w-14 h-14 bg-forest-100/60 rounded-2xl flex items-center justify-center mb-3">
            <CalendarX className="w-7 h-7 text-forest-800" />
          </div>
          <h3 className="font-bold text-forest-900 text-base">
            {searchTerm
              ? "Aucun résultat trouvé"
              : "Aucune réservation trouvée"}
          </h3>
          <p className="text-xs text-forest-700/70 max-w-sm mt-1">
            {searchTerm
              ? `Aucune réservation ne correspond au numéro ou terme "${searchTerm}".`
              : "Vous n'avez pas encore effectué de demande de rendez-vous."}
          </p>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="mt-4 px-4 py-2 text-xs font-bold text-forest-800 bg-forest-100 hover:bg-forest-200 rounded-xl transition-all cursor-pointer"
            >
              Effacer la recherche
            </button>
          )}
        </div>
      )}

      {/* 4. State: Grid View */}
      {!loading && !error && filteredBookings.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pt-2">
          {filteredBookings.map((booking) => (
            <ReservationCardItem
              key={booking.id}
              booking={booking}
              mode={currentMode}
              onCancel={cancelBooking}
              onConfirm={confirmBooking}
              onReject={rejectBooking}
              onComplete={completeBooking}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllReservations;

// import React from "react";
// import { ReservationCardItem } from "./ReservationCardItem";
// import { useReservations } from "../hooks/useReservations";
// import { useAuth } from "../context/AuthContext";
// import { Loader2, AlertCircle, CalendarX, RotateCw } from "lucide-react";

// export const AllReservations: React.FC = () => {
//   const { user, currentMode } = useAuth();
//   const userId = user?.id;

//   const {
//     bookings,
//     loading,
//     error,
//     refetchBookings,
//     cancelBooking,
//     confirmBooking,
//     rejectBooking,
//     completeBooking,
//   } = useReservations(userId, currentMode);

//   return (
//     <div className="w-full space-y-4 py-6 px-4 md:px-8 pb-16 font-sans">
//       {/* Header + Refresh Button */}
//       <div className="flex items-start justify-between gap-4">
//         <div className="space-y-1">
//           <h1 className="text-xl md:text-2xl font-bold text-forest-800 tracking-tight">
//             Mes Réservations
//           </h1>
//           <p className="text-xs md:text-sm text-forest-700/70">
//             Suivez l'état de vos rendez-vous.
//           </p>
//         </div>

//         {/* Refresh Button */}
//         <button
//           onClick={() => refetchBookings()}
//           disabled={loading}
//           title="Actualiser les données"
//           className="flex items-center gap-2 px-3 py-1.5 md:px-3.5 md:py-2 text-xs font-semibold text-forest-800 bg-forest-50 hover:bg-forest-100 border border-forest-200/80 rounded-xl transition-all cursor-pointer active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
//         >
//           <RotateCw
//             className={`w-3.5 h-3.5 md:w-4 md:h-4 text-forest-700 ${
//               loading ? "animate-spin" : ""
//             }`}
//           />
//           <span className="hidden sm:inline">Actualiser</span>
//         </button>
//       </div>

//       {/* 1. State: Loading */}
//       {loading && (
//         <div className="flex flex-col items-center justify-center py-20 gap-3">
//           <Loader2 className="w-9 h-9 text-forest-700 animate-spin" />
//           <p className="text-xs text-forest-800 font-medium tracking-wide">
//             Chargement de vos réservations...
//           </p>
//         </div>
//       )}

//       {/* 2. State: Error */}
//       {!loading && error && (
//         <div className="p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center justify-between gap-3 text-red-700 text-xs sm:text-sm">
//           <div className="flex items-center gap-3">
//             <AlertCircle className="w-5 h-5 shrink-0" />
//             <span>{error}</span>
//           </div>
//           <button
//             onClick={() => refetchBookings()}
//             className="text-xs font-bold underline hover:text-red-800 cursor-pointer"
//           >
//             Réessayer
//           </button>
//         </div>
//       )}

//       {/* 3. State: Empty List */}
//       {!loading && !error && bookings.length === 0 && (
//         <div className="flex flex-col items-center justify-center py-16 px-4 bg-cream-50/60 rounded-3xl border border-forest-100/80 text-center">
//           <div className="w-14 h-14 bg-forest-100/60 rounded-2xl flex items-center justify-center mb-3">
//             <CalendarX className="w-7 h-7 text-forest-800" />
//           </div>
//           <h3 className="font-bold text-forest-900 text-base">
//             Aucune réservation trouvée
//           </h3>
//           <p className="text-xs text-forest-700/70 max-w-sm mt-1">
//             Vous n'avez pas encore effectué de demande de rendez-vous.
//           </p>
//         </div>
//       )}

//       {/* 4. State: Grid View */}
//       {!loading && !error && bookings.length > 0 && (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pt-2">
//           {bookings.map((booking) => (
//             <ReservationCardItem
//               key={booking.id}
//               booking={booking}
//               mode={currentMode}
//               onCancel={cancelBooking}
//               onConfirm={confirmBooking}
//               onReject={rejectBooking}
//               onComplete={completeBooking}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default AllReservations;

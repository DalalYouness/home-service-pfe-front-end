import { BookingItemCard } from "./BookingItemCard";

export const ClientBookings = () => {
  // Data مطابق لـ الجدول ديالك
  const dummyBookingsFromDB = [
    {
      id: 1,
      date_rdv: "2026-08-28 15:12:00",
      duree_reel: null,
      status: "PENDING",
      id_client: 14,
      id_provider: 19,
      id_service: 16,
      created_at: "2026-08-27 15:12:09",
    },
    {
      id: 2,
      date_rdv: "2026-08-30 15:13:00",
      duree_reel: null,
      status: "PENDING",
      id_client: 14,
      id_provider: 19,
      id_service: 16,
      created_at: "2026-08-27 15:13:06",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 font-sans">
      {/* Header */}
      <div className="mb-6">
        <h1 className="font-serif font-bold text-2xl sm:text-3xl text-forest-900">
          Mes Réservations
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          Suivez l'état de vos rendez-vous et gérez vos annulations.
        </p>
      </div>

      {/* Grid Container */}
      {dummyBookingsFromDB.length === 0 ? (
        <div className="text-center py-12 bg-cream-50 rounded-2xl border border-forest-100">
          <p className="text-forest-800 font-semibold text-sm">
            Aucune réservation trouvée.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {dummyBookingsFromDB.map((booking) => (
            <BookingItemCard key={booking.id} booking={booking} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ClientBookings;

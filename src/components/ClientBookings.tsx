import { BookingItemCard } from "./BookingItemCard";

export const ClientBookings = () => {
  const dummyBookings = [
    {
      id: 101,
      serviceTitle: "Nettoyage Complet Appartement",
      prestataireName: "Youssef Alami",
      bookingDate: "2026-09-02",
      bookingTime: "14:00",
      city: "Casablanca",
      price: 350,
      status: "PENDING",
    },
    {
      id: 102,
      serviceTitle: "Réparation Plomberie Cuisine",
      prestataireName: "Amine Benali",
      bookingDate: "2026-08-30",
      bookingTime: "10:30",
      city: "Casablanca",
      price: 200,
      status: "CONFIRMED",
    },
    {
      id: 103,
      serviceTitle: "Peinture Chambre Enfant",
      prestataireName: "Hassan Berrada",
      bookingDate: "2026-08-20",
      bookingTime: "09:00",
      city: "Mohammedia",
      price: 600,
      status: "CANCELLED",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 font-sans">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="font-serif font-bold text-2xl sm:text-3xl text-forest-900">
          Mes Réservations
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          Gérez vos demandes de services et suivez leur état en temps réel.
        </p>
      </div>

      {/* Bookings List */}
      <div className="space-y-4">
        {dummyBookings.length === 0 ? (
          <div className="text-center py-12 bg-cream-50 rounded-2xl border border-forest-100">
            <p className="text-forest-800 font-semibold">
              Aucune réservation pour le moment.
            </p>
          </div>
        ) : (
          dummyBookings.map((booking) => (
            <BookingItemCard key={booking.id} booking={booking} />
          ))
        )}
      </div>
    </div>
  );
};

export default ClientBookings;

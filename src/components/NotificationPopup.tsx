export const NotificationPopup = () => {
  const dummyNotifications = [
    {
      id: 1,
      message:
        "Vous avez reçu une nouvelle demande de réservation de la part de Karim.",
      createdAt: "Il y a 5 min",
      isRead: false,
    },
    {
      id: 2,
      message:
        "Votre prestation 'Nettoyage à domicile' a été marquée comme terminée.",
      createdAt: "Il y a 1 heure",
      isRead: false,
    },
    {
      id: 3,
      message: "Votre réservation #15 a été confirmée par le prestataire.",
      createdAt: "Hier",
      isRead: true,
    },
  ];

  return (
    <>
      <style>{`
        @keyframes envelopeOpen {
          0% {
            opacity: 0;
            transform: translateY(-12px) scale(0.92) rotateX(-15deg);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1) rotateX(0deg);
          }
        }
        .animate-envelope-direct {
          animation: envelopeOpen 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          transform-origin: top;
        }
      `}</style>

      {/* 2. الـ Popup Structure */}
      <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-white rounded-2xl shadow-card-hover border border-forest-100/60 z-50 overflow-hidden font-sans animate-envelope-direct">
        {/* Header */}
        <div className="p-4 border-b border-forest-100 bg-cream-50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="font-serif font-bold text-forest-900 text-base">
              Notifications
            </h3>
            <span className="bg-forest-100 text-forest-800 text-xs font-semibold px-2 py-0.5 rounded-full">
              2 nouvelles
            </span>
          </div>
        </div>

        {/* Body List */}
        <div className="max-h-[380px] overflow-y-auto divide-y divide-cream-100">
          {dummyNotifications.map((notif) => (
            <div
              key={notif.id}
              className={`p-4 flex gap-3.5 items-start transition-all cursor-pointer relative ${
                !notif.isRead
                  ? "bg-forest-50/60 hover:bg-forest-50 animate-pulse"
                  : "bg-white hover:bg-cream-50/50"
              }`}
            >
              {/* Status Indicator */}
              <div className="mt-1 shrink-0 relative flex items-center justify-center">
                {!notif.isRead ? (
                  <>
                    <span className="absolute inline-flex h-3 w-3 rounded-full bg-forest-500 opacity-75 animate-ping" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-forest-700" />
                  </>
                ) : (
                  <span className="h-2 w-2 rounded-full bg-cream-300 block" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p
                  className={`text-xs sm:text-sm leading-relaxed ${
                    !notif.isRead
                      ? "font-semibold text-forest-900"
                      : "text-gray-600"
                  }`}
                >
                  {notif.message}
                </p>

                <span
                  className={`text-[11px] font-medium mt-1.5 block ${
                    !notif.isRead
                      ? "text-amber-600 font-semibold"
                      : "text-forest-500"
                  }`}
                >
                  {notif.createdAt}
                </span>
              </div>

              {/* Left accent bar */}
              {!notif.isRead && (
                <span className="absolute left-0 top-0 bottom-0 w-1 bg-forest-700 rounded-r-md" />
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-2.5 bg-cream-50 border-t border-forest-100 text-center">
          <button className="text-xs font-semibold text-forest-700 hover:text-forest-900 transition-colors cursor-pointer">
            Tout marquer comme lu
          </button>
        </div>
      </div>
    </>
  );
};

export default NotificationPopup;

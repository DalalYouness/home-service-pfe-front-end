import React from "react";
import type { NotificationResponse } from "../types/notification";

interface NotificationPopupProps {
  notifications?: NotificationResponse[];
  unreadCount?: number;
  loading?: boolean;
  onNotificationClick?: (notificationId: number) => void;
}

export const NotificationPopup: React.FC<NotificationPopupProps> = ({
  notifications = [],
  unreadCount = 0,
  loading = false,
  onNotificationClick,
}) => {
  return (
    <>
      <style>{`
        @keyframes envelopeOpen {
          0% {
            opacity: 0;
            transform: translateY(-10px) scale(0.95);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-envelope-direct {
          animation: envelopeOpen 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          transform-origin: top right;
        }
      `}</style>

      {/* Responsive Popup Container */}
      <div className="fixed inset-x-3 top-16 sm:inset-auto sm:absolute sm:right-0 sm:top-full sm:mt-3 sm:w-96 bg-white rounded-2xl shadow-card-hover border border-forest-100/70 z-50 overflow-hidden font-sans animate-envelope-direct">
        {/* Header */}
        <div className="p-3.5 sm:p-4 border-b border-forest-100 bg-cream-50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="font-serif font-bold text-forest-900 text-sm sm:text-base">
              Notifications
            </h3>
            <span className="bg-forest-800 text-cream-50 text-[11px] font-bold px-2 py-0.5 rounded-full">
              {unreadCount} nouvelle{unreadCount > 1 ? "s" : ""}
            </span>
          </div>
        </div>

        {/* Body List */}
        <div className="max-h-[60vh] sm:max-h-[380px] overflow-y-auto divide-y divide-forest-100/60">
          {loading ? (
            <div className="p-8 text-center text-xs text-forest-700/60 font-medium">
              Chargement des notifications...
            </div>
          ) : !notifications || notifications.length === 0 ? (
            <div className="p-8 text-center text-xs text-forest-700/60 font-medium">
              Aucune notification pour le moment.
            </div>
          ) : (
            notifications.map((notif) => (
              <div
                key={notif.id}
                onClick={() => {
                  if (!notif.isRead && onNotificationClick) {
                    onNotificationClick(notif.id);
                  }
                }}
                className={`p-3.5 sm:p-4 flex gap-3 items-start transition-all cursor-pointer relative ${
                  !notif.isRead
                    ? "bg-forest-100/70 hover:bg-forest-100/90"
                    : "bg-white hover:bg-stone-50"
                }`}
              >
                {/* Status Indicator */}
                <div className="mt-1 shrink-0 relative flex items-center justify-center">
                  {!notif.isRead ? (
                    <>
                      <span className="absolute inline-flex h-3 w-3 rounded-full bg-forest-600 opacity-75 animate-ping" />
                      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-forest-900" />
                    </>
                  ) : (
                    <span className="h-2 w-2 rounded-full bg-stone-300 block" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <p
                    className={`text-xs sm:text-sm leading-relaxed ${
                      !notif.isRead
                        ? "font-bold text-forest-950"
                        : "font-normal text-stone-600"
                    }`}
                  >
                    {notif.message}
                  </p>

                  <span
                    className={`text-[10px] sm:text-[11px] font-semibold mt-1 block ${
                      !notif.isRead ? "text-forest-900" : "text-stone-400"
                    }`}
                  >
                    {notif.createdAt
                      ? new Date(notif.createdAt).toLocaleDateString("fr-FR", {
                          hour: "2-digit",
                          minute: "2-digit",
                          day: "2-digit",
                          month: "short",
                        })
                      : ""}
                  </span>
                </div>

                {/* Left accent bar for Unread */}
                {!notif.isRead && (
                  <span className="absolute left-0 top-0 bottom-0 w-1.5 bg-forest-800 rounded-r-md" />
                )}
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-2.5 bg-cream-50 border-t border-forest-100 text-center">
          <button className="text-xs font-semibold text-forest-800 hover:text-forest-950 transition-colors cursor-pointer">
            Tout marquer comme lu
          </button>
        </div>
      </div>
    </>
  );
};

export default NotificationPopup;

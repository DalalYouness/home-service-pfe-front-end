import React, { useState } from "react";
import {
  Wrench,
  User,
  Calendar,
  Clock,
  XCircle,
  CheckCircle2,
  Loader2,
  X,
  Star,
} from "lucide-react";
import { type ReservationResponse, BookingStatus } from "../types/reservation";
import type { AppMode } from "../context/AuthContext";
import ReviewDrawerStatic from "./ReviewDrawerStatic";

interface ReservationCardItemProps {
  booking: ReservationResponse;
  mode?: AppMode;
  onCancel?: (id: number) => Promise<{ success: boolean; message?: string }>;
  onConfirm?: (id: number) => Promise<{ success: boolean; message?: string }>;
  onReject?: (id: number) => Promise<{ success: boolean; message?: string }>;
  onComplete?: (id: number) => Promise<{ success: boolean; message?: string }>;
}

export const ReservationCardItem: React.FC<ReservationCardItemProps> = ({
  booking,
  mode = "CLIENT",
  onCancel,
  onConfirm,
  onReject,
  onComplete,
}) => {
  const [loadingAction, setLoadingAction] = useState<string | null>(null);
  const [showCancelConfirm, setShowCancelConfirm] = useState<boolean>(false);
  const [isReviewOpen, setIsReviewOpen] = useState<boolean>(false);

  const isProvider = mode === "PRESTATAIRE";

  // Formatter la date et l'heure
  const formatDateTime = (dateString?: string) => {
    if (!dateString) return { date: "N/A", time: "--:--" };
    const dateObj = new Date(dateString);

    const formattedDate = new Intl.DateTimeFormat("fr-FR", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(dateObj);

    const formattedTime = new Intl.DateTimeFormat("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(dateObj);

    return { date: formattedDate, time: formattedTime };
  };

  const { date, time } = formatDateTime(booking.dateRdv);

  // Badge du statut
  const getStatusBadge = (status: BookingStatus) => {
    switch (status) {
      case BookingStatus.PENDING:
        return (
          <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-amber-50 text-amber-700 border border-amber-200">
            En attente
          </span>
        );
      case BookingStatus.CONFIRMED:
        return (
          <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
            Confirmée
          </span>
        );
      case BookingStatus.CANCELLED:
        return (
          <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-rose-50 text-rose-600 border border-rose-200">
            Annulée
          </span>
        );
      case BookingStatus.REJECTED:
        return (
          <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-rose-50 text-rose-600 border border-rose-200">
            Refusée
          </span>
        );
      case BookingStatus.COMPLETED:
        return (
          <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-blue-50 text-blue-700 border border-blue-200">
            Terminée
          </span>
        );
      default:
        return null;
    }
  };

  const handleAction = async (
    actionName: string,
    actionFn?: (id: number) => Promise<{ success: boolean; message?: string }>,
  ) => {
    if (!actionFn) return;
    try {
      setLoadingAction(actionName);
      await actionFn(booking.id);
      setShowCancelConfirm(false);
    } catch (err) {
      console.error(`Erreur ${actionName}:`, err);
    } finally {
      setLoadingAction(null);
    }
  };

  return (
    <>
      <div className="bg-white rounded-3xl p-5 border border-forest-100/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4 font-sans">
        {/* Header: N° Réservation + Status */}
        <div className="flex items-center justify-between border-b border-forest-50 pb-3">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-forest-900 text-white rounded-xl text-xs font-mono font-bold shadow-sm">
              N° {booking.id}
            </span>
            <span className="text-[11px] font-semibold text-forest-700/60 uppercase tracking-wider">
              Réservation
            </span>
          </div>
          {getStatusBadge(booking.status)}
        </div>

        {/* Details */}
        <div className="space-y-3 py-1">
          {/* Nom du Service */}
          <div className="flex items-start gap-3">
            <Wrench className="w-4 h-4 text-forest-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-[11px] font-medium text-forest-700/60 uppercase tracking-wider">
                Service
              </p>
              <p className="text-sm font-bold text-forest-900">
                {booking.serviceName || `Service #${booking.idService}`}
              </p>
            </div>
          </div>

          {/* Nom du Client ou Prestataire */}
          <div className="flex items-start gap-3">
            <User className="w-4 h-4 text-forest-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-[11px] font-medium text-forest-700/60 uppercase tracking-wider">
                {isProvider ? "Client" : "Prestataire"}
              </p>
              <p className="text-sm font-bold text-forest-900">
                {isProvider
                  ? booking.clientName || `Client #${booking.idClient}`
                  : booking.providerName ||
                    `Prestataire #${booking.idProvider}`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <div className="flex-1 bg-cream-50/80 border border-forest-100/60 rounded-xl px-3 py-2 flex items-center gap-2 text-xs font-semibold text-forest-800">
              <Calendar className="w-3.5 h-3.5 text-forest-600 shrink-0" />
              <span>{date}</span>
            </div>
            <div className="bg-cream-50/80 border border-forest-100/60 rounded-xl px-3 py-2 flex items-center gap-2 text-xs font-semibold text-forest-800">
              <Clock className="w-3.5 h-3.5 text-forest-600 shrink-0" />
              <span>{time}</span>
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="border-t border-forest-50 pt-3">
          {/* Section CLIENT */}
          {!isProvider && (
            <>
              {booking.status === BookingStatus.PENDING && (
                <>
                  {!showCancelConfirm ? (
                    <button
                      onClick={() => setShowCancelConfirm(true)}
                      className="w-full py-2.5 px-4 bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-600 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-98"
                    >
                      <XCircle className="w-4 h-4" />
                      <span>Annuler la réservation</span>
                    </button>
                  ) : (
                    <div className="flex items-center gap-2 animate-in fade-in duration-150">
                      <button
                        onClick={() => handleAction("cancel", onCancel)}
                        disabled={loadingAction === "cancel"}
                        className="flex-1 py-2 px-4 bg-rose-600 hover:bg-rose-700 text-white rounded-full text-xs font-bold transition-all cursor-pointer active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 shadow-sm"
                      >
                        {loadingAction === "cancel" ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          "Oui, annuler"
                        )}
                      </button>

                      <button
                        onClick={() => setShowCancelConfirm(false)}
                        disabled={loadingAction === "cancel"}
                        className="px-4 py-2 bg-white border border-rose-200 text-rose-700 hover:bg-rose-50 rounded-full text-xs font-bold transition-all cursor-pointer active:scale-95 disabled:opacity-50"
                      >
                        Non
                      </button>
                    </div>
                  )}
                </>
              )}

              {booking.status === BookingStatus.CANCELLED && (
                <p className="text-center text-xs font-semibold text-forest-700/50 py-1 italic">
                  Réservation annulée
                </p>
              )}

              {booking.status === BookingStatus.REJECTED && (
                <p className="text-center text-xs font-semibold text-rose-600/70 py-1 italic">
                  Réservation refusée
                </p>
              )}

              {booking.status === BookingStatus.CONFIRMED && (
                <p className="text-center text-xs font-semibold text-emerald-700 py-1">
                  Rendez-vous confirmé
                </p>
              )}

              {/* زر Donner un avis يظهر حصرياً للـ CLIENT عندما تكون الخدمة COMPLETED */}
              {booking.status === BookingStatus.COMPLETED && (
                <button
                  onClick={() => setIsReviewOpen(true)}
                  className="w-full py-2.5 px-4 bg-amber-50 hover:bg-amber-100 border border-amber-200/80 text-amber-800 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-98 shadow-sm"
                >
                  <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
                  <span>Donner un avis</span>
                </button>
              )}
            </>
          )}

          {/* Section PRESTATAIRE */}
          {isProvider && (
            <>
              {booking.status === BookingStatus.PENDING && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleAction("confirm", onConfirm)}
                    disabled={!!loadingAction}
                    className="flex-1 py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-98 disabled:opacity-50"
                  >
                    {loadingAction === "confirm" ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <CheckCircle2 className="w-4 h-4" />
                    )}
                    <span>Accepter</span>
                  </button>

                  <button
                    onClick={() => handleAction("reject", onReject)}
                    disabled={!!loadingAction}
                    className="py-2.5 px-3 bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 rounded-2xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-98 disabled:opacity-50"
                  >
                    {loadingAction === "reject" ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <X className="w-4 h-4" />
                    )}
                    <span>Refuser</span>
                  </button>
                </div>
              )}

              {booking.status === BookingStatus.CONFIRMED && (
                <button
                  onClick={() => handleAction("complete", onComplete)}
                  disabled={loadingAction === "complete"}
                  className="w-full py-2.5 px-4 bg-forest-800 hover:bg-forest-900 text-white rounded-2xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-98 disabled:opacity-50"
                >
                  {loadingAction === "complete" ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <CheckCircle2 className="w-4 h-4" />
                  )}
                  <span>Marquer comme terminée</span>
                </button>
              )}

              {booking.status === BookingStatus.CANCELLED && (
                <p className="text-center text-xs font-semibold text-forest-700/50 py-1 italic">
                  Annulée par le client
                </p>
              )}

              {booking.status === BookingStatus.COMPLETED && (
                <p className="text-center text-xs font-semibold text-blue-700 py-1">
                  Prestation effectuée
                </p>
              )}
            </>
          )}
        </div>
      </div>

      <ReviewDrawerStatic
        isOpen={isReviewOpen}
        onClose={() => setIsReviewOpen(false)}
        providerName={
          booking.providerName || `Prestataire #${booking.idProvider}`
        }
        serviceName={booking.serviceName || `Service #${booking.idService}`}
        idProvider={booking.idProvider}
        idService={booking.idService}
      />
    </>
  );
};

// import React, { useState } from "react";
// import {
//   Wrench,
//   User,
//   Calendar,
//   Clock,
//   XCircle,
//   CheckCircle2,
//   Loader2,
//   X,
// } from "lucide-react";
// import { type ReservationResponse, BookingStatus } from "../types/reservation";
// import type { AppMode } from "../context/AuthContext";

// interface ReservationCardItemProps {
//   booking: ReservationResponse;
//   mode?: AppMode;
//   onCancel?: (id: number) => Promise<{ success: boolean; message?: string }>;
//   onConfirm?: (id: number) => Promise<{ success: boolean; message?: string }>;
//   onReject?: (id: number) => Promise<{ success: boolean; message?: string }>;
//   onComplete?: (id: number) => Promise<{ success: boolean; message?: string }>;
// }

// export const ReservationCardItem: React.FC<ReservationCardItemProps> = ({
//   booking,
//   mode = "CLIENT",
//   onCancel,
//   onConfirm,
//   onReject,
//   onComplete,
// }) => {
//   const [loadingAction, setLoadingAction] = useState<string | null>(null);
//   const [showCancelConfirm, setShowCancelConfirm] = useState<boolean>(false);

//   const isProvider = mode === "PRESTATAIRE";

//   // Formatter la date et l'heure
//   const formatDateTime = (dateString?: string) => {
//     if (!dateString) return { date: "N/A", time: "--:--" };
//     const dateObj = new Date(dateString);

//     const formattedDate = new Intl.DateTimeFormat("fr-FR", {
//       day: "numeric",
//       month: "short",
//       year: "numeric",
//     }).format(dateObj);

//     const formattedTime = new Intl.DateTimeFormat("fr-FR", {
//       hour: "2-digit",
//       minute: "2-digit",
//     }).format(dateObj);

//     return { date: formattedDate, time: formattedTime };
//   };

//   const { date, time } = formatDateTime(booking.dateRdv);

//   // Badge du statut
//   const getStatusBadge = (status: BookingStatus) => {
//     switch (status) {
//       case BookingStatus.PENDING:
//         return (
//           <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-amber-50 text-amber-700 border border-amber-200">
//             En attente
//           </span>
//         );
//       case BookingStatus.CONFIRMED:
//         return (
//           <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
//             Confirmée
//           </span>
//         );
//       case BookingStatus.CANCELLED:
//         return (
//           <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-rose-50 text-rose-600 border border-rose-200">
//             Annulée
//           </span>
//         );
//       case BookingStatus.REJECTED:
//         return (
//           <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-rose-50 text-rose-600 border border-rose-200">
//             Refusée
//           </span>
//         );
//       case BookingStatus.COMPLETED:
//         return (
//           <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-blue-50 text-blue-700 border border-blue-200">
//             Terminée
//           </span>
//         );
//       default:
//         return null;
//     }
//   };

//   const handleAction = async (
//     actionName: string,
//     actionFn?: (id: number) => Promise<{ success: boolean; message?: string }>,
//   ) => {
//     if (!actionFn) return;
//     try {
//       setLoadingAction(actionName);
//       await actionFn(booking.id);
//       setShowCancelConfirm(false);
//     } catch (err) {
//       console.error(`Erreur ${actionName}:`, err);
//     } finally {
//       setLoadingAction(null);
//     }
//   };

//   return (
//     <div className="bg-white rounded-3xl p-5 border border-forest-100/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4 font-sans">
//       {/* Header: N° Réservation + Status */}
//       <div className="flex items-center justify-between border-b border-forest-50 pb-3">
//         <div className="flex items-center gap-2">
//           <span className="px-3 py-1 bg-forest-900 text-white rounded-xl text-xs font-mono font-bold shadow-sm">
//             N° {booking.id}
//           </span>
//           <span className="text-[11px] font-semibold text-forest-700/60 uppercase tracking-wider">
//             Réservation
//           </span>
//         </div>
//         {getStatusBadge(booking.status)}
//       </div>

//       {/* Details */}
//       <div className="space-y-3 py-1">
//         {/* Nom du Service */}
//         <div className="flex items-start gap-3">
//           <Wrench className="w-4 h-4 text-forest-600 shrink-0 mt-0.5" />
//           <div>
//             <p className="text-[11px] font-medium text-forest-700/60 uppercase tracking-wider">
//               Service
//             </p>
//             <p className="text-sm font-bold text-forest-900">
//               {booking.serviceName || `Service #${booking.idService}`}
//             </p>
//           </div>
//         </div>

//         {/* Nom du Client ou Prestataire */}
//         <div className="flex items-start gap-3">
//           <User className="w-4 h-4 text-forest-600 shrink-0 mt-0.5" />
//           <div>
//             <p className="text-[11px] font-medium text-forest-700/60 uppercase tracking-wider">
//               {isProvider ? "Client" : "Prestataire"}
//             </p>
//             <p className="text-sm font-bold text-forest-900">
//               {isProvider
//                 ? booking.clientName || `Client #${booking.idClient}`
//                 : booking.providerName || `Prestataire #${booking.idProvider}`}
//             </p>
//           </div>
//         </div>

//         <div className="flex items-center gap-2 pt-1">
//           <div className="flex-1 bg-cream-50/80 border border-forest-100/60 rounded-xl px-3 py-2 flex items-center gap-2 text-xs font-semibold text-forest-800">
//             <Calendar className="w-3.5 h-3.5 text-forest-600 shrink-0" />
//             <span>{date}</span>
//           </div>
//           <div className="bg-cream-50/80 border border-forest-100/60 rounded-xl px-3 py-2 flex items-center gap-2 text-xs font-semibold text-forest-800">
//             <Clock className="w-3.5 h-3.5 text-forest-600 shrink-0" />
//             <span>{time}</span>
//           </div>
//         </div>
//       </div>

//       {/* Bottom Actions */}
//       <div className="border-t border-forest-50 pt-3">
//         {!isProvider && (
//           <>
//             {booking.status === BookingStatus.PENDING && (
//               <>
//                 {!showCancelConfirm ? (
//                   <button
//                     onClick={() => setShowCancelConfirm(true)}
//                     className="w-full py-2.5 px-4 bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-600 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-98"
//                   >
//                     <XCircle className="w-4 h-4" />
//                     <span>Annuler la réservation</span>
//                   </button>
//                 ) : (
//                   <div className="flex items-center gap-2 animate-in fade-in duration-150">
//                     <button
//                       onClick={() => handleAction("cancel", onCancel)}
//                       disabled={loadingAction === "cancel"}
//                       className="flex-1 py-2 px-4 bg-rose-600 hover:bg-rose-700 text-white rounded-full text-xs font-bold transition-all cursor-pointer active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 shadow-sm"
//                     >
//                       {loadingAction === "cancel" ? (
//                         <Loader2 className="w-3.5 h-3.5 animate-spin" />
//                       ) : (
//                         "Oui, annuler"
//                       )}
//                     </button>

//                     <button
//                       onClick={() => setShowCancelConfirm(false)}
//                       disabled={loadingAction === "cancel"}
//                       className="px-4 py-2 bg-white border border-rose-200 text-rose-700 hover:bg-rose-50 rounded-full text-xs font-bold transition-all cursor-pointer active:scale-95 disabled:opacity-50"
//                     >
//                       Non
//                     </button>
//                   </div>
//                 )}
//               </>
//             )}

//             {booking.status === BookingStatus.CANCELLED && (
//               <p className="text-center text-xs font-semibold text-forest-700/50 py-1 italic">
//                 Réservation annulée
//               </p>
//             )}

//             {booking.status === BookingStatus.REJECTED && (
//               <p className="text-center text-xs font-semibold text-rose-600/70 py-1 italic">
//                 Réservation refusée
//               </p>
//             )}

//             {booking.status === BookingStatus.CONFIRMED && (
//               <p className="text-center text-xs font-semibold text-emerald-700 py-1">
//                 Rendez-vous confirmé
//               </p>
//             )}
//           </>
//         )}

//         {isProvider && (
//           <>
//             {booking.status === BookingStatus.PENDING && (
//               <div className="flex items-center gap-2">
//                 <button
//                   onClick={() => handleAction("confirm", onConfirm)}
//                   disabled={!!loadingAction}
//                   className="flex-1 py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-98 disabled:opacity-50"
//                 >
//                   {loadingAction === "confirm" ? (
//                     <Loader2 className="w-4 h-4 animate-spin" />
//                   ) : (
//                     <CheckCircle2 className="w-4 h-4" />
//                   )}
//                   <span>Accepter</span>
//                 </button>

//                 <button
//                   onClick={() => handleAction("reject", onReject)}
//                   disabled={!!loadingAction}
//                   className="py-2.5 px-3 bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 rounded-2xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-98 disabled:opacity-50"
//                 >
//                   {loadingAction === "reject" ? (
//                     <Loader2 className="w-4 h-4 animate-spin" />
//                   ) : (
//                     <X className="w-4 h-4" />
//                   )}
//                   <span>Refuser</span>
//                 </button>
//               </div>
//             )}

//             {booking.status === BookingStatus.CONFIRMED && (
//               <button
//                 onClick={() => handleAction("complete", onComplete)}
//                 disabled={loadingAction === "complete"}
//                 className="w-full py-2.5 px-4 bg-forest-800 hover:bg-forest-900 text-white rounded-2xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-98 disabled:opacity-50"
//               >
//                 {loadingAction === "complete" ? (
//                   <Loader2 className="w-4 h-4 animate-spin" />
//                 ) : (
//                   <CheckCircle2 className="w-4 h-4" />
//                 )}
//                 <span>Marquer comme terminée</span>
//               </button>
//             )}

//             {booking.status === BookingStatus.CANCELLED && (
//               <p className="text-center text-xs font-semibold text-forest-700/50 py-1 italic">
//                 Annulée par le client
//               </p>
//             )}

//             {booking.status === BookingStatus.COMPLETED && (
//               <p className="text-center text-xs font-semibold text-blue-700 py-1">
//                 Prestation effectuée
//               </p>
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

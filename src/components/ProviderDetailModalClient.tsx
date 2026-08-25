import { useState } from "react";
import {
  X,
  MapPin,
  Phone,
  CheckCircle,
  Clock,
  Star,
  CalendarCheck,
  Loader2,
  Calendar,
} from "lucide-react";
import AnonymeProfile from "./AnonymeProfile";
import { usePrestatairePrivateDetails } from "../hooks/usePrestatairePrivateDetails";
import { useCreateReservation } from "../hooks/useCreateReservation";
import { useAuth } from "../context/AuthContext";
import type { ReservationResponse } from "../types/reservation";
import { toast } from "sonner";

interface ProviderDetailModalClientProps {
  providerId: number;
  serviceId: number | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccessBooking?: (reservation: ReservationResponse) => void;
}

export const ProviderDetailModalClient = ({
  providerId,
  serviceId,
  isOpen,
  onClose,
  onSuccessBooking,
}: ProviderDetailModalClientProps) => {
  const { provider, isLoading: isProviderLoading } =
    usePrestatairePrivateDetails(providerId, isOpen);

  const { user } = useAuth();
  const idClient = user?.id;

  const { handleCreateReservation, isLoading: isBookingLoading } =
    useCreateReservation();

  const [dateRdv, setDateRdv] = useState<string>("");

  if (!isOpen) return null;

  const handleClose = () => {
    setDateRdv("");
    onClose();
  };

  const handleSubmitBooking = async () => {
    // 1. Validation فـ Frontend قبل ما نصيفطو الـ Request
    if (!dateRdv) {
      toast.error(
        "Veuillez sélectionner une date et une heure pour le rendez-vous",
      );
      return;
    }

    if (!idClient) {
      toast.error("Veuillez vous connecter pour effectuer une réservation");
      return;
    }

    if (!serviceId) {
      toast.error("Service non spécifié");
      return;
    }

    // 2. Formatting au LocalDateTime (بحال "2026-08-28T15:32:00")
    const formattedDateRdv = dateRdv.length === 16 ? `${dateRdv}:00` : dateRdv;

    try {
      await handleCreateReservation(
        {
          idClient: idClient,
          idProvider: providerId,
          idService: serviceId,
          dateRdv: formattedDateRdv,
        },
        (responseData) => {
          toast.success(
            "Demande envoyée avec succès ! En attente de l'acceptation du prestataire.",
          );

          if (onSuccessBooking) {
            onSuccessBooking(responseData);
          }
          handleClose();
        },
      );
    } catch (err: any) {
      const msg =
        err?.response?.data?.message || "Erreur lors de la réservation";
      toast.error(msg);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-slate-100 dark:border-slate-800 flex flex-col max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Loading State */}
        {isProviderLoading && (
          <div className="flex flex-col items-center justify-center p-12 min-h-[300px] gap-3">
            <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
            <p className="text-xs font-semibold text-slate-400">
              Chargement du profil...
            </p>
          </div>
        )}

        {/* Content State */}
        {!isProviderLoading && provider && (
          <div className="overflow-y-auto p-6 space-y-6">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
              <div className="relative aspect-square w-28 h-28 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0 border-2 border-slate-200 dark:border-slate-700">
                {provider.imgUrl ? (
                  <img
                    src={provider.imgUrl}
                    alt={`${provider.firstName} ${provider.lastName}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <AnonymeProfile />
                )}
              </div>

              <div className="flex flex-col text-center sm:text-left gap-1 mt-1">
                <div className="flex flex-col sm:flex-row sm:items-center gap-1.5">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    {provider.firstName} {provider.lastName}
                  </h2>

                  <div className="inline-flex items-center justify-center p-1 rounded-md bg-amber-50 dark:bg-amber-950/40 border border-amber-200/60 dark:border-amber-800/40 w-fit mx-auto sm:mx-0">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 shrink-0" />
                  </div>
                </div>

                <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs font-medium mt-1">
                  {provider.isAvailable ? (
                    <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                      <CheckCircle className="w-3.5 h-3.5" /> Disponible
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50 px-2.5 py-0.5 rounded-full border border-amber-200 dark:border-amber-800">
                      <Clock className="w-3.5 h-3.5" /> Indisponible
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-center sm:justify-start gap-1 text-slate-500 dark:text-slate-400 text-xs mt-1">
                  <MapPin className="w-3.5 h-3.5 shrink-0" />
                  <span>
                    {provider.city}, {provider.country}
                  </span>
                </div>
              </div>
            </div>

            {/* Bio Section */}
            <div className="space-y-1.5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                À propos
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed bg-slate-50 dark:bg-slate-800/50 p-3 rounded-2xl border border-slate-100 dark:border-slate-800">
                {provider.bio || "Aucune biographie disponible pour le moment."}
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Coordonnées de contact
              </h3>

              <div className="grid grid-cols-1 gap-2.5">
                <div className="flex flex-col gap-2 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-xl">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] text-slate-400 font-medium uppercase">
                        Téléphone
                      </span>
                      <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
                        {provider.phoneNumber}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-800">
                  <div className="p-2.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-xl">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-400 font-medium uppercase">
                      Adresse exacte
                    </span>
                    <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                      {provider.address}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Date & Time Picker Section */}
            <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-blue-600" />
                <span>Date et heure du rendez-vous</span>
              </label>
              <input
                type="datetime-local"
                value={dateRdv}
                onChange={(e) => setDateRdv(e.target.value)}
                className="w-full p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Action Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleSubmitBooking}
                disabled={isBookingLoading || !dateRdv || !provider.isAvailable}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-2xl shadow-lg shadow-blue-500/20 active:scale-[0.99] transition-all"
              >
                {isBookingLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <CalendarCheck className="w-5 h-5" />
                    <span>Réserver ce service</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProviderDetailModalClient;

import { Briefcase, Send, MapPin, Target } from "lucide-react";
import { usePrestatairePublicDetails } from "../hooks/usePrestatairePublicDetails";

interface PrestatairePublicInfoCardProps {
  providerId: number;
  onRequestService?: (providerId: number) => void;
}

export default function PrestatairePublicInfoCard({
  providerId,
  onRequestService,
}: PrestatairePublicInfoCardProps) {
  const { publicProviderDetail, isLoading } =
    usePrestatairePublicDetails(providerId);

  // Skeleton Loading State
  if (isLoading) {
    return (
      <div className="w-full max-w-xl mx-auto bg-white dark:bg-slate-900 rounded-2xl p-6 border border-gray-100 dark:border-slate-800 shadow-sm animate-pulse flex flex-col items-center">
        <div className="w-24 h-24 rounded-2xl bg-slate-200 dark:bg-slate-800 shrink-0 mb-4" />
        <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded-lg w-40 mb-2" />
        <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded-md w-32" />
      </div>
    );
  }

  if (!publicProviderDetail) {
    return null;
  }

  const {
    firstName,
    lastName,
    city,
    country,
    bio,
    interventionArea,
    imgUrl,
    gender,
  } = publicProviderDetail;

  const normalizedGender = gender?.toString().trim().toLowerCase();
  const isFemale =
    normalizedGender === "femme" ||
    normalizedGender === "female" ||
    normalizedGender === "f";

  // 2. Thème الألوان
  const theme = {
    bannerBg: isFemale ? "bg-rose-700" : "bg-emerald-800",
    badgeBg: isFemale ? "bg-rose-500" : "bg-emerald-500",
    zoneBg: isFemale
      ? "bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-400 border-rose-200/60 dark:border-rose-800/40"
      : "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border-emerald-200/60 dark:border-emerald-800/40",
    zoneIcon: isFemale ? "text-rose-600 shrink-0" : "text-emerald-600 shrink-0",
    btnBg: isFemale
      ? "bg-rose-700 hover:bg-rose-800"
      : "bg-emerald-800 hover:bg-emerald-900",
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-xl overflow-hidden transition-all duration-300">
      {/* Dynamic Banner */}
      <div
        className={`h-28 ${theme.bannerBg} relative transition-colors duration-300`}
      />

      {/* Content Area */}
      <div className="px-6 pb-6 pt-0 relative flex flex-col items-center text-center">
        {/* Profile Image */}
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl border-4 border-white dark:border-slate-900 shadow-lg overflow-hidden bg-slate-200 dark:bg-slate-700 shrink-0 flex items-center justify-center -mt-12 sm:-mt-14 mb-3">
          {imgUrl ? (
            <img
              src={imgUrl}
              alt={`${firstName} ${lastName}`}
              className="w-full h-full object-cover"
            />
          ) : (
            <svg
              className="w-16 h-16 sm:w-20 sm:h-20 text-slate-400 dark:text-slate-500"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          )}
        </div>

        {/* Name & Badges */}
        <div className="space-y-2 w-full">
          <div className="flex items-center justify-center gap-1.5">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white capitalize tracking-tight">
              {firstName} {lastName}
            </h1>
            <span
              className={`inline-flex items-center justify-center w-5 h-5 ${theme.badgeBg} text-white rounded-full text-[10px] font-bold shadow-sm`}
              title="Prestataire vérifié"
            >
              ✓
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-1.5 text-xs font-medium">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700">
              <MapPin size={13} className="text-slate-500 shrink-0" />
              {city}
              {country ? `, ${country}` : ""}
            </span>
            {interventionArea && (
              <span
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full border ${theme.zoneBg}`}
              >
                <Target size={13} className={theme.zoneIcon} />
                Zone d'intervention : {interventionArea}
              </span>
            )}
          </div>
        </div>

        {/* Section 1: À PROPOS */}
        {bio && (
          <div className="w-full mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 text-left">
            <h3 className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1.5">
              À PROPOS
            </h3>
            <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed whitespace-pre-line">
              {bio}
            </p>
          </div>
        )}

        {/* Section 2: PORTFOLIO */}
        <div className="w-full mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 text-left">
          <h3 className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
            PORTFOLIO
          </h3>

          <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-dashed border-slate-200 dark:border-slate-700 text-center">
            <div className="p-2 bg-white dark:bg-slate-800 rounded-full shadow-sm mb-1 text-slate-400">
              <Briefcase size={18} />
            </div>
            <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Aucun projet publié pour le moment
            </p>
            <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">
              Le prestataire n'a pas encore ajouté de réalisations à son
              portfolio.
            </p>
          </div>
        </div>

        {/* Section 3: ACTION BUTTON */}
        <div className="w-full mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
          <button
            onClick={() => onRequestService && onRequestService(providerId)}
            className={`w-full py-2.5 px-4 rounded-xl ${theme.btnBg} text-white font-medium text-xs sm:text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-sm active:scale-[0.99] cursor-pointer`}
          >
            <Send size={14} />
            Demander un service
          </button>
        </div>
      </div>
    </div>
  );
}

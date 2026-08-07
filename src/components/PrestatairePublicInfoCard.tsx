import { usePrestatairePublicDetails } from "../hooks/usePrestatairePublicDetails";

interface PrestatairePublicHeaderProps {
  providerId: number;
}

export default function PrestatairePublicHeader({
  providerId,
}: PrestatairePublicHeaderProps) {
  const { publicProviderDetail, isLoading } =
    usePrestatairePublicDetails(providerId);

  // 1. Skeleton Loading State
  // si apres ya un composant qui utilise le meme skeleton on peut le factoriser dans un composant séparé
  if (isLoading) {
    return (
      <div className="w-full max-w-4xl mx-auto bg-white dark:bg-slate-900 rounded-3xl p-6 border border-gray-100 dark:border-slate-800 shadow-sm animate-pulse">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-slate-200 dark:bg-slate-800 shrink-0" />
          <div className="flex-1 space-y-3 text-center sm:text-left w-full">
            <div className="h-7 bg-slate-200 dark:bg-slate-800 rounded-lg w-48 mx-auto sm:mx-0" />
            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-md w-32 mx-auto sm:mx-0" />
            <div className="h-16 bg-slate-200 dark:bg-slate-800 rounded-xl w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!publicProviderDetail) {
    return null;
  }

  // destructuring the provider details for easier access
  const { firstName, lastName, city, country, bio, interventionArea, imgUrl } =
    publicProviderDetail;

  return (
    <div className="w-full max-w-4xl mx-auto bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800/80 shadow-md overflow-hidden transition-all duration-300">
      {/* Upper Cover Decorative Banner */}
      <div className="h-28 sm:h-36 bg-gradient-to-r from-emerald-600 via-teal-600 to-slate-900 relative">
        <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px]" />
      </div>

      {/* Main Profile Info Section */}
      <div className="px-6 pb-6 pt-0 relative">
        <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 -mt-16 sm:-mt-20 mb-4">
          {/* Profile Image */}
          <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-white dark:border-slate-900 shadow-lg overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0 group">
            {imgUrl ? (
              <img
                src={imgUrl}
                alt={`${firstName} ${lastName}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              /* Anonymous Avatar Placeholder  */
              <div className="w-full h-full flex items-end justify-center bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500">
                <svg
                  className="w-24 h-24 sm:w-32 sm:h-32 -mb-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>
            )}
          </div>

          {/* User Names & Location */}
          <div className="flex-1 text-center sm:text-left space-y-1">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white capitalize tracking-tight">
                {firstName} {lastName}
              </h1>
              <span
                className="inline-flex items-center justify-center w-6 h-6 bg-emerald-500 text-white rounded-full text-xs font-bold shadow-sm"
                title="Prestataire"
              >
                ✓
              </span>
            </div>

            {/* Location & Intervention Badges */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1 text-xs sm:text-sm font-medium">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/50">
                📍 {city}
                {country ? `, ${country}` : ""}
              </span>
              {interventionArea && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/40">
                  🎯 Zone: {interventionArea}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Bio Section */}
        {bio && (
          <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800/80">
            <h3 className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1 text-center sm:text-left">
              À propos
            </h3>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed text-center sm:text-left whitespace-pre-line">
              {bio}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

import {
  ThumbsUp,
  ThumbsDown,
  Users,
  TrendingUp,
  Award,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { useProviderDashboardSatisfaction } from "../hooks/useProviderDashboardSatisfaction";

interface PrestataireDashboardProps {
  providerId: number | string;
}

export const PrestataireDashboard = ({
  providerId,
}: PrestataireDashboardProps) => {
  const { data, loading, error } = useProviderDashboardSatisfaction(providerId);

  if (loading) {
    return (
      <div className="p-8 max-w-7xl mx-auto flex flex-col items-center justify-center min-h-[300px] gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-forest-700" />
        <p className="text-sm font-medium text-forest-800">
          Chargement des données de satisfaction...
        </p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="p-8 max-w-7xl mx-auto">
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-100 flex items-center gap-3 text-rose-800 text-sm">
          <AlertCircle className="w-5 h-5 shrink-0 text-rose-600" />
          <span>
            {error || "Une erreur est survenue lors du chargement des données."}
          </span>
        </div>
      </div>
    );
  }

  const pos = data.positiveVotesCount || 0;
  const neg = data.negativeVotesCount || 0;

  const total = data.totalVotes ?? pos + neg;

  const taux = data.tauxRecommendation
    ? Math.round(data.tauxRecommendation)
    : 0;

  const satisfactionPercentage =
    total > 0 ? Math.round((pos / total) * 100) : 0;

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-7xl mx-auto font-sans">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-forest-100">
        <div className="space-y-1">
          <h1 className="text-xl md:text-2xl font-bold text-forest-800 tracking-tight">
            Tableau de Bord de Satisfaction
          </h1>
          <p className="text-xs md:text-sm text-forest-700/70">
            Suivez l'avis de vos clients et analysez votre taux de
            recommandation.
          </p>
        </div>
      </div>

      {/* KPI STATS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {/* Card 1: Total Avis */}
        <div className="bg-white p-6 rounded-2xl border border-cream-200 shadow-card hover:shadow-card-hover transition-all duration-300 flex items-center gap-4">
          <div className="p-3.5 bg-forest-50 text-forest-800 rounded-xl">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Total des Avis
            </p>
            <h3 className="text-2xl font-bold text-forest-900 mt-0.5">
              {total}
            </h3>
          </div>
        </div>

        {/* Card 2: Taux de Recommandation */}
        <div className="bg-white p-6 rounded-2xl border border-cream-200 shadow-card hover:shadow-card-hover transition-all duration-300 flex items-center gap-4">
          <div className="p-3.5 bg-emerald-50 text-emerald-700 rounded-xl">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Recommandation
            </p>
            <h3 className="text-2xl font-bold text-emerald-800 mt-0.5">
              {taux}%
            </h3>
          </div>
        </div>

        {/* Card 3: Avis Positifs */}
        <div className="bg-white p-6 rounded-2xl border border-cream-200 shadow-card hover:shadow-card-hover transition-all duration-300 flex items-center gap-4">
          <div className="p-3.5 bg-forest-100 text-forest-900 rounded-xl">
            <ThumbsUp className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Avis Positifs
            </p>
            <h3 className="text-2xl font-bold text-forest-900 mt-0.5">{pos}</h3>
          </div>
        </div>

        {/* Card 4: Avis Négatifs */}
        <div className="bg-white p-6 rounded-2xl border border-cream-200 shadow-card hover:shadow-card-hover transition-all duration-300 flex items-center gap-4">
          <div className="p-3.5 bg-rose-50 text-rose-600 rounded-xl">
            <ThumbsDown className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Avis Négatifs
            </p>
            <h3 className="text-2xl font-bold text-rose-900 mt-0.5">{neg}</h3>
          </div>
        </div>
      </div>

      {/* DETAILED SATISFACTION BREAKDOWN */}
      <div className="bg-white p-6 md:p-8 rounded-2xl border border-cream-200 shadow-card space-y-6">
        <div className="flex items-center justify-between border-b border-cream-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-cream-100 text-amber-600 rounded-xl">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-forest-900">
                Aperçu de la Satisfaction Client
              </h2>
              <p className="text-xs text-gray-500">
                Répartition détaillée des retours d'expérience
              </p>
            </div>
          </div>
        </div>

        {/* Visual Progress Bar */}
        <div className="space-y-3">
          <div className="flex justify-between items-center text-sm font-medium">
            <span className="text-forest-800 flex items-center gap-1.5">
              <ThumbsUp className="w-4 h-4 text-emerald-600" />
              Avis Positifs ({pos})
            </span>
            <span className="text-rose-700 flex items-center gap-1.5">
              Avis Négatifs ({neg})
              <ThumbsDown className="w-4 h-4 text-rose-600" />
            </span>
          </div>

          <div className="w-full h-4 bg-rose-100 rounded-full overflow-hidden flex">
            <div
              className="h-full bg-forest-700 transition-all duration-500 rounded-l-full"
              style={{
                width: `${satisfactionPercentage}%`, // الاعتماد على المتغير المحسوب بآمان
              }}
            />
          </div>

          <div className="flex justify-between text-xs text-gray-400 font-medium pt-1">
            <span>{satisfactionPercentage}% de satisfaction</span>
            <span>
              Total: {total} {total > 1 ? "votes" : "vote"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

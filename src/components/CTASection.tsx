import { Sparkles, ArrowRight, UserPlus, Briefcase } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CTASection() {
  const navigate = useNavigate();

  return (
    <section className="w-full bg-forest-900 py-20 md:py-24 relative overflow-hidden text-cream-50">
      {/* Subtle Design Accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-forest-800/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Top Badge */}
        <span className="inline-flex items-center gap-2 font-sans text-xs font-semibold tracking-widest text-amber-500 uppercase bg-forest-800/80 border border-forest-700 px-4 py-2 rounded-full mb-6 shadow-xs">
          <Sparkles size={14} className="text-amber-500" />
          <span>REJOIGNEZ DALYOO AUJOURD'HUI</span>
        </span>

        {/* Main Headline */}
        <h2 className="font-serif font-bold text-3xl sm:text-4xl md:text-5xl text-cream-50 mb-6 leading-tight">
          Prêt à simplifier vos services à domicile ?
        </h2>

        {/* Subtitle */}
        <p className="font-sans text-sm sm:text-base md:text-lg text-forest-100/80 max-w-2xl mx-auto mb-10 leading-relaxed">
          Que vous cherchiez un professionnel de confiance ou que vous
          souhaitiez proposer vos services, commencez dès maintenant en quelques
          clics.
        </p>

        {/* Action Buttons (Dual CTA for Client & Prestataire) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
          {/* Client CTA */}
          <button
            type="button"
            onClick={() => navigate("/register?role=client")}
            className="w-full sm:w-auto flex-1 py-4 px-6 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer font-sans shadow-card hover:shadow-card-hover hover:-translate-y-0.5"
          >
            <UserPlus size={18} />
            <span>Créer un compte Client</span>
            <ArrowRight size={16} />
          </button>

          {/* Prestataire CTA */}
          <button
            type="button"
            onClick={() => navigate("/register?role=prestataire")}
            className="w-full sm:w-auto flex-1 py-4 px-6 rounded-2xl bg-forest-800 hover:bg-forest-700 border border-forest-700 text-cream-50 font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer font-sans shadow-card hover:shadow-card-hover hover:-translate-y-0.5"
          >
            <Briefcase size={18} className="text-amber-500" />
            <span>Devenir Prestataire</span>
          </button>
        </div>
      </div>
    </section>
  );
}

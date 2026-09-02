import {
  Search,
  UserPlus,
  CalendarCheck2,
  BellRing,
  ArrowRight,
  CheckCircle2,
  Bell,
  Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function HowItWorks() {
  const navigate = useNavigate();

  return (
    <section className="w-full bg-cream-50 py-20 md:py-28 border-y border-stone-200/60 relative overflow-hidden">
      {/* Background Micro-Gradients for Atmosphere */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-forest-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-amber-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 md:mb-20">
          <span className="font-sans text-xs sm:text-sm font-semibold tracking-widest text-forest-500 uppercase bg-forest-50 border border-forest-100 px-3.5 py-1.5 rounded-full">
            PARCOURS SIMPLE & FLUIDE
          </span>
          <h2 className="font-serif font-bold text-3xl sm:text-4xl md:text-5xl text-forest-900 mt-4 mb-4 leading-tight">
            Comment ça marche ?
          </h2>
          <p className="font-sans text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Quatre étapes simples pour réserver et suivre vos services à
            domicile en toute tranquillité.
          </p>
        </div>

        {/* 4 Cards Grid - Larger & Interactive */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
          {/* Étape 1 */}
          <div className="group flex flex-col justify-between p-8 min-h-[340px] rounded-3xl bg-white border border-stone-200/90 shadow-sm hover:shadow-2xl hover:border-forest-300 hover:-translate-y-2 transition-all duration-300 relative">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-forest-50 text-forest-900 flex items-center justify-center group-hover:bg-forest-900 group-hover:text-amber-200 transition-colors duration-300 shadow-sm">
                  <Search size={24} />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-forest-800 bg-forest-50 px-3 py-1.5 rounded-full border border-forest-100 font-sans">
                  Étape 1
                </span>
              </div>

              <h3 className="font-serif text-xl font-bold text-forest-900 mb-3">
                Découvrez nos services
              </h3>
              <p className="font-sans text-stone-600 text-sm leading-relaxed mb-6">
                Parcourez nos catégories et consultez les profils vérifiés des
                prestataires disponibles.
              </p>
            </div>

            <a
              href="#services"
              className="w-full py-3 px-4 rounded-xl bg-stone-100/90 text-forest-900 hover:bg-forest-900 hover:text-white font-semibold text-xs transition-all duration-200 flex items-center justify-center gap-2 font-sans shadow-xs"
            >
              <span>Voir services</span>
              <ArrowRight size={15} />
            </a>
          </div>

          {/* Étape 2 (High-Focus CTA Card) */}
          <div className="group flex flex-col justify-between p-8 min-h-[340px] rounded-3xl bg-white border-2 border-forest-900/20 shadow-md hover:shadow-2xl hover:border-forest-900 hover:-translate-y-2 transition-all duration-300 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-100/60 rounded-bl-full -z-0 opacity-60 pointer-events-none group-hover:scale-110 transition-transform duration-300" />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-forest-900 text-amber-200 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
                  <UserPlus size={24} />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-forest-900 bg-amber-100 px-3 py-1.5 rounded-full font-sans border border-amber-300 shadow-xs">
                  Étape 2
                </span>
              </div>

              <h3 className="font-serif text-xl font-bold text-forest-900 mb-3">
                Devenez Client
              </h3>
              <p className="font-sans text-stone-600 text-sm leading-relaxed mb-6">
                Inscrivez-vous gratuitement en quelques secondes pour débloquer
                l'accès aux réservations.
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate("/register?role=client")}
              className="relative z-10 w-full py-3 px-4 rounded-xl bg-forest-900 text-white hover:bg-forest-800 font-semibold text-xs transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer font-sans shadow-lg group-hover:shadow-amber-200/50"
            >
              <Sparkles size={14} className="text-amber-300" />
              <span>S'inscrire Client</span>
              <ArrowRight size={15} />
            </button>
          </div>

          {/* Étape 3 */}
          <div className="group flex flex-col justify-between p-8 min-h-[340px] rounded-3xl bg-white border border-stone-200/90 shadow-sm hover:shadow-2xl hover:border-forest-300 hover:-translate-y-2 transition-all duration-300 relative">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-forest-50 text-forest-900 flex items-center justify-center group-hover:bg-forest-900 group-hover:text-amber-200 transition-colors duration-300 shadow-sm">
                  <CalendarCheck2 size={24} />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-forest-800 bg-forest-50 px-3 py-1.5 rounded-full border border-forest-100 font-sans">
                  Étape 3
                </span>
              </div>

              <h3 className="font-serif text-xl font-bold text-forest-900 mb-3">
                Réservez un pro
              </h3>
              <p className="font-sans text-stone-600 text-sm leading-relaxed">
                Choisissez votre prestataire, sélectionnez la date et envoyez
                votre demande en toute sérénité.
              </p>
            </div>

            <div className="pt-6">
              <span className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-900 bg-emerald-50/90 border border-emerald-200/80 px-3.5 py-2.5 rounded-xl w-full justify-center font-sans shadow-xs">
                <CheckCircle2 size={15} className="text-emerald-600 shrink-0" />
                <span>Espace client sécurisé</span>
              </span>
            </div>
          </div>

          {/* Étape 4 */}
          <div className="group flex flex-col justify-between p-8 min-h-[340px] rounded-3xl bg-white border border-stone-200/90 shadow-sm hover:shadow-2xl hover:border-forest-300 hover:-translate-y-2 transition-all duration-300 relative">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-forest-50 text-forest-900 flex items-center justify-center group-hover:bg-forest-900 group-hover:text-amber-200 transition-colors duration-300 shadow-sm">
                  <BellRing size={24} />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-forest-800 bg-forest-50 px-3 py-1.5 rounded-full border border-forest-100 font-sans">
                  Étape 4
                </span>
              </div>

              <h3 className="font-serif text-xl font-bold text-forest-900 mb-3">
                Suivez en temps réel
              </h3>
              <p className="font-sans text-stone-600 text-sm leading-relaxed">
                Suivez l'état de votre réservation étape par étape grâce aux
                notifications instantanées.
              </p>
            </div>

            <div className="pt-6">
              <span className="inline-flex items-center gap-2 text-xs font-semibold text-amber-900 bg-amber-50/90 border border-amber-200/80 px-3.5 py-2.5 rounded-xl w-full justify-center font-sans shadow-xs">
                <Bell
                  size={15}
                  className="text-amber-600 shrink-0 group-hover:animate-bounce"
                />
                <span>Notifications en direct</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

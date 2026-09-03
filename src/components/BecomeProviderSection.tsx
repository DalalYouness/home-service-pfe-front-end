import {
  Briefcase,
  PhoneCall,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  XCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function BecomeProviderSection() {
  const navigate = useNavigate();

  return (
    <section className="w-full bg-cream-100/60 py-20 md:py-28 border-t border-stone-200/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Visual Showcase with Layered Floating Elements */}
          <div className="lg:col-span-6 order-2 lg:order-1 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Feature Box */}
              <div className="bg-cream-50 p-8 sm:p-10 rounded-3xl border border-cream-300/60 shadow-card">
                <div className="w-14 h-14 rounded-2xl bg-forest-50 border border-forest-100 flex items-center justify-center text-forest-700 mb-6">
                  <Briefcase size={28} />
                </div>

                <h3 className="font-serif font-bold text-2xl text-forest-900 mb-3">
                  Espace Prestataire
                </h3>

                <p className="font-sans text-sm text-stone-600 leading-relaxed mb-6">
                  Recevez des demandes de réservation, échangez directement avec
                  les clients par téléphone et travaillez selon vos propres
                  conditions.
                </p>

                {/* Micro Steps inside Visual Card */}
                <div className="space-y-4 pt-4 border-t border-cream-200/80">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-forest-700 text-cream-50 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      1
                    </div>
                    <div>
                      <p className="font-sans font-semibold text-xs text-forest-900">
                        Notification instantanée
                      </p>
                      <p className="font-sans text-[11px] text-stone-500">
                        Recevez les détails de la réservation dès qu'un client
                        réserve.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-forest-700 text-cream-50 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      2
                    </div>
                    <div>
                      <p className="font-sans font-semibold text-xs text-forest-900">
                        Contact direct & Négociation
                      </p>
                      <p className="font-sans text-[11px] text-stone-500">
                        Appelez le client pour fixer le prix et convenir des
                        détails.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Badge 1: Direct Call (Top Right) */}
              <div className="absolute -top-6 -right-2 sm:-right-6 bg-white p-4 rounded-2xl border border-cream-200 shadow-card-hover flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-forest-50 text-forest-700 flex items-center justify-center shrink-0">
                  <PhoneCall size={20} />
                </div>
                <div>
                  <p className="font-serif font-bold text-sm text-forest-900">
                    Contact Direct
                  </p>
                  <p className="font-sans text-[11px] text-stone-500">
                    Par téléphone avec le client
                  </p>
                </div>
              </div>

              {/* Floating Badge 2: Freedom to Accept/Refuse (Bottom Left) */}
              <div className="absolute -bottom-6 -left-2 sm:-left-6 bg-forest-900 text-cream-50 p-4 rounded-2xl shadow-card-hover flex items-center gap-3 border border-forest-800">
                <div className="flex gap-1 text-amber-500">
                  <CheckCircle2 size={18} className="text-emerald-400" />
                  <XCircle size={18} className="text-stone-400" />
                </div>
                <div>
                  <p className="font-sans font-semibold text-xs text-cream-50">
                    Liberté de Choix
                  </p>
                  <p className="font-sans text-[10px] text-forest-200">
                    Acceptez ou refusez selon votre temps
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Pitch & Call to Action */}
          <div className="lg:col-span-6 order-1 lg:order-2">
            <span className="font-sans text-xs font-semibold tracking-widest text-amber-500 uppercase bg-cream-50 border border-cream-300/80 px-3.5 py-1.5 rounded-full inline-block mb-4 shadow-xs">
              POUR LES PROFESSIONNELS
            </span>

            <h2 className="font-serif font-bold text-3xl sm:text-4xl md:text-5xl text-forest-900 leading-tight mb-6">
              Développez votre activité avec Dalyou
            </h2>

            <p className="font-sans text-base sm:text-lg text-stone-600 leading-relaxed mb-8">
              Vous proposez des services à domicile ? Recevez des demandes
              proches de chez vous, échangez directement avec les clients et
              gérez votre emploi du temps sans contrainte.
            </p>

            {/* Feature Bullets matched to your real business logic */}
            <div className="space-y-4 mb-10">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-forest-100 text-forest-700 flex items-center justify-center shrink-0 mt-1 font-bold text-xs">
                  ✓
                </div>
                <p className="font-sans text-sm text-stone-700">
                  <strong className="font-semibold text-forest-900">
                    Communication directe :
                  </strong>{" "}
                  Le client reçoit vos coordonnées pour convenir du tarif et du
                  rendez-vous par téléphone.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-forest-100 text-forest-700 flex items-center justify-center shrink-0 mt-1 font-bold text-xs">
                  ✓
                </div>
                <p className="font-sans text-sm text-stone-700">
                  <strong className="font-semibold text-forest-900">
                    Liberté d'acceptation :
                  </strong>{" "}
                  Vous avez le droit d'accepter ou de refuser une réservation si
                  le créneau ou l'accord ne vous convient pas.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-forest-100 text-forest-700 flex items-center justify-center shrink-0 mt-1 font-bold text-xs">
                  ✓
                </div>
                <p className="font-sans text-sm text-stone-700">
                  <strong className="font-semibold text-forest-900">
                    Notifications en direct :
                  </strong>{" "}
                  Restez informé instantanément dès qu'un client effectue une
                  demande.
                </p>
              </div>
            </div>

            {/* Primary Action Button */}
            <button
              type="button"
              onClick={() => navigate("/register?role=prestataire")}
              className="w-full sm:w-auto py-4 px-8 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2.5 cursor-pointer font-sans shadow-card hover:shadow-card-hover hover:-translate-y-0.5"
            >
              <Sparkles size={16} />
              <span>Devenir Prestataire</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

import { PenLine, Users, CalendarCheck } from "lucide-react";

const STEPS = [
  {
    icon: PenLine,
    number: "01",
    title: "Devenir client",
    description:
      "Ouvrez votre compte particulier pour publier instantanément votre première demande de prestation.",
  },
  {
    icon: Users,
    number: "02",
    title: "Choisissez un prestataire",
    description:
      "Comparez les profils, les avis et les tarifs, puis sélectionnez le bon.",
  },
  {
    icon: CalendarCheck,
    number: "03",
    title: "Réservez en toute sérénité",
    description:
      "Validez le créneau avec le prestataire choisi et suivez le déroulement de la mission en temps réel.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-500 mb-3">
            Simple et rapide
          </p>
          <h2 className="font-serif text-4xl font-bold text-[#1a1208] mb-4">
            Comment ça marche
          </h2>
          <p className="text-[15px] text-gray-600 max-w-md mx-auto leading-relaxed">
            Trois étapes suffisent pour confier vos tâches du quotidien à un
            professionnel de confiance.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STEPS.map(({ icon: Icon, number, title, description }) => (
            <div
              key={number}
              className="bg-white border border-[#e5ddd0] rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-shadow duration-300"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-forest-800 flex items-center justify-center">
                  <Icon size={20} className="text-white" />
                </div>
                <span className="text-4xl font-bold text-[#e5ddd0] font-serif select-none">
                  {number}
                </span>
              </div>
              <h3 className="font-serif text-xl font-semibold text-amber-500 mb-3">
                {title}
              </h3>
              <p className="text-[14px] text-gray-600 leading-relaxed">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

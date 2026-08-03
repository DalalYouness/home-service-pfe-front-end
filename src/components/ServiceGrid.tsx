import { Wrench, Flower2, Truck, Sparkles, Baby, PawPrint } from "lucide-react";
import { ServiceCard } from "./ServiceCard";

const SERVICES_LIST = [
  {
    id: 1,
    title: "Bricolage",
    description: "Montage, fixation, petits travaux",
    icon: Wrench,
  },
  {
    id: 2,
    title: "Jardinage",
    description: "Tonte, élagage, entretien extérieur",
    icon: Flower2,
  },
  {
    id: 3,
    title: "Déménagement",
    description: "Transport, emballage, chargement",
    icon: Truck,
  },
  {
    id: 4,
    title: "Ménage",
    description: "Nettoyage, repassage, vitres",
    icon: Sparkles,
  },
  {
    id: 5,
    title: "Enfants",
    description: "Garde, sorties d'école, aide",
    icon: Baby,
  },
  {
    id: 6,
    title: "Animaux",
    description: "Promenade, soins, pension",
    icon: PawPrint,
  },
];

export const ServiceGrid = () => {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header Section */}
      <div className="text-center max-w-2xl mx-auto mb-10 md:mb-12">
        <h2 className="font-serif font-bold text-2xl sm:text-3xl md:text-4xl text-forest-900 mb-3">
          Nos Services à Domicile
        </h2>
        <p className="font-sans text-sm sm:text-base text-gray-600">
          Trouvez le professionnel idéal pour tous vos besoins du quotidien.
        </p>
      </div>

      {/* Grid Container (Mobile-First) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {SERVICES_LIST.map((service) => (
          <ServiceCard
            key={service.id}
            title={service.title}
            description={service.description}
            icon={service.icon}
          />
        ))}
      </div>
    </section>
  );
};

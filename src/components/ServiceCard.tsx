// src/components/services/ServiceCard.tsx
import { type LucideIcon } from "lucide-react";

type ServiceCardProps = {
  title: string;
  description: string;
  // c'est le type de l'icône que je vais passer en prop, c'est un composant React qui représente une icône
  icon: LucideIcon;
};

export const ServiceCard = ({
  title,
  description,
  icon: Icon,
}: ServiceCardProps) => {
  return (
    <div className="group cursor-pointer bg-white rounded-3xl p-5 md:p-6 border border-cream-200 shadow-card hover:shadow-card-hover hover:border-forest-200 transition-all duration-300 flex items-center gap-4 text-left active:scale-[0.98]">
      {/* Icon Container */}
      <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-forest-50 text-forest-700 flex items-center justify-center shrink-0 group-hover:bg-forest-900 group-hover:text-white transition-colors duration-300">
        <Icon className="w-6 h-6 md:w-7 md:h-7 stroke-[1.8]" />
      </div>

      {/* Text Container */}
      <div className="flex-1 min-w-0">
        <h3 className="font-serif font-bold text-lg md:text-xl text-forest-900 group-hover:text-forest-700 transition-colors truncate">
          {title}
        </h3>
        <p className="font-sans text-xs md:text-sm text-gray-500 line-clamp-1 mt-0.5">
          {description}
        </p>
      </div>
    </div>
  );
};

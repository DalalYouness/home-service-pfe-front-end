import { ServiceCard } from "./ServiceCard";
import { useServices } from "../hooks/useServices";
import {
  Wrench,
  Zap,
  Paintbrush,
  Flower2,
  Sparkles,
  BookOpen,
  Briefcase,
  ChevronDown,
  type LucideIcon,
} from "lucide-react";

const SERVICE_MEDIA_MAP: Record<string, { icon: LucideIcon; bgImage: string }> =
  {
    Plomberie: {
      icon: Wrench,
      bgImage:
        "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?q=80&w=800&auto=format&fit=crop",
    },
    Électricité: {
      icon: Zap,
      bgImage:
        "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=800&auto=format&fit=crop",
    },
    Peinture: {
      icon: Paintbrush,
      bgImage:
        "https://images.unsplash.com/photo-1562259949-e8e7689d7828?q=80&w=800&auto=format&fit=crop",
    },
    Jardinage: {
      icon: Flower2,
      bgImage:
        "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?q=80&w=800&auto=format&fit=crop",
    },
    "Nettoyage à domicile": {
      icon: Sparkles,
      bgImage:
        "https://images.pexels.com/photos/4099467/pexels-photo-4099467.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
    "Cours à domicile": {
      icon: BookOpen,
      bgImage:
        "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=800&auto=format&fit=crop",
    },
  };

export const ServiceGrid = () => {
  const { services } = useServices();

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {services.map((service) => {
          const media = SERVICE_MEDIA_MAP[service.name];

          return (
            <ServiceCard
              key={service.id}
              id={service.id}
              title={service.name}
              description={service.description}
              icon={media?.icon || Briefcase}
              bgImage={media?.bgImage}
            />
          );
        })}
      </div>

      {/* Button Section */}
      <div className="mt-10 md:mt-12 flex justify-center">
        <button className="group relative inline-flex items-center justify-center gap-3 px-7 py-3.5 rounded-full bg-white border border-cream-300 text-forest-900 font-sans font-semibold text-sm sm:text-base shadow-card hover:shadow-card-hover hover:border-forest-500 hover:text-forest-700 active:scale-95 transition-all duration-300 cursor-pointer">
          <span>Voir tous les services</span>
          <div className="p-1 rounded-full bg-forest-50 text-forest-700 group-hover:bg-forest-900 group-hover:text-white transition-colors duration-300">
            <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-1 group-hover:animate-bounce" />
          </div>
        </button>
      </div>
    </div>
  );
};

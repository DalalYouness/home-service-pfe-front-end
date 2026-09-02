import React, { useState } from "react";
import { ServiceCard } from "./ServiceCard";
import { useServices } from "../hooks/useServices";
import {
  Wrench,
  Zap,
  Paintbrush,
  Flower2,
  Sparkles,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Hammer,
  Truck,
  Tv,
  ShieldCheck,
  Flame,
  Home,
  Laptop,
  type LucideIcon,
} from "lucide-react";

// 1. Dictionnaire complet des services courants
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
    Informatique: {
      icon: Laptop,
      bgImage:
        "https://images.unsplash.com/photo-1588702547923-7093a6c36452?q=80&w=800&auto=format&fit=crop",
    },
    Menuiserie: {
      icon: Hammer,
      bgImage:
        "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?q=80&w=800&auto=format&fit=crop",
    },
    Déménagement: {
      icon: Truck,
      bgImage:
        "https://images.unsplash.com/photo-1600518464441-9154a4dea21b?q=80&w=800&auto=format&fit=crop",
    },
    "Réparation Électroménager": {
      icon: Tv,
      bgImage:
        "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop",
    },
    Climatisation: {
      icon: Flame,
      bgImage:
        "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=800&auto=format&fit=crop",
    },
    Sécurité: {
      icon: ShieldCheck,
      bgImage:
        "https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=800&auto=format&fit=crop",
    },
  };

const DEFAULT_MEDIA = {
  icon: Home,
  bgImage:
    "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=800&auto=format&fit=crop",
};

const getServiceMedia = (serviceName: string) => {
  if (SERVICE_MEDIA_MAP[serviceName]) {
    return SERVICE_MEDIA_MAP[serviceName];
  }

  const normalized = serviceName.toLowerCase();

  for (const [key, value] of Object.entries(SERVICE_MEDIA_MAP)) {
    if (
      normalized.includes(key.toLowerCase()) ||
      key.toLowerCase().includes(normalized)
    ) {
      return value;
    }
  }

  if (
    normalized.includes("pc") ||
    normalized.includes("ordinate") ||
    normalized.includes("reseau") ||
    normalized.includes("réseau")
  ) {
    return SERVICE_MEDIA_MAP["Informatique"];
  }

  return DEFAULT_MEDIA;
};

export const ServiceGrid: React.FC = () => {
  const { services } = useServices();
  const [showAll, setShowAll] = useState<boolean>(false);

  const initialServices = services.slice(0, 6);

  const extraServices = services.slice(6);

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {initialServices.map((service) => {
          const media = getServiceMedia(service.name);
          return (
            <ServiceCard
              key={service.id}
              id={service.id}
              title={service.name}
              description={service.description}
              icon={media.icon}
              bgImage={media.bgImage}
            />
          );
        })}
      </div>

      {extraServices.length > 0 && (
        <div
          className={`grid transition-all duration-500 ease-in-out ${
            showAll
              ? "grid-rows-[1fr] opacity-100 mt-5 sm:mt-6"
              : "grid-rows-[0fr] opacity-0 mt-0"
          }`}
        >
          <div className="overflow-hidden">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {extraServices.map((service) => {
                const media = getServiceMedia(service.name);
                return (
                  <ServiceCard
                    key={service.id}
                    id={service.id}
                    title={service.name}
                    description={service.description}
                    icon={media.icon}
                    bgImage={media.bgImage}
                  />
                );
              })}
            </div>
          </div>
        </div>
      )}

      {services.length > 6 && (
        <div className="mt-10 md:mt-12 flex justify-center">
          <button
            onClick={() => setShowAll((prev) => !prev)}
            className="group relative inline-flex items-center justify-center gap-3 px-7 py-3.5 rounded-full bg-white border border-cream-300 text-forest-900 font-sans font-semibold text-sm sm:text-base shadow-card hover:shadow-card-hover hover:border-forest-500 hover:text-forest-700 active:scale-95 transition-all duration-300 cursor-pointer"
          >
            <span>{showAll ? "Voir moins" : "Voir tous les services"}</span>
            <div className="p-1 rounded-full bg-forest-50 text-forest-700 group-hover:bg-forest-900 group-hover:text-white transition-colors duration-300">
              <div
                className={`transition-transform duration-300 ${
                  showAll ? "rotate-180" : "rotate-0"
                }`}
              >
                <ChevronDown className="w-4 h-4 group-hover:animate-bounce" />
              </div>
            </div>
          </button>
        </div>
      )}
    </div>
  );
};

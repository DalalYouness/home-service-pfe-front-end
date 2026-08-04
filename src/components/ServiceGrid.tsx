// src/components/services/ServiceGrid.tsx
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

// Dictionary كيربط السمية بـ الأيقونة والصورة ديال الخلفية
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
        "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=800&auto=format&fit=crop",
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

// import {
//   Wrench,
//   Zap,
//   Paintbrush,
//   Flower2,
//   Sparkles,
//   BookOpen,
//   Briefcase,
//   ChevronDown,
//   type LucideIcon, // 1. Import le type LucideIcon
// } from "lucide-react";
// import { ServiceCard } from "./ServiceCard";
// import { useServices } from "../hooks/useServices";

// // 2. Typing explicit avec LucideIcon
// const SERVICE_ICONS_MAP: Record<string, LucideIcon> = {
//   Plomberie: Wrench,
//   Électricité: Zap,
//   Peinture: Paintbrush,
//   Jardinage: Flower2,
//   "Nettoyage à domicile": Sparkles,
//   "Cours à domicile": BookOpen,
// };

// export const ServiceGrid = () => {
//   const { services } = useServices();

//   return (
//     <div className="w-full">
//       {/* Grid Container */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
//         {services.map((service) => {
//           // 3. Extraction sécurisée de l'icône
//           const SelectedIcon: LucideIcon =
//             SERVICE_ICONS_MAP[service.name] || Briefcase;

//           return (
//             <ServiceCard
//               key={service.id}
//               title={service.name}
//               description={service.description}
//               icon={SelectedIcon}
//             />
//           );
//         })}
//       </div>

//       {/* Button Section */}
//       <div className="mt-10 md:mt-12 flex justify-center">
//         <button className="group relative inline-flex items-center justify-center gap-3 px-7 py-3.5 rounded-full bg-white border border-cream-300 text-forest-900 font-sans font-semibold text-sm sm:text-base shadow-card hover:shadow-card-hover hover:border-forest-500 hover:text-forest-700 active:scale-95 transition-all duration-300 cursor-pointer">
//           <span>Voir tous les services</span>
//           <div className="p-1 rounded-full bg-forest-50 text-forest-700 group-hover:bg-forest-900 group-hover:text-white transition-colors duration-300">
//             <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-1 group-hover:animate-bounce" />
//           </div>
//         </button>
//       </div>
//     </div>
//   );
// };

import { useState, useEffect } from "react";
import {
  Wrench,
  Zap,
  Paintbrush,
  Flower2,
  Sparkles,
  BookOpen,
  HelpCircle,
  Hammer,
  Truck,
  Tv,
  ShieldCheck,
  Flame,
  Laptop,
  type LucideIcon,
  Loader2,
} from "lucide-react";
import { CategoryTab } from "./CategoryTab";
import { ProviderCardClient } from "./ProviderCardClient";
import { useServices } from "../hooks/useServices";
import { usePublicProviders } from "../hooks/usePublicProviders";
import { useAuth } from "../context/AuthContext";

// 1. Dictionnaire complet des icônes par nom de service
const SERVICE_ICON_MAP: Record<string, LucideIcon> = {
  Plomberie: Wrench,
  Électricité: Zap,
  Peinture: Paintbrush,
  Jardinage: Flower2,
  "Nettoyage à domicile": Sparkles,
  "Cours à domicile": BookOpen,
  Informatique: Laptop,
  Menuiserie: Hammer,
  Déménagement: Truck,
  "Réparation Électroménager": Tv,
  Climatisation: Flame,
  Sécurité: ShieldCheck,
};

// 2. Helper Function : Recherche intelligente par mot-clé pour trouver l'icône
const getCategoryIcon = (name: string): LucideIcon => {
  if (!name) return HelpCircle;

  // Recherche directe
  if (SERVICE_ICON_MAP[name]) {
    return SERVICE_ICON_MAP[name];
  }

  const normalized = name.toLowerCase();

  // Mapping dynamique par mots-clés
  if (normalized.includes("plomb")) return Wrench;
  if (normalized.includes("electr") || normalized.includes("électr"))
    return Zap;
  if (normalized.includes("peint")) return Paintbrush;
  if (normalized.includes("jardin")) return Flower2;
  if (
    normalized.includes("nettoy") ||
    normalized.includes("menage") ||
    normalized.includes("mênage")
  )
    return Sparkles;
  if (
    normalized.includes("cour") ||
    normalized.includes("prof") ||
    normalized.includes("etud")
  )
    return BookOpen;
  if (
    normalized.includes("info") ||
    normalized.includes("pc") ||
    normalized.includes("ordinate") ||
    normalized.includes("reseau")
  )
    return Laptop;
  if (normalized.includes("menuis") || normalized.includes("bois"))
    return Hammer;
  if (
    normalized.includes("demenag") ||
    normalized.includes("déménag") ||
    normalized.includes("transp")
  )
    return Truck;
  if (
    normalized.includes("electromenager") ||
    normalized.includes("tv") ||
    normalized.includes("appareil")
  )
    return Tv;
  if (normalized.includes("clim") || normalized.includes("chauff"))
    return Flame;
  if (
    normalized.includes("securit") ||
    normalized.includes("sécurit") ||
    normalized.includes("cam")
  )
    return ShieldCheck;

  return HelpCircle;
};

export default function ClientDashboard() {
  const { user } = useAuth();
  const { services, isLoadingServices } = useServices();

  const [selectedServiceId, setSelectedServiceId] = useState<number | null>(
    null,
  );

  useEffect(() => {
    if (services && services.length > 0 && !selectedServiceId) {
      setSelectedServiceId(services[0].id);
    }
  }, [services, selectedServiceId]);

  const { providers, isLoading: isLoadingProviders } =
    usePublicProviders(selectedServiceId);

  const filteredProviders =
    providers?.filter((provider) => provider.id !== user?.id) || [];

  if (isLoadingServices) {
    return (
      <div className="w-full flex items-center gap-3 overflow-x-auto border-b border-slate-200 dark:border-slate-800 pb-2 animate-pulse">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="h-16 w-24 bg-slate-200 dark:bg-slate-800 rounded-xl shrink-0"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      {/* 🔹 Services Navigation Bar */}
      <div className="flex items-center gap-2 overflow-x-auto border-b border-slate-200 dark:border-slate-800 pb-2 scrollbar-none w-full">
        {services?.map((service: any) => {
          const ServiceIcon = getCategoryIcon(service.name);
          const isSelected = selectedServiceId === service.id;

          return (
            <CategoryTab
              key={service.id}
              label={service.name}
              icon={ServiceIcon}
              isActive={isSelected}
              onClick={() => setSelectedServiceId(service.id)}
            />
          );
        })}
      </div>

      {/* Providers Grid Section */}
      <div className="w-full">
        {isLoadingProviders ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 text-emerald-600 animate-spin" />
          </div>
        ) : filteredProviders.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filteredProviders.map((provider) => (
              <ProviderCardClient
                key={provider.id}
                id={provider.id}
                firstName={provider.firstName}
                lastName={provider.lastName}
                city={provider.city}
                country={provider.country}
                imgUrl={provider.imgUrl}
                gender={provider.gender}
                serviceId={selectedServiceId}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-slate-500 dark:text-slate-400">
            Aucun prestataire disponible pour ce service pour le moment.
          </div>
        )}
      </div>
    </div>
  );
}

// import { useState, useEffect } from "react";
// import {
//   Wrench,
//   Zap,
//   Paintbrush,
//   Flower2,
//   Sparkles,
//   BookOpen,
//   HelpCircle,
//   type LucideIcon,
//   Loader2,
// } from "lucide-react";
// import { CategoryTab } from "./CategoryTab";
// import { ProviderCardClient } from "./ProviderCardClient";
// import { useServices } from "../hooks/useServices";
// import { usePublicProviders } from "../hooks/usePublicProviders";
// import { useAuth } from "../context/AuthContext"; // 1. استيراد الـ Auth

// const SERVICE_ICON_MAP: Record<string, LucideIcon> = {
//   Plomberie: Wrench,
//   Électricité: Zap,
//   Peinture: Paintbrush,
//   Jardinage: Flower2,
//   "Nettoyage à domicile": Sparkles,
//   "Cours à domicile": BookOpen,
// };

// export default function ClientDashboard() {
//   const { user } = useAuth();
//   const { services, isLoadingServices } = useServices();

//   const [selectedServiceId, setSelectedServiceId] = useState<number | null>(
//     null,
//   );

//   useEffect(() => {
//     if (services && services.length > 0 && !selectedServiceId) {
//       setSelectedServiceId(services[0].id);
//     }
//   }, [services, selectedServiceId]);

//   const { providers, isLoading: isLoadingProviders } =
//     usePublicProviders(selectedServiceId);

//   const getCategoryIcon = (name: string): LucideIcon => {
//     return SERVICE_ICON_MAP[name] || HelpCircle;
//   };

//   const filteredProviders =
//     providers?.filter((provider) => provider.id !== user?.id) || [];

//   if (isLoadingServices) {
//     return (
//       <div className="w-full flex items-center gap-3 overflow-x-auto border-b border-slate-200 dark:border-slate-800 pb-2 animate-pulse">
//         {[1, 2, 3, 4, 5, 6].map((i) => (
//           <div
//             key={i}
//             className="h-16 w-24 bg-slate-200 dark:bg-slate-800 rounded-xl shrink-0"
//           />
//         ))}
//       </div>
//     );
//   }

//   return (
//     <div className="w-full space-y-6">
//       {/* 🔹 Services Navigation Bar */}
//       <div className="flex items-center gap-2 overflow-x-auto border-b border-slate-200 dark:border-slate-800 pb-2 scrollbar-none w-full">
//         {services?.map((service: any) => {
//           const ServiceIcon = getCategoryIcon(service.name);

//           const isSelected = selectedServiceId === service.id;

//           return (
//             <CategoryTab
//               key={service.id}
//               label={service.name}
//               icon={ServiceIcon}
//               isActive={isSelected}
//               onClick={() => setSelectedServiceId(service.id)}
//             />
//           );
//         })}
//       </div>

//       {/* Providers Grid Section */}
//       <div className="w-full">
//         {isLoadingProviders ? (
//           <div className="flex items-center justify-center py-12">
//             <Loader2 className="w-8 h-8 text-emerald-600 animate-spin" />
//           </div>
//         ) : filteredProviders.length > 0 ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
//             {filteredProviders.map((provider) => (
//               <ProviderCardClient
//                 key={provider.id}
//                 id={provider.id}
//                 firstName={provider.firstName}
//                 lastName={provider.lastName}
//                 city={provider.city}
//                 country={provider.country}
//                 imgUrl={provider.imgUrl}
//                 gender={provider.gender}
//                 serviceId={selectedServiceId}
//               />
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-12 text-slate-500 dark:text-slate-400">
//             Aucun prestataire disponible pour ce service pour le moment.
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import {
  Wrench,
  Zap,
  Paintbrush,
  Flower2,
  Sparkles,
  BookOpen,
  HelpCircle,
  type LucideIcon,
} from "lucide-react";
import { CategoryTab } from "./CategoryTab";
import { useServices } from "../hooks/useServices";

const SERVICE_ICON_MAP: Record<string, LucideIcon> = {
  Plomberie: Wrench,
  Électricité: Zap,
  Peinture: Paintbrush,
  Jardinage: Flower2,
  "Nettoyage à domicile": Sparkles,
  "Cours à domicile": BookOpen,
};

export default function ClientDashboard() {
  const { services, isLoadingServices } = useServices();
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const getCategoryIcon = (name: string): LucideIcon => {
    return SERVICE_ICON_MAP[name] || HelpCircle;
  };

  // Skeleton Loading
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
    <div className="w-full">
      {/* Barre de navigation horizontale des services */}
      <div className="flex items-center gap-2 overflow-x-auto border-b border-slate-200 dark:border-slate-800 pb-2 scrollbar-none">
        {/* Dynamic Services Tabs */}
        {services?.map((service: any, index: number) => {
          const ServiceIcon = getCategoryIcon(service.name);

          const isSelected = selectedCategory
            ? selectedCategory === service.name
            : index === 0;

          return (
            <CategoryTab
              key={service.id || service.name}
              label={service.name}
              icon={ServiceIcon}
              isActive={isSelected}
              onClick={() => setSelectedCategory(service.name)}
            />
          );
        })}
      </div>
    </div>
  );
}

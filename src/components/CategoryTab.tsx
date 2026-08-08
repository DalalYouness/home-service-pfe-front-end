import React from "react";
import { type LucideIcon } from "lucide-react";

interface CategoryTabProps {
  label: string;
  icon: LucideIcon;
  isActive?: boolean;
  onClick?: () => void;
}

export const CategoryTab: React.FC<CategoryTabProps> = ({
  label,
  icon: Icon,
  isActive = false,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`relative flex flex-col items-center justify-center gap-2 px-4 py-2.5 transition-all duration-200 cursor-pointer shrink-0 rounded-xl ${
        isActive
          ? "bg-emerald-800/10 dark:bg-emerald-500/15 text-emerald-800 dark:text-emerald-400 font-bold"
          : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/50"
      }`}
    >
      <Icon
        size={22}
        className={`transition-transform duration-200 ${
          isActive
            ? "text-emerald-800 dark:text-emerald-400 scale-110"
            : "text-slate-500 dark:text-slate-400"
        }`}
      />
      <span className="text-xs whitespace-nowrap tracking-wide">{label}</span>

      {isActive && (
        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-emerald-800 dark:bg-emerald-400 rounded-full" />
      )}
    </button>
  );
};

import React from "react";
import { LucideIcon } from "lucide-react";

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
      className={`flex flex-col items-center justify-center gap-1.5 px-3 py-2 transition-all border-b-2 cursor-pointer shrink-0 ${
        isActive
          ? "border-blue-600 text-blue-600 font-semibold"
          : "border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
      }`}
    >
      <Icon
        size={20}
        className={
          isActive ? "text-blue-600" : "text-slate-600 dark:text-slate-400"
        }
      />
      <span className="text-xs whitespace-nowrap">{label}</span>
    </button>
  );
};

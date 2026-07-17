import React from "react";
import { ProfilSection } from "./ProfilSection";
import { SecuritySection } from "./SecuritySection";
import { SuppressionSection } from "./SuppressionSection";

export const MonCompte: React.FC = () => {
  return (
    <div className="w-full space-y-4 py-6 px-4 md:px-8 pb-16 font-sans">
      <div className="space-y-1">
        <h1 className="text-xl md:text-2xl font-bold text-forest-800 tracking-tight">
          Paramètres du compte
        </h1>
        <p className="text-xs md:text-sm text-forest-700/70">
          Mettez à jour vos informations et configurez la sécurité de votre
          compte.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 items-start w-full">
        <div className="bg-white rounded-2xl border border-cream-200/50 shadow-[0_2px_12px_rgba(140,130,122,0.05)] hover:shadow-[0_4px_20px_rgba(140,130,122,0.08)] transition-all duration-300">
          <ProfilSection />
        </div>
        <div className="bg-white rounded-2xl border border-cream-200/50 shadow-[0_2px_12px_rgba(140,130,122,0.05)] hover:shadow-[0_4px_20px_rgba(140,130,122,0.08)] transition-all duration-300">
          <SecuritySection />
        </div>
        <div className="bg-white rounded-2xl border border-cream-200/50 shadow-[0_2px_12px_rgba(140,130,122,0.05)] hover:shadow-[0_4px_20px_rgba(140,130,122,0.08)] transition-all duration-300 md:col-span-2">
          <SuppressionSection />
        </div>
      </div>
    </div>
  );
};

import React from "react";
import { ProfilSection } from "./ProfilSection";
import { SecuriteSection } from "./SecuritySection";
import { SuppressionSection } from "./SuppressionSection";

export const MonCompte: React.FC = () => {
  return (
    <div className="w-full space-y-8 py-4 pb-16 font-sans">
      {/* ─── الـ Header الرئيسي ─── */}
      <div className="w-full">
        <h1 className="text-2xl font-bold text-forest-900 tracking-tight">
          Paramètres du compte
        </h1>
        <p className="text-sm text-forest-700/70 mt-1">
          Mettez à jour vos informations et configurez la sécurité de votre
          compte.
        </p>
      </div>

      {/* الـ Container الرئيسي الموحد */}
      <div className="w-full bg-white border border-cream-200 rounded-3xl shadow-card divide-y divide-cream-100 transition-all hover:shadow-card-hover">
        <ProfilSection />
        <SecuriteSection />
        <SuppressionSection />
      </div>
    </div>
  );
};

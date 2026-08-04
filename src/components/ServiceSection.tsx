// src/components/services/ServicesSection.tsx
import { ServiceGrid } from "./ServiceGrid";

export const ServicesSection = () => {
  return (
    <section className="w-full bg-cream-50 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          {/* Sub-title Badge */}
          <span className="font-sans text-xs sm:text-sm font-semibold tracking-widest text-forest-500 uppercase">
            NOS CATÉGORIES
          </span>

          {/* Main Title */}
          <h2 className="font-serif font-bold text-3xl sm:text-4xl md:text-5xl text-forest-900 mt-3 mb-4 leading-tight">
            Trouvez de l'aide pour chaque tâche
          </h2>

          {/* Description */}
          <p className="font-sans text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Explorez nos services à domicile et bien plus. Chaque catégorie
            regroupe des prestataires vérifiés, prêts à intervenir.
          </p>
        </div>

        {/* Grid Component */}
        <ServiceGrid />
      </div>
    </section>
  );
};

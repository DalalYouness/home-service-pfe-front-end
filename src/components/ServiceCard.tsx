import { useState } from "react";
import { ArrowUpRight, type LucideIcon } from "lucide-react";
import { ProvidersModal } from "./ProvidersModal";

type ServiceCardProps = {
  id: number;
  title: string;
  description: string;
  icon: LucideIcon;
  bgImage?: string;
};

export const ServiceCard = ({
  id,
  title,
  description,
  icon: Icon,
  bgImage,
}: ServiceCardProps) => {
  // Prestataires Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setIsModalOpen(true)}
        className="group relative rounded-[2rem] p-6 md:p-7 border border-cream-200/40 shadow-card hover:shadow-card-hover transition-all duration-500 flex flex-col justify-between min-h-[240px] cursor-pointer active:scale-[0.98] overflow-hidden bg-forest-900"
      >
        {/* 1. Background Image with Zoom Effect */}
        {bgImage && (
          <img
            src={bgImage}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
          />
        )}

        {/* 2. Dark Overlay Layer for Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30 group-hover:via-black/60 transition-colors duration-500" />

        {/* 3. Header: Icon Badge & Action Arrow */}
        <div className="flex items-start justify-between gap-4 relative z-10">
          <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center group-hover:bg-white group-hover:text-forest-900 transition-all duration-300 shadow-sm">
            <Icon className="w-6 h-6 stroke-[1.8] transition-transform duration-300 group-hover:scale-110" />
          </div>

          <div className="w-9 h-9 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center group-hover:bg-white group-hover:text-forest-900 transition-all duration-300">
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>

        {/* 4. Bottom Content */}
        <div className="mt-8 relative z-10">
          <h3 className="font-serif font-bold text-xl md:text-2xl text-white group-hover:text-cream-100 transition-colors">
            {title}
          </h3>
          <p className="font-sans text-xs md:text-sm text-gray-200 line-clamp-2 mt-1.5 leading-relaxed drop-shadow-sm">
            {description}
          </p>
        </div>
      </div>
      <ProvidersModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        serviceId={id}
        serviceTitle={title}
      />
    </>
  );
};

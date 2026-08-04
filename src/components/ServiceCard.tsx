// src/components/services/ServiceCard.tsx
import { ArrowUpRight, type LucideIcon } from "lucide-react";

type ServiceCardProps = {
  title: string;
  description: string;
  icon: LucideIcon;
  bgImage?: string; // رابط صورة الخلفية لكل خدمة
};

export const ServiceCard = ({
  title,
  description,
  icon: Icon,
  bgImage,
}: ServiceCardProps) => {
  return (
    <div className="group relative rounded-[2rem] p-6 md:p-7 border border-cream-200/40 shadow-card hover:shadow-card-hover transition-all duration-500 flex flex-col justify-between min-h-[240px] cursor-pointer active:scale-[0.98] overflow-hidden bg-forest-900">
      {/* 1. Background Image with Zoom Effect */}
      {bgImage && (
        <img
          src={bgImage}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
        />
      )}

      {/* 2. Dark Overlay Layer for Readability (ضروري جداً باش الكتابة تتقرا) */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30 group-hover:via-black/60 transition-colors duration-500" />

      {/* 3. Header: Icon Badge & Action Arrow */}
      <div className="flex items-start justify-between gap-4 relative z-10">
        {/* Glassmorphism Icon Container */}
        <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center group-hover:bg-white group-hover:text-forest-900 transition-all duration-300 shadow-sm">
          <Icon className="w-6 h-6 stroke-[1.8] transition-transform duration-300 group-hover:scale-110" />
        </div>

        {/* Action Button Badge */}
        <div className="w-9 h-9 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center group-hover:bg-white group-hover:text-forest-900 transition-all duration-300">
          <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>

      {/* 4. Bottom Content: Title & Description (White Text) */}
      <div className="mt-8 relative z-10">
        <h3 className="font-serif font-bold text-xl md:text-2xl text-white group-hover:text-cream-100 transition-colors">
          {title}
        </h3>
        <p className="font-sans text-xs md:text-sm text-gray-200 line-clamp-2 mt-1.5 leading-relaxed drop-shadow-sm">
          {description}
        </p>
      </div>
    </div>
  );
};

// // src/components/services/ServiceCard.tsx
// import { ArrowUpRight, type LucideIcon } from "lucide-react";

// type ServiceCardProps = {
//   title: string;
//   description: string;
//   icon: LucideIcon;
// };

// export const ServiceCard = ({
//   title,
//   description,
//   icon: Icon,
// }: ServiceCardProps) => {
//   return (
//     <div className="group relative bg-white rounded-[2rem] p-6 md:p-7 border border-cream-200/80 shadow-card hover:shadow-card-hover hover:border-forest-300 transition-all duration-500 flex flex-col justify-between min-h-[220px] cursor-pointer active:scale-[0.98] overflow-hidden">
//       {/* Soft Ambient Glow Effect on Hover (Framer feel) */}
//       <div className="absolute -top-12 -right-12 w-32 h-32 bg-forest-100/40 rounded-full blur-2xl group-hover:bg-forest-200/50 group-hover:scale-150 transition-all duration-700 pointer-events-none" />

//       {/* 1. Header: Icon Badge & Action Button in same row */}
//       <div className="flex items-start justify-between gap-4 relative z-10">
//         {/* Modern Modernized Icon Container */}
//         <div className="w-13 h-13 rounded-2xl bg-cream-100/80 border border-cream-300/60 text-forest-900 flex items-center justify-center group-hover:bg-forest-900 group-hover:text-white group-hover:border-forest-900 transition-all duration-300 shadow-sm">
//           <Icon className="w-6 h-6 stroke-[1.8] transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3" />
//         </div>

//         {/* Top-Right Arrow Badge */}
//         <div className="w-9 h-9 rounded-xl bg-cream-50/80 border border-cream-200 text-forest-800 flex items-center justify-center group-hover:bg-forest-900 group-hover:text-white group-hover:border-forest-900 transition-all duration-300">
//           <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
//         </div>
//       </div>

//       {/* 2. Content Section: Title & Description at the bottom */}
//       <div className="mt-6 relative z-10">
//         <h3 className="font-serif font-bold text-xl md:text-2xl text-forest-900 group-hover:text-forest-700 transition-colors">
//           {title}
//         </h3>
//         <p className="font-sans text-xs md:text-sm text-gray-500 line-clamp-2 mt-2 leading-relaxed">
//           {description}
//         </p>
//       </div>
//     </div>
//   );
// };

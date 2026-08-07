import { useState } from "react";
import { MapPin, Star, X } from "lucide-react";
import type { ProvidersPublic } from "../types/prestataire";
import PrestatairePublicInfoCard from "./PrestatairePublicInfoCard";

export type ProviderCardProps = ProvidersPublic & {
  rating?: number; // Optional
};

export const ProviderCard = ({
  id,
  firstName,
  lastName,
  city,
  country,
  imgUrl,
  rating,
}: ProviderCardProps) => {
  /// state dyalo flwl katkon false ya3ni l composant f lwl kaygolihom ana rah l7ala dyali machi open hta nwarko ela voir profil
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const formattedFirstName = firstName
    ? firstName.charAt(0).toUpperCase() + firstName.slice(1)
    : "";
  const formattedLastName = lastName
    ? lastName.charAt(0).toUpperCase() + lastName.slice(1)
    : "";

  const fullName = `${formattedFirstName} ${formattedLastName}`.trim();
  const initialLetter = formattedFirstName ? formattedFirstName.charAt(0) : "?";
  const locationText = [city, country].filter(Boolean).join(", ");

  // hado blama nhtaj anaho ga3 ndirhom f hook bohadhom
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <>
      {/* Provider Card Main Container */}
      <div className="w-full max-w-sm rounded-[1.75rem] bg-white border border-[#eae4d3] p-5 shadow-sm hover:shadow-md transition-shadow duration-300 font-sans flex flex-col justify-between">
        {/* Top Section: Avatar, Name & Location */}
        <div className="flex items-start gap-3 mb-4">
          <div className="relative shrink-0">
            {imgUrl ? (
              <img
                src={imgUrl}
                alt={fullName}
                className="w-14 h-14 rounded-full object-cover border border-gray-100"
              />
            ) : (
              <div className="w-14 h-14 rounded-full bg-forest-900 text-cream-100 font-serif font-bold text-xl flex items-center justify-center border border-gray-100">
                {initialLetter}
              </div>
            )}
          </div>

          <div className="flex flex-col">
            <h3 className="font-sans font-bold text-base text-gray-900 leading-snug">
              {fullName}
            </h3>
            {locationText && (
              <div className="flex items-center gap-1 text-xs text-gray-400 mt-1">
                <MapPin size={12} className="shrink-0" />
                <span>{locationText}</span>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Section: Rating & CTA */}
        <div>
          <div className="pt-3 border-t border-gray-100 flex items-center justify-between mb-4">
            <div className="flex items-center gap-1.5">
              <Star size={16} className="text-amber-400 fill-amber-400" />
              {rating !== undefined ? (
                <span className="font-bold text-sm text-gray-900">
                  {rating}
                </span>
              ) : (
                <span className="text-xs text-gray-400 font-medium">
                  Nouveau
                </span>
              )}
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={handleOpen}
            className="w-full py-3 px-4 rounded-xl bg-forest-900 hover:bg-forest-950 text-white font-medium text-sm transition-colors cursor-pointer active:scale-[0.99]"
          >
            Voir le profil
          </button>
        </div>
      </div>

      {/* 2. Modal Overlay / Modal Container */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto animate-fadeIn">
          {/* Backdrop Click to Close */}
          <div className="fixed inset-0" onClick={handleClose} />

          {/* Modal Content Box */}
          <div className="relative w-full max-w-3xl z-10 my-8">
            {/* Close Button (X) */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-800 transition-colors shadow-md cursor-pointer"
              title="Fermer"
            >
              <X size={20} />
            </button>

            {/* Rendering the Profile Component */}
            {isOpen && <PrestatairePublicInfoCard providerId={id} />}
          </div>
        </div>
      )}
    </>
  );
};

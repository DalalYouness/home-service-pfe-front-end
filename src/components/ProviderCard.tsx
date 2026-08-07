import { MapPin, Star } from "lucide-react";
import type { ProvidersPublic } from "../types/prestataire";

// & means inheriting the properties of ProvidersPublic and adding an optional rating property
export type ProviderCardProps = ProvidersPublic & {
  rating?: number; // Optional
};

export const ProviderCard = ({
  firstName,
  lastName,
  city,
  country,
  imgUrl,
  rating,
}: ProviderCardProps) => {
  const fullName = `${firstName} ${lastName}`.trim();
  const initialLetter = firstName ? firstName.charAt(0).toUpperCase() : "?";
  const locationText = [city, country].filter(Boolean).join(", ");

  return (
    <div className="w-full max-w-sm rounded-[1.75rem] bg-white border border-[#eae4d3] p-5 shadow-sm hover:shadow-md transition-shadow duration-300 font-sans flex flex-col justify-between">
      {/* Top Section: Avatar, Name & Location */}
      <div className="flex items-start gap-3 mb-4">
        {/* Avatar Container */}
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

        {/* Main Info */}
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
          {rating !== undefined ? (
            <div className="flex items-center gap-1.5">
              <Star size={16} className="text-amber-400 fill-amber-400" />
              <span className="font-bold text-sm text-gray-900">{rating}</span>
            </div>
          ) : (
            <span className="text-xs text-gray-400 font-medium">Nouveau</span>
          )}
        </div>

        {/* Action Button */}
        <button className="w-full py-3 px-4 rounded-xl bg-forest-900 hover:bg-forest-950 text-white font-medium text-sm transition-colors cursor-pointer active:scale-[0.99]">
          Voir le profil
        </button>
      </div>
    </div>
  );
};

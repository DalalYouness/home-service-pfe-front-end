import { useState } from "react";
import { Star, MapPin } from "lucide-react";
import type { ProvidersPublic } from "../types/prestataire";
import AnonymeProfile from "./AnonymeProfile";
import ProviderDetailModalClient from "./ProviderDetailModalClient";

export type ProviderCardClientProps = ProvidersPublic & {
  rating?: number;
  serviceId: number;
};

export const ProviderCardClient = ({
  id,
  firstName,
  lastName,
  city,
  country,
  imgUrl,
  rating,
  serviceId,
}: ProviderCardClientProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <>
      <div
        onClick={() => setIsModalOpen(true)}
        className="flex flex-col cursor-pointer group w-full"
      >
        {/* Image Section */}
        <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 mb-2.5">
          {imgUrl ? (
            <img
              src={imgUrl}
              alt={`${firstName} ${lastName}`}
              className="w-full h-full object-cover"
            />
          ) : (
            <AnonymeProfile />
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col gap-0.5 px-0.5">
          {/* full name */}
          <h3 className="font-bold text-slate-900 dark:text-white text-base leading-tight truncate">
            {firstName} {lastName}
          </h3>

          {/* location */}
          <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400 text-xs mt-0.5">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">
              {city}
              {country ? `, ${country}` : ""}
            </span>
          </div>

          {/* rating */}
          <div className="flex items-center gap-1 mt-1 text-xs">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 shrink-0" />
            <span className="font-bold text-slate-800 dark:text-slate-200">
              {rating ? rating.toFixed(2) : "Nouveau"}
            </span>
          </div>
        </div>
      </div>

      <ProviderDetailModalClient
        providerId={id}
        isOpen={isModalOpen}
        serviceId={serviceId}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

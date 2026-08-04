import { Heart, MapPin, Star } from "lucide-react";

// 1. Props Contract Definition
export type ProviderCardProps = {
  fullName: string;
  avatarUrl?: string;
  category: string;
  location: string;
  bio: string; // Dynamic provider description/bio
  rating: number;
  reviewsCount: number;
  hourlyRate?: number; // Optional: for my MVP now, not all providers will have an hourly rate
  onViewProfile?: () => void;
  onFavoriteToggle?: () => void;
};

export const ProviderCard = ({
  fullName,
  avatarUrl,
  category,
  location,
  bio,
  rating,
  reviewsCount,
  hourlyRate,
  onViewProfile,
  onFavoriteToggle,
}: ProviderCardProps) => {
  const initialLetter = fullName ? fullName.charAt(0).toUpperCase() : "?";

  return (
    <div className="w-full max-w-sm rounded-[1.75rem] bg-white border border-[#eae4d3] p-5 shadow-sm hover:shadow-md transition-shadow duration-300 font-sans flex flex-col justify-between">
      {/* Top Section: Avatar, Name, Category & Favorite Icon */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex gap-3">
            {/* Avatar Container with Online Indicator */}
            <div className="relative shrink-0">
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt={fullName}
                  className="w-14 h-14 rounded-full object-cover border border-gray-100"
                />
              ) : (
                <div className="w-14 h-14 rounded-full bg-forest-900 text-cream-100 font-serif font-bold text-xl flex items-center justify-center border border-gray-100">
                  {initialLetter}
                </div>
              )}
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white" />
            </div>

            {/* Main Info */}
            <div className="flex flex-col">
              <h3 className="font-sans font-bold text-base text-gray-900 leading-snug">
                {fullName}
              </h3>
              <span className="text-xs text-gray-500 font-medium mt-0.5">
                {category}
              </span>
              <div className="flex items-center gap-1 text-xs text-gray-400 mt-1">
                <MapPin size={12} className="shrink-0" />
                <span>{location}</span>
              </div>
            </div>
          </div>

          {/* Favorite Action */}
          <button
            onClick={onFavoriteToggle}
            className="text-gray-400 hover:text-red-500 transition-colors p-1"
            aria-label="Ajouter aux favoris"
          >
            <Heart size={20} />
          </button>
        </div>

        {/* Bio Section */}
        <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed my-4 min-h-[36px]">
          {bio}
        </p>
      </div>

      {/* Bottom Section: Rating, Price & CTA */}
      <div>
        <div className="pt-3 border-t border-gray-100 flex items-center justify-between mb-4">
          {/* Rating */}
          <div className="flex items-center gap-1.5">
            <Star size={16} className="text-amber-400 fill-amber-400" />
            <span className="font-bold text-sm text-gray-900">{rating}</span>
            <span className="text-xs text-gray-400">({reviewsCount} avis)</span>
          </div>

          {/* Hourly Rate */}
          {hourlyRate && (
            <div className="text-xs text-gray-500 font-medium">
              dès{" "}
              <span className="text-sm font-bold text-gray-900">
                {hourlyRate} €
              </span>
              /h
            </div>
          )}
        </div>

        {/* Action Button */}
        <button
          onClick={onViewProfile}
          className="w-full py-3 px-4 rounded-xl bg-forest-900 hover:bg-forest-950 text-white font-medium text-sm transition-colors cursor-pointer active:scale-[0.99]"
        >
          Voir le profil
        </button>
      </div>
    </div>
  );
};

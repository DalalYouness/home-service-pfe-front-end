import { X } from "lucide-react";
import { ProviderCard, type ProviderCardProps } from "./ProviderCard";

// Mock Data Type
export type MockProvider = ProviderCardProps & {
  serviceTitle: string;
};

// Mock Data Array
export const MOCK_PROVIDERS: MockProvider[] = [
  // 1. Nettoyage à domicile
  {
    fullName: "Karim Bencheikh",
    avatarUrl:
      "https://images.pexels.com/photos/4099467/pexels-photo-4099467.jpeg?auto=compress&cs=tinysrgb&w=1600",
    category: "Nettoyage & Ménage",
    location: "Casablanca, Maarif",
    bio: "Spécialiste en nettoyage complet à domicile, vitres et canapés avec équipement professionnel.",
    rating: 4.9,
    reviewsCount: 128,
    hourlyRate: 25,
    serviceTitle: "Nettoyage à domicile",
  },
  {
    fullName: "Youssef El Amrani",
    avatarUrl:
      "https://images.pexels.com/photos/6195125/pexels-photo-6195125.jpeg?auto=compress&cs=tinysrgb&w=1600",
    category: "Nettoyage & Ménage",
    location: "Rabat, Agdal",
    bio: "Agent de nettoyage expérimenté, ponctuel et minutieux. Dépoussiérage et désinfection.",
    rating: 4.8,
    reviewsCount: 94,
    hourlyRate: 20,
    serviceTitle: "Nettoyage à domicile",
  },

  // 2. Jardinage & Entretien
  {
    fullName: "Hassan Tazi",
    avatarUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1600&auto=format&fit=crop",
    category: "Jardinage",
    location: "Marrakech, Guéliz",
    bio: "Jardinier passionné pour la taille de haies, tonte de pelouse et aménagement paysager.",
    rating: 4.95,
    reviewsCount: 210,
    hourlyRate: 30,
    serviceTitle: "Jardinage & Entretien",
  },
  {
    fullName: "Omar Zahir",
    category: "Jardinage",
    location: "Casablanca, Bouskoura",
    bio: "Entretien régulier de jardins, système d'arrosage automatique et soin des plantes.",
    rating: 4.7,
    reviewsCount: 62,
    hourlyRate: 22,
    serviceTitle: "Jardinage & Entretien",
  },

  // 3. Plomberie & Dépannage
  {
    fullName: "Rachid Mansouri",
    avatarUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1600&auto=format&fit=crop",
    category: "Plomberie",
    location: "Casablanca, Ain Diab",
    bio: "Plombier certifié. Dépannage d'urgence 24/7, réparation de fuites et installation sanitaire.",
    rating: 4.85,
    reviewsCount: 175,
    hourlyRate: 35,
    serviceTitle: "Plomberie & Dépannage",
  },
  {
    fullName: "Mehdi Benali",
    category: "Plomberie",
    location: "Rabat, Hassan",
    bio: "Installation et débouchement de canalisations, chauffe-eau et robinetterie moderne.",
    rating: 4.6,
    reviewsCount: 48,
    hourlyRate: 28,
    serviceTitle: "Plomberie & Dépannage",
  },
];

type ProvidersModalProps = {
  isOpen: boolean;
  onClose: () => void;
  serviceTitle: string;
};

export const ProvidersModal = ({
  isOpen,
  onClose,
  serviceTitle,
}: ProvidersModalProps) => {
  if (!isOpen) return null;

  // Filtrage حسب الـ serviceTitle
  const filteredProviders = MOCK_PROVIDERS.filter(
    (provider) =>
      provider.serviceTitle.toLowerCase() === serviceTitle.toLowerCase(),
  );

  return (
    // 1. Dark Overlay Overlay
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      {/* 2. Main Window - Background White / Clean Light Design */}
      <div className="relative w-full max-w-5xl max-h-[85vh] bg-white border border-gray-100 rounded-[2.5rem] p-6 md:p-8 shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-300">
        {/* Header Section */}
        <div className="flex items-center justify-between pb-6 border-b border-gray-100">
          <div>
            <span className="text-xs font-semibold text-emerald-600 uppercase tracking-widest">
              Prestataires disponibles
            </span>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-gray-900 mt-1">
              {serviceTitle}
            </h2>
          </div>

          {/* Close Button - Clean Light Style */}
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 border border-gray-200 text-gray-700 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Fermer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Dynamic Content Area */}
        <div className="flex-1 overflow-y-auto py-6">
          {filteredProviders.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
              {filteredProviders.map((provider, index) => (
                <ProviderCard key={index} {...provider} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="p-6 rounded-2xl bg-gray-50 border border-gray-200/80 max-w-md shadow-sm">
                <p className="text-forest-950 font-semibold text-base mb-1">
                  Aucun prestataire disponible
                </p>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Il n'y a pas encore de prestataires enregistrés pour "
                  {serviceTitle}".
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

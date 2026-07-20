import React, { useEffect, useState } from "react";
import {
  User,
  Phone,
  MapPin,
  Globe,
  Plus,
  Camera,
  Sparkles,
} from "lucide-react";

interface UserProfileFormData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  photo: string;
  address: string;
  city: string;
  country: string;
  bio: string;
  interventionArea: string;
}

export default function Profil() {
  const [userRole, setUserRole] = useState<string>("CLIENT");
  const [formData, setFormData] = useState<UserProfileFormData>({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    photo: "",
    address: "",
    city: "",
    country: "",
    bio: "",
    interventionArea: "",
  });

  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        const role =
          parsedUser.roles?.[0]?.roleName || parsedUser.role || "CLIENT";
        setUserRole(role.toUpperCase());

        setFormData((prev) => ({
          ...prev,
          firstName: parsedUser.firstName || "",
          lastName: parsedUser.lastName || "",
          phoneNumber: parsedUser.phoneNumber || "",
          photo: parsedUser.photo || "",
          address: parsedUser.address || "",
          city: parsedUser.city || "",
          country: parsedUser.country || "Maroc",
          bio: parsedUser.bio || "",
          interventionArea: parsedUser.interventionArea || "",
        }));

        if (parsedUser.photo) {
          setPhotoPreview(parsedUser.photo);
        }
      } catch (error) {
        console.error("Error reading user data from localStorage", error);
      }
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPhotoPreview(imageUrl);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Data to send (UserProfileResponseDto style):", formData);
  };

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 border border-cream-200 shadow-sm max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Photo Upload Header Zone */}
        <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-cream-100">
          <div className="relative group">
            <div className="w-28 h-28 md:w-32 md:h-32 rounded-full bg-forest-50 border-2 border-forest-200 flex items-center justify-center overflow-hidden shadow-inner">
              {photoPreview ? (
                <img
                  src={photoPreview}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <User size={48} className="text-forest-400" />
              )}
            </div>

            <label
              htmlFor="photo-upload"
              className="absolute bottom-1 right-1 bg-forest-800 text-white p-2.5 rounded-full shadow-md hover:bg-forest-900 active:scale-95 transition-all cursor-pointer flex items-center justify-center border-2 border-white"
            >
              <Plus size={18} strokeWidth={3} />
              <input
                type="file"
                id="photo-upload"
                accept="image/*"
                className="hidden"
                onChange={handlePhotoChange}
              />
            </label>
          </div>

          <div className="text-center sm:text-left space-y-1">
            <h3 className="font-sans font-bold text-xl text-forest-950">
              Photo de profil
            </h3>
            <p className="text-sm text-gray-500 max-w-xs">
              Ajoutez une photo claire pour renforcer la confiance avec la
              communauté Yaqin.
            </p>
          </div>
        </div>

        {/* Form Inputs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Prénom */}
          <div>
            <label className="block text-xs font-bold text-forest-900 tracking-wider mb-2">
              Prénom
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Votre prénom"
              className="w-full px-4 py-3 bg-[#faf8f3] border border-[#e8dfc8] rounded-2xl text-base text-gray-800 focus:outline-none focus:border-forest-600 focus:ring-1 focus:ring-forest-600 transition-all"
            />
          </div>

          {/* Nom */}
          <div>
            <label className="block text-xs font-bold text-forest-900 tracking-wider mb-2">
              Nom
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Votre nom"
              className="w-full px-4 py-3 bg-[#faf8f3] border border-[#e8dfc8] rounded-2xl text-base text-gray-800 focus:outline-none focus:border-forest-600 focus:ring-1 focus:ring-forest-600 transition-all"
            />
          </div>

          {/* Téléphone */}
          <div>
            <label className="block text-xs font-bold text-forest-900 tracking-wider mb-2">
              Numéro de téléphone
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
                <Phone size={18} />
              </span>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="06 00 00 00 00"
                className="w-full pl-11 pr-4 py-3 bg-[#faf8f3] border border-[#e8dfc8] rounded-2xl text-base text-gray-800 focus:outline-none focus:border-forest-600 focus:ring-1 focus:ring-forest-600 transition-all"
              />
            </div>
          </div>

          {/* Adresse */}
          <div>
            <label className="block text-xs font-bold text-forest-900 tracking-wider mb-2">
              Adresse
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
                <MapPin size={18} />
              </span>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Ex: N° 12, Quartier Riad"
                className="w-full pl-11 pr-4 py-3 bg-[#faf8f3] border border-[#e8dfc8] rounded-2xl text-base text-gray-800 focus:outline-none focus:border-forest-600 focus:ring-1 focus:ring-forest-600 transition-all"
              />
            </div>
          </div>

          {/* Ville */}
          <div>
            <label className="block text-xs font-bold text-forest-900 tracking-wider mb-2">
              Ville
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Ex: Casablanca"
              className="w-full px-4 py-3 bg-[#faf8f3] border border-[#e8dfc8] rounded-2xl text-base text-gray-800 focus:outline-none focus:border-forest-600 focus:ring-1 focus:ring-forest-600 transition-all"
            />
          </div>

          {/* Pays */}
          <div>
            <label className="block text-xs font-bold text-forest-900 tracking-wider mb-2">
              Pays
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
                <Globe size={18} />
              </span>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="Maroc"
                className="w-full pl-11 pr-4 py-3 bg-[#faf8f3] border border-[#e8dfc8] rounded-2xl text-base text-gray-800 focus:outline-none focus:border-forest-600 focus:ring-1 focus:ring-forest-600 transition-all"
              />
            </div>
          </div>

          {/* Field Dynamique: Zone d'intervention (Exclusivement pour PRESTATAIRE) */}
          {userRole === "PRESTATAIRE" && (
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-forest-900 tracking-wider mb-2 flex items-center gap-1.5">
                <Sparkles size={16} className="text-amber-600" />
                Zone d'intervention
              </label>
              <input
                type="text"
                name="interventionArea"
                value={formData.interventionArea}
                onChange={handleChange}
                placeholder="Ex: Maarif, Anfa, Gauthier, Ain Diab..."
                className="w-full px-4 py-3 bg-[#faf8f3] border border-[#e8dfc8] rounded-2xl text-base text-gray-800 focus:outline-none focus:border-forest-600 focus:ring-1 focus:ring-forest-600 transition-all"
              />
            </div>
          )}

          {/* Bio */}
          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-forest-900 tracking-wider mb-2">
              Bio / Présentation
            </label>
            <textarea
              name="bio"
              rows={3}
              value={formData.bio}
              onChange={handleChange}
              placeholder="Décrivez-vous en quelques lignes..."
              className="w-full px-4 py-3 bg-[#faf8f3] border border-[#e8dfc8] rounded-2xl text-base text-gray-800 focus:outline-none focus:border-forest-600 focus:ring-1 focus:ring-forest-600 transition-all resize-none"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-4 border-t border-cream-100">
          <button
            type="submit"
            className="px-8 py-3.5 bg-forest-900 hover:bg-forest-800 text-white font-semibold rounded-2xl shadow-sm active:scale-95 transition-all"
          >
            Enregistrer les modifications
          </button>
        </div>
      </form>
    </div>
  );
}

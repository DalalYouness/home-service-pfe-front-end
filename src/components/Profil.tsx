import {
  User,
  Phone,
  MapPin,
  Globe,
  Camera,
  Pencil,
  Mail,
  FileText,
  CheckCircle2,
} from "lucide-react";
import { useProfil } from "../hooks/useProfil";

export default function Profil() {
  const {
    isEditing,
    handleEdit,
    role,
    errors,
    formData,
    handleChange,
    handleSubmit,
  } = useProfil();

  return (
    <div className="w-full bg-white rounded-3xl overflow-hidden border border-[#e8dfc8] shadow-sm">
      {/* Header Banner & Avatar */}
      <div className="relative bg-gradient-to-b from-forest-900 to-forest-700 h-32 w-full flex justify-center">
        <div className="absolute -bottom-14 flex flex-col items-center">
          <div className="relative">
            <div className="w-28 h-28 rounded-full bg-[#faf8f3] border-4 border-white flex items-center justify-center overflow-hidden shadow-md">
              <span className="font-bold text-3xl text-forest-900">
                {formData.firstName
                  ? formData.firstName.charAt(0).toLowerCase()
                  : "y"}
              </span>
            </div>

            <button
              type="button"
              className="absolute bottom-0 right-0 bg-forest-900 hover:bg-forest-800 text-white p-2 rounded-full border-2 border-white cursor-pointer shadow-sm"
            >
              <Camera size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Profile Header Title */}
      <div className="pt-16 pb-6 text-center px-4 border-b border-[#f2ece1]">
        <p className="text-xs text-gray-400 mb-2">
          Cliquez sur l'appareil photo pour ajouter
        </p>
        <h2 className="text-2xl font-bold text-forest-950 tracking-tight">
          {formData.firstName || "---"}
        </h2>
        <p className="text-sm text-gray-500 flex items-center justify-center gap-1.5 mt-1">
          <Mail size={14} className="text-gray-400" />
          {formData.email || "---"}
        </p>
      </div>

      {/* Main Content */}
      <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-8">
        {/* Section Title & Action */}
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-forest-950">
            Informations personnelles
          </h3>

          <button
            onClick={handleEdit}
            type="button"
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#f5f0e5] hover:bg-[#ebe3d3] text-forest-900 font-medium text-sm rounded-xl transition-all cursor-pointer"
          >
            <Pencil size={15} />
            {isEditing ? "Annuler" : "Modifier"}
          </button>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Prénom */}
          <div className="bg-[#faf8f3] border border-[#e8dfc8] rounded-2xl p-3.5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#d8e5db] text-forest-900 flex items-center justify-center flex-shrink-0">
              <User size={18} />
            </div>
            <div className="w-full">
              <label
                htmlFor="firstName"
                className="block text-[10px] font-bold tracking-wider text-gray-400 uppercase cursor-pointer"
              >
                Prénom
              </label>
              <input
                id="firstName"
                type="text"
                value={formData.firstName || ""}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full text-sm font-bold text-gray-800 bg-transparent outline-none disabled:opacity-75"
              />
            </div>
          </div>

          {/* Nom */}
          <div className="bg-[#faf8f3] border border-[#e8dfc8] rounded-2xl p-3.5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#d8e5db] text-forest-900 flex items-center justify-center flex-shrink-0">
              <User size={18} />
            </div>
            <div className="w-full">
              <label
                htmlFor="lastName"
                className="block text-[10px] font-bold tracking-wider text-gray-400 uppercase cursor-pointer"
              >
                Nom
              </label>
              <input
                id="lastName"
                type="text"
                value={formData.lastName || ""}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full text-sm font-bold text-gray-800 bg-transparent outline-none disabled:opacity-75"
              />
            </div>
          </div>

          {/* Téléphone */}
          <div className="md:col-span-2 bg-[#faf8f3] border border-[#e8dfc8] rounded-2xl p-3.5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#d8e5db] text-forest-900 flex items-center justify-center flex-shrink-0">
              <Phone size={18} />
            </div>
            <div className="w-full">
              <label
                htmlFor="phoneNumber"
                className="block text-[10px] font-bold tracking-wider text-gray-400 uppercase cursor-pointer"
              >
                Téléphone
              </label>
              <input
                id="phoneNumber"
                type="tel"
                value={formData.phoneNumber || ""}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full text-sm font-bold text-gray-800 bg-transparent outline-none disabled:opacity-75"
              />
            </div>
          </div>

          {/* Adresse */}
          <div className="md:col-span-2 bg-[#faf8f3] border border-[#e8dfc8] rounded-2xl p-3.5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#d8e5db] text-forest-900 flex items-center justify-center flex-shrink-0">
              <MapPin size={18} />
            </div>
            <div className="w-full">
              <label
                htmlFor="address"
                className="block text-[10px] font-bold tracking-wider text-gray-400 uppercase cursor-pointer"
              >
                Adresse
              </label>
              <input
                id="address"
                type="text"
                value={formData.address || ""}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full text-sm font-bold text-gray-800 bg-transparent outline-none disabled:opacity-75"
              />
            </div>
          </div>

          {/* Ville */}
          <div className="bg-[#faf8f3] border border-[#e8dfc8] rounded-2xl p-3.5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#d8e5db] text-forest-900 flex items-center justify-center flex-shrink-0">
              <MapPin size={18} />
            </div>
            <div className="w-full">
              <label
                htmlFor="city"
                className="block text-[10px] font-bold tracking-wider text-gray-400 uppercase cursor-pointer"
              >
                Ville
              </label>
              <input
                id="city"
                type="text"
                value={formData.city || ""}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full text-sm font-bold text-gray-800 bg-transparent outline-none disabled:opacity-75"
              />
            </div>
          </div>

          {/* Zone d'intervention */}
          {role === "ROLE_PRESTATAIRE" && (
            <div className="bg-[#faf8f3] border border-[#e8dfc8] rounded-2xl p-3.5 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#d8e5db] text-forest-900 flex items-center justify-center flex-shrink-0">
                <MapPin size={18} />
              </div>
              <div className="w-full">
                <label
                  htmlFor="interventionArea"
                  className="block text-[10px] font-bold tracking-wider text-gray-400 uppercase cursor-pointer"
                >
                  Zone d'intervention
                </label>
                <input
                  id="interventionArea"
                  type="text"
                  value={formData.interventionArea || ""}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full text-sm font-bold text-gray-800 bg-transparent outline-none disabled:opacity-75"
                />
              </div>
            </div>
          )}

          {/* Pays */}
          <div className="bg-[#faf8f3] border border-[#e8dfc8] rounded-2xl p-3.5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#d8e5db] text-forest-900 flex items-center justify-center flex-shrink-0">
              <Globe size={18} />
            </div>
            <div className="w-full">
              <label
                htmlFor="country"
                className="block text-[10px] font-bold tracking-wider text-gray-400 uppercase cursor-pointer"
              >
                Pays
              </label>
              <input
                id="country"
                type="text"
                value={formData.country || ""}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full text-sm font-bold text-gray-800 bg-transparent outline-none disabled:opacity-75"
              />
            </div>
          </div>
        </div>

        {/* Bio Section */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center gap-2 text-xs font-bold text-gray-600 uppercase tracking-wider">
            <FileText size={16} className="text-forest-900" />
            <label htmlFor="bio" className="cursor-pointer">
              Bio
            </label>
          </div>

          <div className="bg-[#faf8f3] border border-[#e8dfc8] rounded-2xl p-4">
            <textarea
              id="bio"
              rows={3}
              value={formData.bio || ""}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full text-sm text-gray-700 leading-relaxed bg-transparent outline-none resize-none disabled:opacity-75"
            />
          </div>
        </div>

        {/* Submit Button */}
        {isEditing && (
          <div className="flex justify-end pt-4 border-t border-[#f2ece1]">
            <button
              type="submit"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-forest-900 hover:bg-forest-800 text-white font-medium text-xs sm:text-sm rounded-xl transition-all cursor-pointer shadow-md hover:shadow-lg"
            >
              <CheckCircle2 size={16} className="sm:w-[18px] sm:h-[18px]" />
              Enregistrer les modifications
            </button>
          </div>
        )}
      </form>
    </div>
  );
}

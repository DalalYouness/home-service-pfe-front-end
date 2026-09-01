import React, { useState } from "react";
import {
  X,
  User,
  Mail,
  Lock,
  Phone,
  Calendar,
  MapPin,
  Globe,
  Building,
  Eye,
  EyeOff,
  UserPlus,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import type { RegisterRequestDto } from "../types/register";
import { authService } from "../services/auth.service"; // استيراد الـ Service

interface AddAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitSuccess?: () => void;
}

export const AddAdminModal: React.FC<AddAdminModalProps> = ({
  isOpen,
  onClose,
  onSubmitSuccess,
}) => {
  // Initial Form State
  const initialFormData: RegisterRequestDto = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    birthDate: "",
    gender: "",
    address: "",
    country: "Maroc",
    city: "",
  };

  const [formData, setFormData] = useState<RegisterRequestDto>(initialFormData);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errorMsg) setErrorMsg(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      // 1. Appel d'API vers le Backend
      const response: any = await authService.createAdmin(formData);

      // 2. Récupération du message du Backend (ou message par défaut)
      const message = response?.message || "Administrateur créé avec succès.";
      setSuccessMsg(message);

      // 3. Vider le formulaire et notifier le composant parent
      setFormData(initialFormData);
      if (onSubmitSuccess) {
        onSubmitSuccess();
      }
    } catch (err: any) {
      // Extraction du message d'erreur depuis le Backend (Axios Response)
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Une erreur est survenue lors de la création.";
      setErrorMsg(message);
    } finally {
      setLoading(false);
    }
  };

  const resetAndClose = () => {
    setFormData(initialFormData);
    setErrorMsg(null);
    setSuccessMsg(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-card p-6 md:p-8 border border-cream-200 my-8 animate-in fade-in zoom-in-95 duration-150">
        {/* Close Button */}
        <button
          onClick={resetAndClose}
          className="absolute top-5 right-5 p-1.5 rounded-full text-gray-400 hover:bg-cream-50 hover:text-gray-600 transition-colors cursor-pointer"
          aria-label="Fermer"
        >
          <X size={20} />
        </button>

        {/* Header Title */}
        <div className="mb-6">
          <h1 className="font-sans font-bold text-2xl md:text-3xl text-forest-900 flex items-center gap-2">
            <UserPlus className="w-7 h-7 text-forest-800" />
            Ajouter un administrateur
          </h1>
          <p className="text-xs md:text-sm text-gray-500 mt-1">
            Remplissez les informations ci-dessous pour créer un compte
            administrateur.
          </p>
        </div>

        {/* Success Alert Banner */}
        {successMsg && (
          <div className="mb-5 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3 text-emerald-800">
            <CheckCircle2 size={20} className="shrink-0 text-emerald-600" />
            <span className="text-sm font-medium">{successMsg}</span>
          </div>
        )}

        {/* Error Alert Banner */}
        {errorMsg && (
          <div className="mb-5 p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-3 text-red-800">
            <AlertCircle size={20} className="shrink-0 text-red-600" />
            <span className="text-sm font-medium">{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Row 1: First Name & Last Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-forest-900 tracking-wider mb-1.5">
                Prénom
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400">
                  <User size={18} />
                </span>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="Ex: Abdelkader"
                  minLength={2}
                  maxLength={30}
                  required
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-[#faf8f3] border border-[#e8dfc8] rounded-2xl focus:outline-none focus:border-forest-500 focus:ring-1 focus:ring-forest-500 text-gray-700 placeholder-gray-400 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-forest-900 tracking-wider mb-1.5">
                Nom
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400">
                  <User size={18} />
                </span>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Ex: Dalal"
                  minLength={2}
                  maxLength={30}
                  required
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-[#faf8f3] border border-[#e8dfc8] rounded-2xl focus:outline-none focus:border-forest-500 focus:ring-1 focus:ring-forest-500 text-gray-700 placeholder-gray-400 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Row 2: Email & Password */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-forest-900 tracking-wider mb-1.5">
                Adresse Email
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400">
                  <Mail size={18} />
                </span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="admin@exemple.com"
                  maxLength={50}
                  required
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-[#faf8f3] border border-[#e8dfc8] rounded-2xl focus:outline-none focus:border-forest-500 focus:ring-1 focus:ring-forest-500 text-gray-700 placeholder-gray-400 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-forest-900 tracking-wider mb-1.5">
                Mot de passe
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400">
                  <Lock size={18} />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-10 py-2.5 text-sm bg-[#faf8f3] border border-[#e8dfc8] rounded-2xl focus:outline-none focus:border-forest-500 focus:ring-1 focus:ring-forest-500 text-gray-700 placeholder-gray-400 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          </div>

          {/* Row 3: Phone Number & Birth Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-forest-900 tracking-wider mb-1.5">
                Téléphone
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400">
                  <Phone size={18} />
                </span>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="0612345678 ou +212612345678"
                  required
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-[#faf8f3] border border-[#e8dfc8] rounded-2xl focus:outline-none focus:border-forest-500 focus:ring-1 focus:ring-forest-500 text-gray-700 placeholder-gray-400 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-forest-900 tracking-wider mb-1.5">
                Date de naissance
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400">
                  <Calendar size={18} />
                </span>
                <input
                  type="date"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-[#faf8f3] border border-[#e8dfc8] rounded-2xl focus:outline-none focus:border-forest-500 focus:ring-1 focus:ring-forest-500 text-gray-700 placeholder-gray-400 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Row 4: Gender & Address */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-forest-900 tracking-wider mb-1.5">
                Genre
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2.5 text-sm bg-[#faf8f3] border border-[#e8dfc8] rounded-2xl focus:outline-none focus:border-forest-500 focus:ring-1 focus:ring-forest-500 text-gray-700 transition-all"
              >
                <option value="" disabled>
                  Sélectionner le genre
                </option>
                <option value="MALE">Homme (MALE)</option>
                <option value="FEMALE">Femme (FEMALE)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-forest-900 tracking-wider mb-1.5">
                Adresse
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400">
                  <MapPin size={18} />
                </span>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Ex: 123 Rue Hassan II"
                  minLength={5}
                  maxLength={150}
                  required
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-[#faf8f3] border border-[#e8dfc8] rounded-2xl focus:outline-none focus:border-forest-500 focus:ring-1 focus:ring-forest-500 text-gray-700 placeholder-gray-400 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Row 5: Country & City */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-forest-900 tracking-wider mb-1.5">
                Pays
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400">
                  <Globe size={18} />
                </span>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  placeholder="Ex: Maroc"
                  minLength={2}
                  maxLength={50}
                  required
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-[#faf8f3] border border-[#e8dfc8] rounded-2xl focus:outline-none focus:border-forest-500 focus:ring-1 focus:ring-forest-500 text-gray-700 placeholder-gray-400 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-forest-900 tracking-wider mb-1.5">
                Ville
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400">
                  <Building size={18} />
                </span>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="Ex: Casablanca"
                  minLength={2}
                  maxLength={50}
                  required
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-[#faf8f3] border border-[#e8dfc8] rounded-2xl focus:outline-none focus:border-forest-500 focus:ring-1 focus:ring-forest-500 text-gray-700 placeholder-gray-400 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Submit & Cancel Buttons */}
          <div className="pt-4 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={resetAndClose}
              className="px-5 py-2.5 rounded-2xl text-xs font-bold text-gray-600 hover:bg-gray-100 transition-all cursor-pointer"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 rounded-2xl text-xs font-semibold text-white bg-forest-900 hover:bg-forest-800 active:scale-[0.98] shadow-xs transition-all disabled:bg-forest-900/50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <span>Création...</span>
                </>
              ) : (
                "Créer l'administrateur"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAdminModal;

import React, { useState } from "react";
import { User, CheckCircle2, AlertCircle, ChevronDown } from "lucide-react";
import type {
  ChangeEmailErrors,
  ChangeEmailRequestDto,
} from "../types/changeEmail";
import type { AuthResponseDto } from "../types/auth";
import { profileService } from "../services/profile.service";
import { SessionExpiredModal } from "./SessionExpiredModal";

export const ProfilSection: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showNotFoundModal, setShowNotFoundModal] = useState(false);

  const [formData, setFormData] = useState<ChangeEmailRequestDto>({
    newEmail: "",
    currentPassword: "",
  });

  const [isSaving, setIsSaving] = useState(false);
  const [successMsg, setsuccessMsg] = useState("");
  const [errors, setErrors] = useState<ChangeEmailErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof ChangeEmailErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSessionCleanup = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setShowNotFoundModal(false);
  };

  const handleUpdateEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setsuccessMsg("");
    setErrors({});

    try {
      const response: AuthResponseDto =
        await profileService.changeEmail(formData);

      localStorage.setItem("token", response.token);
      const userDetails = {
        email: response.email,
        roles: response.roles,
        fullName: response.fullName,
      };
      localStorage.setItem("user", JSON.stringify(userDetails));

      setsuccessMsg(response.message);
      setFormData((prev) => ({ ...prev, currentPassword: "" }));
    } catch (err: any) {
      if (
        err.response &&
        (err.response.status === 404 || err.response.status === 401)
      ) {
        setShowNotFoundModal(true);
        return;
      }

      if (err.response && err.response.status === 400) {
        const errorMsg =
          err.response.data?.message || "Mot de passe incorrect.";
        setErrors({ currentPassword: errorMsg });
        return;
      }

      if (err.response && err.response.status === 409) {
        const storedUser = localStorage.getItem("user");
        const currentEmail = storedUser ? JSON.parse(storedUser).email : null;
        let errorMsg =
          err.response.data?.message || "Cet adresse email est déjà utilisée.";

        if (
          currentEmail &&
          formData.newEmail.trim().toLowerCase() ===
            currentEmail.trim().toLowerCase()
        ) {
          errorMsg = "C'est déjà votre adresse email actuelle.";
        }

        setErrors({ newEmail: errorMsg });
        return;
      }

      // i replace it with the toast window error
      // setErrors({
      //   global: "Une erreur inattendue est survenue. Veuillez réessayer.",
      // });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-white border rounded-2xl border-cream-200/60 shadow-sm transition-all duration-300 hover:shadow-md overflow-hidden">
      <SessionExpiredModal
        isOpen={showNotFoundModal}
        onClose={handleSessionCleanup}
      />
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="p-6 md:p-8 flex items-center justify-between cursor-pointer select-none hover:bg-cream-50/30 active:bg-cream-50/60 transition-all duration-200"
      >
        <div className="space-y-1">
          <h2 className="text-sm md:text-base font-bold text-forest-900 flex items-center gap-2">
            <User className="w-4 h-4 text-forest-700" />
            Mon Profil
          </h2>
          <p className="text-xs text-forest-500">
            Mettez à jour votre adresse email de connexion.
          </p>
        </div>
        <ChevronDown
          className={`w-5 h-5 text-forest-500 transition-transform duration-300 ${
            isOpen ? "rotate-180 text-forest-700" : ""
          }`}
        />
      </div>
      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          isOpen
            ? "max-h-[500px] opacity-100 border-t border-cream-100/50"
            : "max-h-0 opacity-0"
        }`}
      >
        <div className="p-6 md:p-8">
          <form onSubmit={handleUpdateEmail} className="space-y-4 w-full">
            {/* Global Error Alert */}
            {errors.global && (
              <div className="flex items-center gap-2 text-rose-600 bg-rose-500/10 border border-rose-500/20 px-4 py-2.5 rounded-xl text-xs">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errors.global}</span>
              </div>
            )}

            {/* New Email Input */}
            <div>
              <label className="block text-xs font-semibold text-forest-700  tracking-wider mb-2">
                Nouvelle adresse email
              </label>
              <input
                type="email"
                name="newEmail"
                value={formData.newEmail}
                onChange={handleChange}
                placeholder="votre.email@exemple.com"
                className={`w-full px-4 py-3 rounded-xl text-sm transition-all focus:outline-none focus:ring-1 text-forest-900 ${
                  errors.newEmail
                    ? "border-rose-500 bg-rose-500/5 focus:border-rose-500 focus:ring-rose-500"
                    : "bg-cream-50/50 border border-cream-200 focus:bg-white focus:border-forest-700 focus:ring-forest-700"
                }`}
                required
                maxLength={50}
              />

              {errors.newEmail && (
                <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1.5 animate-in fade-in slide-in-from-top-1 duration-150">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  {errors.newEmail}
                </p>
              )}
            </div>

            {/* Current Password Input */}
            <div>
              <label className="block text-xs font-semibold text-forest-700  tracking-wider mb-2">
                Mot de passe actuel
              </label>
              <input
                type="password"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                placeholder="Saisissez votre mot de passe pour confirmer"
                className={`w-full px-4 py-3 rounded-xl text-sm transition-all focus:outline-none focus:ring-1 text-forest-900 ${
                  errors.currentPassword
                    ? "border-rose-500 bg-rose-500/5 focus:border-rose-500 focus:ring-rose-500"
                    : "bg-cream-50/50 border border-cream-200 focus:bg-white focus:border-forest-700 focus:ring-forest-700"
                }`}
                required
              />

              {errors.currentPassword && (
                <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1.5 animate-in fade-in slide-in-from-top-1 duration-150">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  {errors.currentPassword}
                </p>
              )}
            </div>

            {/* Success Alert */}
            {successMsg && (
              <div className="flex items-center gap-2 text-forest-700 bg-forest-50/80 px-4 py-2.5 rounded-xl text-xs border border-forest-100">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={isSaving}
                className="px-5 py-2.5 bg-forest-700 hover:bg-forest-800 disabled:bg-forest-700/60 text-white rounded-xl text-xs font-bold transition-all shadow-sm"
              >
                {isSaving ? "Enregistrement..." : "Sauvegarder"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

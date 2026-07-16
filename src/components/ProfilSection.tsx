import React, { useState } from "react";
import { User, CheckCircle2, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type {
  ChangeEmailErrors,
  ChangeEmailRequestDto,
} from "../types/changeEmail";
import type { AuthResponseDto } from "../types/auth";
import { profileService } from "../services/profile.service";

export const ProfilSection: React.FC = () => {
  const navigate = useNavigate(); //  Initialize navigate

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
      // 👈 3. Blast l'catch: check specialized for UserNotFoundException (404)
      if (err.response && err.response.status === 404) {
        const errorMsg =
          err.response.data?.message || "Utilisateur non trouvé.";

        // A. Clean up dead session from localStorage
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        // B. Set global error so the component knows what went wrong
        setErrors({ global: errorMsg });

        // C. Show alert then Redirect to Login page "/" with the state message
        alert(`Session expirée: ${errorMsg}`); // A simple alert window to inform the user first
        navigate("/", { replace: true });
        return; // Stop execution
      }

      // TODO: We will handle other exceptions (InvalidPassword, EmailAlreadyExists) in the next steps!
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
      {/* Header and Info Section */}
      <div className="space-y-1">
        <h2 className="text-base font-bold text-forest-900 flex items-center gap-2">
          <User className="w-4 h-4 text-forest-700" />
          Mon Profil
        </h2>
        <p className="text-xs text-forest-500">
          Mettez à jour votre adresse email de connexion.
        </p>
      </div>

      {/* Form and Input Fields */}
      <div className="md:col-span-2">
        <form
          onSubmit={handleUpdateEmail}
          className="space-y-4 w-full max-w-xl"
        >
          {/* Global Error Alert */}
          {errors.global && (
            <div className="flex items-center gap-2 text-rose-600 bg-rose-500/10 border border-rose-500/20 px-4 py-2.5 rounded-xl text-xs">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errors.global}</span>
            </div>
          )}

          {/* New Email Input */}
          <div>
            <label className="block text-xs font-semibold text-forest-700 uppercase tracking-wider mb-2">
              Nouvelle adresse email
            </label>
            <input
              type="email"
              name="newEmail"
              value={formData.newEmail}
              onChange={handleChange}
              placeholder="votre.email@exemple.com"
              className="w-full px-4 py-3 bg-cream-50/50 border border-cream-200 rounded-xl focus:bg-white focus:outline-none focus:border-forest-700 focus:ring-1 focus:ring-forest-700 text-sm transition-all text-forest-900"
              required
              maxLength={50}
            />
          </div>

          {/* Current Password Input */}
          <div>
            <label className="block text-xs font-semibold text-forest-700 uppercase tracking-wider mb-2">
              Mot de passe actuel
            </label>
            <input
              type="password"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              placeholder="Saisissez votre mot de passe pour confirmer"
              className="w-full px-4 py-3 bg-cream-50/50 border border-cream-200 rounded-xl focus:bg-white focus:outline-none focus:border-forest-700 focus:ring-1 focus:ring-forest-700 text-sm transition-all text-forest-900"
              required
            />
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
  );
};

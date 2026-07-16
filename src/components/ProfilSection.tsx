import React, { useState } from "react";
import { User, CheckCircle2 } from "lucide-react";

export const ProfilSection: React.FC = () => {
  // 1. Data states (matches the ChangeEmailRequestDto structure)
  const [newEmail, setNewEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");

  // 2. UI/UX states for loading and user feedback
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  // 3. Mock submit handler to simulate API behavior
  const handleUpdateEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSuccess(false);

    // Simulate backend response delay
    setTimeout(() => {
      setIsSaving(false);
      setSuccess(true);
      setCurrentPassword(""); // Clear password field after success for security
    }, 1200);
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
          {/* New Email Input */}
          <div>
            <label className="block text-xs font-semibold text-forest-700 uppercase tracking-wider mb-2">
              Nouvelle adresse email
            </label>
            <input
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              placeholder="votre.email@exemple.com"
              className="w-full px-4 py-3 bg-cream-50/50 border border-cream-200 rounded-xl focus:bg-white focus:outline-none focus:border-forest-700 focus:ring-1 focus:ring-forest-700 text-sm transition-all text-forest-900"
              required
            />
          </div>

          {/* Current Password Input */}
          <div>
            <label className="block text-xs font-semibold text-forest-700 uppercase tracking-wider mb-2">
              Mot de passe actuel
            </label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Saisissez votre mot de passe pour confirmer"
              className="w-full px-4 py-3 bg-cream-50/50 border border-cream-200 rounded-xl focus:bg-white focus:outline-none focus:border-forest-700 focus:ring-1 focus:ring-forest-700 text-sm transition-all text-forest-900"
              required
            />
          </div>

          {/* Success Alert */}
          {success && (
            <div className="flex items-center gap-2 text-forest-700 bg-forest-50/80 px-4 py-2.5 rounded-xl text-xs border border-forest-100">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Votre adresse email a été modifiée avec succès.</span>
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

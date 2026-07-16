import React, { useState } from "react";
import { Lock, CheckCircle2 } from "lucide-react";

export const SecuriteSection: React.FC = () => {
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isSavingPassword, setIsSavingPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError("");
    setPasswordSuccess(false);

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError("Les nouveaux mots de passe ne correspondent pas.");
      return;
    }

    setIsSavingPassword(true);
    setTimeout(() => {
      setIsSavingPassword(false);
      setPasswordSuccess(true);
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    }, 1200);
  };

  return (
    <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
      <div className="space-y-1">
        <h2 className="text-base font-bold text-forest-900 flex items-center gap-2">
          <Lock className="w-4 h-4 text-forest-700" />
          Sécurité
        </h2>
        <p className="text-xs text-forest-500">
          Modifiez votre mot de passe pour sécuriser l'accès.
        </p>
      </div>

      <div className="md:col-span-2">
        <form
          onSubmit={handleUpdatePassword}
          className="space-y-4 w-full max-w-xl"
        >
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-xs font-semibold text-forest-700 uppercase tracking-wider mb-2">
                Mot de passe actuel
              </label>
              <input
                type="password"
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                className="w-full px-4 py-3 bg-cream-50/50 border border-cream-200 rounded-xl focus:bg-white focus:outline-none focus:border-forest-700 text-sm transition-all text-forest-900"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-forest-700 uppercase tracking-wider mb-2">
                  Nouveau mot de passe
                </label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-4 py-3 bg-cream-50/50 border border-cream-200 rounded-xl focus:bg-white focus:outline-none focus:border-forest-700 text-sm transition-all text-forest-900"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-forest-700 uppercase tracking-wider mb-2">
                  Confirmer le mot de passe
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-4 py-3 bg-cream-50/50 border border-cream-200 rounded-xl focus:bg-white focus:outline-none focus:border-forest-700 text-sm transition-all text-forest-900"
                  required
                />
              </div>
            </div>
          </div>

          {passwordError && (
            <div className="text-amber-600 text-xs font-semibold bg-amber-500/10 border border-amber-500/20 px-4 py-2.5 rounded-xl">
              {passwordError}
            </div>
          )}

          {passwordSuccess && (
            <div className="flex items-center gap-2 text-forest-700 bg-forest-50/80 px-4 py-2.5 rounded-xl text-xs border border-forest-100">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Votre mot de passe a été modifié avec succès.</span>
            </div>
          )}

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={isSavingPassword}
              className="px-5 py-2.5 bg-forest-700 hover:bg-forest-800 disabled:bg-forest-700/60 text-white rounded-xl text-xs font-bold transition-all shadow-sm"
            >
              {isSavingPassword
                ? "Modification..."
                : "Mettre à jour le mot de passe"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

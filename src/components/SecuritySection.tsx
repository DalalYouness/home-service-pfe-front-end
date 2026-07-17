import React, { useState } from "react";
import { Lock, CheckCircle2, ChevronDown, AlertCircle } from "lucide-react";

export const SecuritySection: React.FC = () => {
  // 1. Independent State control for this Accordion
  const [isOpen, setIsOpen] = useState(false);

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
    <div className="bg-white border rounded-2xl border-cream-200/60 shadow-sm transition-all duration-300 hover:shadow-md overflow-hidden">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="p-6 md:p-8 flex items-center justify-between cursor-pointer select-none hover:bg-cream-50/30 active:bg-cream-50/60 transition-all duration-200"
      >
        <div className="space-y-1">
          <h2 className="text-sm md:text-base font-bold text-forest-900 flex items-center gap-2">
            <Lock className="w-4 h-4 text-forest-700" />
            Sécurité
          </h2>
          <p className="text-xs text-forest-500">
            Modifiez votre mot de passe pour sécuriser l'accès.
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
          <form onSubmit={handleUpdatePassword} className="space-y-4 w-full">
            <div className="flex flex-col gap-4">
              {/* Current Password Input */}
              <div>
                <label className="block text-xs font-semibold text-forest-700 tracking-wider mb-2">
                  Mot de passe actuel
                </label>
                <input
                  type="password"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-4 py-3 bg-cream-50/50 border border-cream-200 rounded-xl focus:bg-white focus:outline-none focus:border-forest-700 text-sm transition-all text-forest-900 focus:ring-1 focus:ring-forest-700"
                  required
                />
              </div>

              {/* New Password Input */}
              <div>
                <label className="block text-xs font-semibold text-forest-700  tracking-wider mb-2">
                  Nouveau mot de passe
                </label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-4 py-3 bg-cream-50/50 border border-cream-200 rounded-xl focus:bg-white focus:outline-none focus:border-forest-700 text-sm transition-all text-forest-900 focus:ring-1 focus:ring-forest-700"
                  required
                />
              </div>

              {/* Confirm Password Input */}
              <div>
                <label className="block text-xs font-semibold text-forest-700  tracking-wider mb-2">
                  Confirmer le mot de passe
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-4 py-3 bg-cream-50/50 border border-cream-200 rounded-xl focus:bg-white focus:outline-none focus:border-forest-700 text-sm transition-all text-forest-900 focus:ring-1 focus:ring-forest-700"
                  required
                />
              </div>
            </div>

            {/* Error Alert */}
            {passwordError && (
              <div className="flex items-center gap-2 text-rose-600 bg-rose-500/10 border border-rose-500/20 px-4 py-2.5 rounded-xl text-xs">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{passwordError}</span>
              </div>
            )}

            {/* Success Alert */}
            {passwordSuccess && (
              <div className="flex items-center gap-2 text-forest-700 bg-forest-50/80 px-4 py-2.5 rounded-xl text-xs border border-forest-100">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Votre mot de passe a été modifié avec succès.</span>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={isSavingPassword}
                className="px-5 py-2.5 bg-forest-700 hover:bg-forest-800 disabled:bg-forest-700/60 text-white rounded-xl text-xs font-bold transition-all shadow-sm"
              >
                {isSavingPassword ? "Modification..." : "Mettre à jour"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

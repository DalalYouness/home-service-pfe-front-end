import React, { useState } from "react";
import { User, CheckCircle2 } from "lucide-react";

export const ProfilSection: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isSavingName, setIsSavingName] = useState(false);
  const [nameSuccess, setNameSuccess] = useState(false);

  const handleUpdateName = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingName(true);
    setNameSuccess(false);
    setTimeout(() => {
      setIsSavingName(false);
      setNameSuccess(true);
    }, 1200);
  };

  return (
    <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
      <div className="space-y-1">
        <h2 className="text-base font-bold text-forest-900 flex items-center gap-2">
          <User className="w-4 h-4 text-forest-700" />
          Mon Profil
        </h2>
        <p className="text-xs text-forest-500">
          Vos informations personnelles publiques.
        </p>
      </div>

      <div className="md:col-span-2">
        <form onSubmit={handleUpdateName} className="space-y-4 w-full max-w-xl">
          <div>
            <label className="block text-xs font-semibold text-forest-700 uppercase tracking-wider mb-2">
              Nom d'utilisateur
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-cream-50/50 border border-cream-200 rounded-xl focus:bg-white focus:outline-none focus:border-forest-700 focus:ring-1 focus:ring-forest-700 text-sm transition-all text-forest-900"
              required
            />
          </div>

          {nameSuccess && (
            <div className="flex items-center gap-2 text-forest-700 bg-forest-50/80 px-4 py-2.5 rounded-xl text-xs border border-forest-100">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Votre nom d'utilisateur a été mis à jour.</span>
            </div>
          )}

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={isSavingName}
              className="px-5 py-2.5 bg-forest-700 hover:bg-forest-800 disabled:bg-forest-700/60 text-white rounded-xl text-xs font-bold transition-all shadow-sm"
            >
              {isSavingName ? "Enregistrement..." : "Sauvegarder"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  KeyRound,
  Trash2,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

export const MonCompte: React.FC = () => {
  const navigate = useNavigate();

  // ==========================================
  // 1️⃣ STATES & HANDLERS: Modifier le nom
  // ==========================================
  const [username, setUsername] = useState("Youness"); // الاسم الحالي جاي مثلا من الـ Context أو API
  const [isSavingName, setIsSavingName] = useState(false);
  const [nameSuccess, setNameSuccess] = useState(false);

  const handleUpdateName = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingName(true);
    setNameSuccess(false);

    // محاكاة لـ API Call (مثلا كياخد ثانيتين)
    setTimeout(() => {
      setIsSavingName(false);
      setNameSuccess(true);
      // هنا كتصيفط لـ Backend: axios.put('/api/user/update-name', { username })
    }, 1500);
  };

  // ==========================================
  // 2️⃣ STATES & HANDLERS: Modifier le mot de passe
  // ==========================================
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isSavingPassword, setIsSavingPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError("");
    setPasswordSuccess(false);

    // 🔴 Condition de validation (Naked Logic)
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError("Les nouveaux mots de passe ne correspondent pas.");
      return;
    }

    setIsSavingPassword(true);

    // محاكاة لـ API Call
    setTimeout(() => {
      setIsSavingPassword(false);
      setPasswordSuccess(true);
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    }, 1500);
  };

  // ==========================================
  // 3️⃣ STATES & HANDLERS: Supprimer le compte
  // ==========================================
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteAccount = () => {
    setIsDeleting(true);

    // محاكاة لـ API Call للحذف
    setTimeout(() => {
      // تنظيف الذاكرة وتوجيه اليوزر لبرا
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setIsDeleting(false);
      navigate("/");
    }, 2000);
  };

  return (
    <div className="space-y-8 max-w-3xl">
      {/* العنوان الرئيسي للمكتب */}
      <div>
        <h1 className="text-2xl font-bold text-emerald-950">Mon Compte</h1>
        <p className="text-sm text-gray-500">
          Gérez vos informations personnelles et la sécurité de votre compte.
        </p>
      </div>

      {/* ==========================================
          SECTION 1: MODIFIER LE NOM D'UTILISATEUR
         ========================================== */}
      <section className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-emerald-50 text-emerald-800 rounded-lg">
            <User className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-semibold text-emerald-950">
            Informations du profil
          </h2>
        </div>

        <form onSubmit={handleUpdateName} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Nom d'utilisateur
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full max-w-md px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-800 text-sm transition-all"
              required
            />
          </div>

          {/* Condition output msg */}
          {nameSuccess && (
            <div className="flex items-center gap-2 text-emerald-700 text-sm">
              <CheckCircle2 className="w-4 h-4" />
              <span>Nom d'utilisateur mis à jour avec succès.</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isSavingName}
            className="px-5 py-2.5 bg-emerald-800 hover:bg-emerald-900 disabled:bg-emerald-800/60 text-white rounded-xl text-sm font-medium transition-all shadow-sm"
          >
            {isSavingName ? "Enregistrement..." : "Sauvegarder"}
          </button>
        </form>
      </section>

      {/* ==========================================
          SECTION 2: MODIFIER LE MOT DE PASSE
         ========================================== */}
      <section className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-amber-50 text-amber-800 rounded-lg">
            <KeyRound className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-semibold text-emerald-950">
            Sécurité du compte
          </h2>
        </div>

        <form onSubmit={handleUpdatePassword} className="space-y-4 max-w-md">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Mot de passe actuel
            </label>
            <input
              type="password"
              name="currentPassword"
              value={passwordData.currentPassword}
              onChange={handlePasswordChange}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-800 text-sm transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Nouveau mot de passe
            </label>
            <input
              type="password"
              name="newPassword"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-800 text-sm transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Confirmer le nouveau mot de passe
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={passwordData.confirmPassword}
              onChange={handlePasswordChange}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-800 text-sm transition-all"
              required
            />
          </div>

          {/* Condition messages */}
          {passwordError && (
            <div className="text-red-600 text-xs font-medium">
              {passwordError}
            </div>
          )}
          {passwordSuccess && (
            <div className="flex items-center gap-2 text-emerald-700 text-sm">
              <CheckCircle2 className="w-4 h-4" />
              <span>Mot de passe modifié avec succès.</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isSavingPassword}
            className="px-5 py-2.5 bg-emerald-800 hover:bg-emerald-900 disabled:bg-emerald-800/60 text-white rounded-xl text-sm font-medium transition-all shadow-sm"
          >
            {isSavingPassword ? "Modification..." : "Modifier le mot de passe"}
          </button>
        </form>
      </section>

      {/* ==========================================
          SECTION 3: SUPPRIMER LE COMPTE (Espace Danger 🛑)
         ========================================== */}
      <section className="bg-red-50/30 border border-red-100 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-red-50 text-red-700 rounded-lg">
            <Trash2 className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-semibold text-red-950">Zone de danger</h2>
        </div>

        <p className="text-sm text-red-900/70 mb-6">
          Une fois que vous supprimez votre compte, il n'y a pas de retour en
          arrière. Veuillez être sûr de votre décision.
        </p>

        {/* الـ Logic التفاعلي ديال الحذف للتأكيد */}
        {!isDeleteConfirmOpen ? (
          <button
            onClick={() => setIsDeleteConfirmOpen(true)}
            className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm font-medium transition-all shadow-sm"
          >
            Supprimer mon compte...
          </button>
        ) : (
          <div className="border border-red-200 bg-white p-4 rounded-xl max-w-md animate-in fade-in duration-200">
            <div className="flex gap-3 items-start mb-4">
              <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-red-950">
                  Confirmation de suppression
                </h4>
                <p className="text-xs text-gray-500 mt-1">
                  Êtes-vous sûr de vouloir supprimer définitivement votre compte
                  ?
                </p>
              </div>
            </div>

            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setIsDeleteConfirmOpen(false)}
                disabled={isDeleting}
                className="px-4 py-2 border border-gray-200 rounded-lg text-xs font-medium text-gray-600 hover:bg-gray-50 transition-all"
              >
                Annuler
              </button>
              <button
                onClick={handleDeleteAccount}
                disabled={isDeleting}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-red-600/60 text-white rounded-lg text-xs font-medium transition-all"
              >
                {isDeleting
                  ? "Suppression en cours..."
                  : "Oui, supprimer définitivement"}
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

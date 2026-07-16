import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Lock,
  UserX,
  AlertTriangle,
  CheckCircle2,
  Loader2,
} from "lucide-react";

export const MonCompte: React.FC = () => {
  const navigate = useNavigate();

  // ==========================================
  // 1️⃣ STATE: Mon Profil
  // ==========================================
  const [username, setUsername] = useState("Youness");
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

  // ==========================================
  // 2️⃣ STATE: Sécurité
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

  // ==========================================
  // 3️⃣ STATE: Suppression du compte
  // ==========================================
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteAccount = () => {
    setIsDeleting(true);
    setTimeout(() => {
      localStorage.clear();
      navigate("/");
    }, 1500);
  };

  return (
    <div className="w-full space-y-8 py-4 pb-16 font-sans">
      {/* ─── الـ Header الرئيسي ─── */}
      <div className="w-full">
        <h1 className="text-2xl font-bold text-forest-900 tracking-tight">
          Paramètres du compte
        </h1>
        <p className="text-sm text-forest-700/70 mt-1">
          Mettez à jour vos informations et configure la sécurité de votre
          compte.
        </p>
      </div>

      {/* الكارتة الكبيرة شادة العرض كامل w-full */}
      <div className="w-full bg-white border border-cream-200 rounded-3xl shadow-card divide-y divide-cream-100 transition-all hover:shadow-card-hover">
        {/* ========================================================
            🟢 SECTION 1: MON PROFIL
           ======================================================== */}
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

          {/* md:col-span-2 كتاخد المساحة المتبقية كاملة */}
          <div className="md:col-span-2">
            {/* 🌟 الحل هنا: عطينا للـ Form حد أقصى max-w-xl باش ميتجبدش بزاف فـ الشاشات الكبيرة */}
            <form
              onSubmit={handleUpdateName}
              className="space-y-4 w-full max-w-xl"
            >
              <div>
                <label className="block text-xs font-semibold text-forest-700 uppercase tracking-wider mb-2">
                  Nom d'utilisateur
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
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

        {/* ========================================================
            🟡 SECTION 2: SÉCURITÉ
           ======================================================== */}
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
            {/* 🌟 نفس الشيء هنا: max-w-xl لضبط الحجم الإجمالي */}
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

        {/* ========================================================
            🔴 SECTION 3: SUPPRESSION DU COMPTE
           ======================================================== */}
        <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          <div className="space-y-1">
            <h2 className="text-base font-bold text-amber-600 flex items-center gap-2">
              <UserX className="w-4 h-4 text-amber-500" />
              Suppression du compte
            </h2>
            <p className="text-xs text-forest-500">
              Fermer définitivement votre compte.
            </p>
          </div>

          <div className="md:col-span-2">
            <div className="w-full max-w-xl space-y-4">
              <p className="text-xs text-forest-700/75 leading-relaxed">
                Cette action supprimera définitivement toutes vos données de nos
                serveurs. Vous ne pourrez plus récupérer vos informations.
              </p>

              {!isDeleteConfirmOpen ? (
                <button
                  onClick={() => setIsDeleteConfirmOpen(true)}
                  className="px-4 py-2.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 rounded-xl text-xs font-bold transition-all border border-amber-500/10"
                >
                  Supprimer le compte
                </button>
              ) : (
                <div className="border border-amber-500/20 bg-amber-500/5 p-5 rounded-2xl animate-in slide-in-from-top-2 duration-200 w-full">
                  <div className="flex gap-3 items-start mb-4">
                    <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-forest-900">
                        Confirmation requise
                      </h4>
                      <p className="text-[11px] text-forest-700/70 mt-1">
                        Êtes-vous sûr de vouloir supprimer définitivement votre
                        compte ?
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 justify-end">
                    <button
                      onClick={() => setIsDeleteConfirmOpen(false)}
                      disabled={isDeleting}
                      className="px-3.5 py-2 border border-cream-200 bg-white rounded-lg text-[11px] font-bold text-forest-700 hover:bg-cream-50 transition-all"
                    >
                      Annuler
                    </button>
                    <button
                      onClick={handleDeleteAccount}
                      disabled={isDeleting}
                      className="px-3.5 py-2 bg-amber-600 hover:bg-amber-500 disabled:bg-amber-600/60 text-white rounded-lg text-[11px] font-bold transition-all flex items-center gap-1.5"
                    >
                      {isDeleting && (
                        <Loader2 className="w-3 h-3 animate-spin" />
                      )}
                      {isDeleting ? "Suppression..." : "Oui, supprimer"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

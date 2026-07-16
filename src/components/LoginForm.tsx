import { useState } from "react";
import { X, Mail, Lock, Eye, EyeOff, AlertCircle } from "lucide-react";
// Importation du service d'authentification pour collaborer avec lui
import { authService } from "../services/auth.service";
import { Link } from "react-router-dom";

interface LoginFormProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (message: string, fullname: string) => void;
}

export default function LoginForm({
  isOpen,
  onClose,
  onLoginSuccess,
}: LoginFormProps) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  /*
   * État pour suivre le processus asynchrone (Pending) de la requête Axios.
   * Permet d'afficher un indicateur visuel (loading) à l'utilisateur.
   */
  const [isLoading, setIsLoading] = useState(false);

  /*
   * État pour mémoriser le message d'erreur si la promesse est rejetée (Rejected).
   * Permet d'alerter l'utilisateur et de colorer les champs en rouge.
   */
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [showPassword, setShowPassword] = useState(false);

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /*
   * Soumission du formulaire gérée de manière asynchrone.
   * Communique avec le service d'authentification et gère les états visuels.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Début du chargement : On passe à l'état 'Pending' et on réinitialise les erreurs précédentes
    setIsLoading(true);
    setErrorMsg(null);

    try {
      // 2. Appel asynchrone de l'API via notre service avec les données du formulaire (LoginRequestDto)
      const responseData = await authService.login(formData);

      localStorage.setItem("token", responseData.token);

      const userData = {
        email: responseData.email,
        roles: responseData.roles,
        fullname: responseData.fullName,
      };
      localStorage.setItem("user", JSON.stringify(userData));

      // 3. Si la promesse est résolue (Fulfilled/Success), on peut traiter le token et fermer le modal
      console.log(responseData);

      onLoginSuccess(
        responseData.message || "Connexion réussie.",
        userData.fullname,
      );

      // Fermeture du modal via le callback parent
      onClose();
    } catch (error) {
      // 4. Si la promesse échoue (Rejected), on extrait le message d'erreur de la réponse Axios
      console.error("Erreur d'authentification :", error);
      const backendMessage =
        error.response?.data?.message ||
        "Une erreur inattendue est survenue. Veuillez réessayer.";
      setErrorMsg(backendMessage);
    } finally {
      // 5. Dans tous les cas (Succès ou Échec), le traitement est terminé : on arrête le chargement
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      ...formData,
      email: "",
      password: "",
    });
  };

  const handleClose = () => {
    onClose();
    setErrorMsg(null);
    resetForm();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-card p-8 border border-cream-200">
        {/*clode button*/}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 p-1.5 rounded-full text-gray-400 hover:bg-cream-50 hover:text-gray-600 transition-colors"
          aria-label="Fermer"
        >
          <X size={20} />
        </button>

        {/* Title */}
        <div className="mb-8">
          <h1 className="font-sans font-bold text-3xl">Bienvenue</h1>
        </div>

        {/*
         * Affichage dynamique d'un bandeau d'erreur général
         * si la mémoire 'errorMsg' contient une erreur du serveur.
         */}
        {/*
         * Affichage dynamique d'un bandeau d'erreur stylisé (avec icône)
         * si la mémoire 'errorMsg' contient une erreur du serveur.
         */}
        {errorMsg && (
          <div className="mb-5 p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-3 text-red-800">
            {/* Icône d'alerte rouge importée de lucide-react */}
            <AlertCircle size={20} className="shrink-0 text-red-600" />
            <span className="text-sm font-medium">{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/*email field*/}
          <div>
            <label className="block text-xs font-bold text-forest-900 uppercase tracking-wider mb-2">
              Adresse Email
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
                <Mail size={18} />
              </span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                /*
                 * Coloration dynamique de la bordure et du fond en cas d'erreur
                 * pour signaler visuellement le problème à l'utilisateur.
                 */
                className={`w-full pl-11 pr-4 py-3 text-base rounded-2xl focus:outline-none focus:ring-1 transition-all ${
                  errorMsg
                    ? "bg-red-50/50 border border-red-300 focus:border-red-500 focus:ring-red-500 text-red-900"
                    : "bg-[#faf8f3] border border-[#e8dfc8] focus:border-forest-500 focus:ring-forest-500 text-gray-700 placeholder-gray-400"
                }`}
                placeholder="dalal@exemple.com"
                required
              />
            </div>
          </div>

          {/*pwd field*/}
          <div>
            <label className="block text-xs font-bold text-forest-900 uppercase tracking-wider mb-2">
              Mot de passe
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
                <Lock size={18} />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                /*
                 * Même logique de coloration dynamique d'erreur pour le mot de passe.
                 */
                className={`w-full pl-11 pr-12 py-3 text-base rounded-2xl focus:outline-none focus:ring-1 tracking-wide transition-all ${
                  errorMsg
                    ? "bg-red-50/50 border border-red-300 focus:border-red-500 focus:ring-red-500 text-red-900"
                    : "bg-[#faf8f3] border border-[#e8dfc8] focus:border-forest-500 focus:ring-forest-500 text-gray-700 placeholder-gray-400"
                }`}
                placeholder="Password@123"
                required
              />
              {/*button show/hide Eye*/}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/*forget password button*/}
          <div className="text-right">
            <a
              href="#forgot-password"
              className="text-sm font-medium text-forest-700 hover:text-forest-900 hover:underline transition-colors"
            >
              Mot de passe oublié ?
            </a>
          </div>

          {/* submit button */}
          {/*
           * Bouton de soumission qui réagit dynamiquement à l'état isLoading :
           * - Désactivé (disabled) pendant la requête pour éviter les doubles clics.
           * - Affiche un indicateur de chargement stylisé à la place du texte habituel.
           */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 mt-2 text-base font-semibold text-white bg-forest-900 hover:bg-forest-800 active:scale-[0.98] rounded-2xl shadow-sm transition-all disabled:bg-forest-900/50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
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
                <span>Connexion en cours...</span>
              </>
            ) : (
              "Se connecter"
            )}
          </button>
        </form>

        {/*register si vous n'avez pas encore un compte*/}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Pas encore de compte ?{" "}
            <Link
              to={"/register"}
              className="font-bold text-forest-700 hover:text-forest-900 hover:underline transition-colors"
            >
              Créer un compte
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

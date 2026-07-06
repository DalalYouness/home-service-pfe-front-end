import { useState, useEffect, useCallback, useRef } from "react";
import {
  X,
  Eye,
  EyeOff,
  User,
  Mail,
  Lock,
  Phone,
  Calendar,
  MapPin,
  Globe,
  Building2,
  ChevronRight,
  ChevronLeft,
  Check,
  CheckCircle2,
} from "lucide-react";
import Logo from "./Logo";
import SearchableSelect from "./SearchableSelect";
import LoginSuccessModal from "./LoginSuccessModal";

/* ─── Types ─────────────────────────────────────────────────────────── */
interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  birthDate: string;
  gender: string;
  address: string;
  country: string;
  city: string;
}
type RErrors = Partial<Record<keyof RegisterData, string>>;

/* ─── Validators ─────────────────────────────────────────────────────── */
const V: Record<keyof RegisterData, (v: string) => string | null> = {
  firstName: (v) => {
    if (!v.trim()) return "Le prénom est obligatoire";
    if (v.trim().length < 2 || v.trim().length > 30)
      return "Entre 2 et 30 caractères";
    return null;
  },
  lastName: (v) => {
    if (!v.trim()) return "Le nom est obligatoire";
    if (v.trim().length < 2 || v.trim().length > 30)
      return "Entre 2 et 30 caractères";
    return null;
  },
  email: (v) => {
    if (!v.trim()) return "L'adresse email est obligatoire";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return "Format d'email invalide";
    if (v.length > 50) return "Maximum 50 caractères";
    return null;
  },
  password: (v) => {
    if (!v) return "Le mot de passe est obligatoire";
    if (v.length < 8) return "Minimum 8 caractères requis";
    if (!/[A-Z]/.test(v)) return "Au moins une lettre majuscule requise";
    if (!/[a-z]/.test(v)) return "Au moins une lettre minuscule requise";
    if (!/[0-9]/.test(v)) return "Au moins un chiffre requis";
    if (!/[@#$%^&+=!]/.test(v))
      return "Au moins un caractère spécial (@#$%^&+=!) requis";
    if (v.length > 30) return "Maximum 30 caractères";
    return null;
  },
  phoneNumber: (v) => {
    if (!v.trim()) return "Le numéro de téléphone est obligatoire";
    if (!/^(\+212|0)([5-7])\d{8}$/.test(v))
      return "Format marocain requis (ex : 0612345678)";
    return null;
  },
  birthDate: (v) => {
    if (!v) return "La date de naissance est obligatoire";
    if (new Date(v) >= new Date()) return "La date doit être dans le passé";
    return null;
  },
  gender: (v) => (!v ? "Le genre est obligatoire" : null),
  address: (v) => {
    if (!v.trim()) return "L'adresse est obligatoire";
    if (v.trim().length < 5 || v.trim().length > 150)
      return "Entre 5 et 150 caractères";
    return null;
  },
  country: (v) => {
    if (!v.trim()) return "Le pays est obligatoire";
    if (v.trim().length < 2 || v.trim().length > 50)
      return "Entre 2 et 50 caractères";
    return null;
  },
  city: (v) => {
    if (!v.trim()) return "La ville est obligatoire";
    if (v.trim().length < 2 || v.trim().length > 50)
      return "Entre 2 et 50 caractères";
    return null;
  },
};

const STEP_FIELDS: (keyof RegisterData)[][] = [
  ["firstName", "lastName", "email", "password"],
  ["phoneNumber", "birthDate", "gender"],
  ["address", "country", "city"],
];

const STEP_LABELS = ["Identité", "Coordonnées", "Localisation"];

/* ─── Password strength ──────────────────────────────────────────────── */
function pwStrength(p: string) {
  let s = 0;
  if (p.length >= 8) s++;
  if (/[a-z]/.test(p)) s++;
  if (/[A-Z]/.test(p)) s++;
  if (/[0-9]/.test(p)) s++;
  if (/[@#$%^&+=!]/.test(p)) s++;
  return s;
}
const STRENGTH_LABEL = [
  "",
  "Très faible",
  "Faible",
  "Moyen",
  "Fort",
  "Très fort",
];
const STRENGTH_COLOR = [
  "",
  "#ef4444",
  "#f97316",
  "#eab308",
  "#22c55e",
  "#16a34a",
];

/* ─── Field wrapper ──────────────────────────────────────────────────── */
interface FieldProps {
  label: string;
  icon?: React.ReactNode;
  error?: string;
  children: React.ReactNode;
  hint?: string;
}
function Field({ label, icon, error, children, hint }: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[12px] font-semibold text-gray-600 uppercase tracking-wide">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none z-10">
            {icon}
          </span>
        )}
        {children}
      </div>
      {hint && !error && <p className="text-[11px] text-gray-400">{hint}</p>}
      {error && (
        <p className="text-[11px] text-red-500 flex items-center gap-1 animate-shake">
          <span className="inline-block w-1 h-1 rounded-full bg-red-500 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}

const inputCls = (error?: string) =>
  `w-full pl-10 pr-4 py-3 text-[14px] text-gray-800 bg-[#faf8f4] border rounded-xl outline-none transition-all duration-200 placeholder-gray-400
  focus:bg-white focus:border-forest-700 focus:ring-2 focus:ring-forest-700/10
  ${error ? "border-red-400 bg-red-50/30" : "border-[#e0d8c4] hover:border-[#c8bfad]"}`;

/* ─── Main component ─────────────────────────────────────────────────── */
interface AuthModalProps {
  onClose: () => void;
  onLoginSuccess?: (user: {
    firstName: string;
    lastName: string;
    email: string;
  }) => void;
}

export default function AuthModal({ onClose, onLoginSuccess }: AuthModalProps) {
  const [mode, setMode] = useState<"login" | "register">("register");
  const [step, setStep] = useState(1);
  const [phase, setPhase] = useState<"shown" | "hiding" | "entering">("shown");
  const [slideDir, setSlideDir] = useState<1 | -1>(1);
  const [showPw, setShowPw] = useState(false);
  const [showLoginPw, setShowLoginPw] = useState(false);
  const [success, setSuccess] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  /* Country / city data */
  const [countries, setCountries] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [loadingCountries, setLoadingCountries] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);

  const [form, setForm] = useState<RegisterData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    birthDate: "",
    gender: "",
    address: "",
    country: "",
    city: "",
  });
  const [errors, setErrors] = useState<RErrors>({});
  const [touched, setTouched] = useState(new Set<keyof RegisterData>());

  const [login, setLogin] = useState({ email: "", password: "" });
  const [loginErr, setLoginErr] = useState<{
    email?: string;
    password?: string;
  }>({});

  /* Entrance animation */
  useEffect(() => {
    requestAnimationFrame(() => setModalVisible(true));
  }, []);

  /* Load countries from REST Countries API */
  useEffect(() => {
    setLoadingCountries(true);
    fetch("https://restcountries.com/v3.1/all?fields=name")
      .then((r) => r.json())
      .then((data: { name: { common: string } }[]) => {
        const sorted = data
          .map((c) => c.name.common)
          .sort((a, b) => a.localeCompare(b, "fr"));
        // Put Morocco first
        const mo = sorted.filter((c) => c === "Morocco" || c === "Maroc");
        const rest = sorted.filter((c) => c !== "Morocco" && c !== "Maroc");
        setCountries([...mo, ...rest]);
      })
      .catch(() => {
        // Fallback static list
        setCountries([
          "Maroc",
          "Algérie",
          "Tunisie",
          "France",
          "Belgique",
          "Suisse",
          "Canada",
          "Sénégal",
          "Côte d'Ivoire",
          "Mauritanie",
          "Égypte",
          "Espagne",
          "Allemagne",
          "Italie",
          "Royaume-Uni",
          "Portugal",
          "États-Unis",
          "Brésil",
          "Mexique",
          "Arabie saoudite",
          "Émirats arabes unis",
          "Qatar",
          "Turquie",
          "Russie",
          "Chine",
          "Japon",
        ]);
      })
      .finally(() => setLoadingCountries(false));
  }, []);

  /* Load cities when country changes */
  useEffect(() => {
    if (!form.country) {
      setCities([]);
      return;
    }
    setLoadingCities(true);
    setCities([]);
    fetch("https://countriesnow.space/api/v0.1/countries/cities", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ country: form.country }),
    })
      .then((r) => r.json())
      .then((data: { data?: string[]; error?: boolean }) => {
        if (!data.error && Array.isArray(data.data)) {
          setCities(data.data.sort((a, b) => a.localeCompare(b, "fr")));
        } else {
          setCities([]);
        }
      })
      .catch(() => setCities([]))
      .finally(() => setLoadingCities(false));
  }, [form.country]);

  const close = () => {
    setModalVisible(false);
    setTimeout(onClose, 280);
  };

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", fn);
    return () => document.removeEventListener("keydown", fn);
  }, []);

  /* Step animation */
  const navigateTo = useCallback(
    (next: number) => {
      const dir: 1 | -1 = next > step ? 1 : -1;
      setSlideDir(dir);
      setPhase("hiding");
      setTimeout(() => {
        setStep(next);
        setPhase("entering");
        requestAnimationFrame(() =>
          requestAnimationFrame(() => setPhase("shown")),
        );
      }, 200);
    },
    [step],
  );

  const contentStyle: React.CSSProperties = {
    opacity: phase === "shown" ? 1 : 0,
    transform:
      phase === "hiding"
        ? `translateX(${slideDir * -18}px)`
        : phase === "entering"
          ? `translateX(${slideDir * 18}px)`
          : "translateX(0)",
    transition:
      phase === "entering" ? "none" : "opacity 0.2s ease, transform 0.2s ease",
  };

  /* Field helpers */
  const set = (field: keyof RegisterData, value: string) => {
    setForm((p) => ({ ...p, [field]: value }));
    if (touched.has(field)) {
      const err = V[field](value);
      setErrors((p) => ({ ...p, [field]: err ?? undefined }));
    }
  };

  const setCountryField = (value: string) => {
    setForm((p) => ({ ...p, country: value, city: "" }));
    setErrors((p) => ({ ...p, country: undefined, city: undefined }));
    if (touched.has("country")) {
      const err = V.country(value);
      setErrors((p) => ({ ...p, country: err ?? undefined }));
    }
  };

  const blur = (field: keyof RegisterData) => {
    setTouched((p) => new Set(p).add(field));
    const err = V[field](form[field]);
    setErrors((p) => ({ ...p, [field]: err ?? undefined }));
  };

  const validateStep = (s: number) => {
    const fields = STEP_FIELDS[s - 1];
    const newErr: RErrors = {};
    const newTouched = new Set(touched);
    let ok = true;
    fields.forEach((f) => {
      newTouched.add(f);
      const e = V[f](form[f]);
      if (e) {
        newErr[f] = e;
        ok = false;
      }
    });
    setTouched(newTouched);
    setErrors((p) => ({ ...p, ...newErr }));
    return ok;
  };

  const handleNext = () => {
    if (validateStep(step)) navigateTo(step + 1);
  };
  const handleBack = () => navigateTo(step - 1);
  const handleSubmit = () => {
    if (validateStep(3)) setSuccess(true);
  };

  const [loginSuccess, setLoginSuccess] = useState(false);

  const handleLogin = () => {
    const e: typeof loginErr = {};
    if (!login.email.trim()) e.email = "L'email est obligatoire";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(login.email))
      e.email = "Format email invalide";
    if (!login.password) e.password = "Le mot de passe est obligatoire";
    setLoginErr(e);
    if (Object.keys(e).length === 0) {
      setLoginSuccess(true);
    }
  };

  const switchMode = (m: "login" | "register") => {
    setMode(m);
    setStep(1);
    setPhase("shown");
    setErrors({});
    setTouched(new Set());
  };

  const strength = pwStrength(form.password);

  /* ── Success screen ───────────────────────────────────────────── */
  if (success) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          style={{
            opacity: modalVisible ? 1 : 0,
            transition: "opacity 0.28s ease",
          }}
          onClick={close}
        />
        <div
          className="relative bg-white rounded-3xl shadow-2xl p-10 max-w-sm w-full text-center"
          style={{
            opacity: modalVisible ? 1 : 0,
            transform: modalVisible
              ? "scale(1) translateY(0)"
              : "scale(0.94) translateY(20px)",
            transition: "all 0.28s cubic-bezier(0.34,1.3,0.64,1)",
          }}
        >
          <div className="w-16 h-16 rounded-2xl bg-forest-800 flex items-center justify-center mx-auto mb-5">
            <CheckCircle2 size={30} className="text-white" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-[#1a1208] mb-2">
            Compte créé !
          </h2>
          <p className="text-[14px] text-gray-600 mb-7 leading-relaxed">
            Bienvenue sur dalyoo, <strong>{form.firstName}</strong>.<br />
            Votre compte a été créé avec succès.
          </p>
          <button
            onClick={close}
            className="w-full py-3 rounded-xl bg-forest-800 text-white font-semibold text-sm hover:bg-forest-900 transition-colors"
          >
            Commencer
          </button>
        </div>
      </div>
    );
  }

  /* ── Main modal ───────────────────────────────────────────────── */
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        style={{
          opacity: modalVisible ? 1 : 0,
          transition: "opacity 0.28s ease",
        }}
        onClick={close}
      />

      <div
        className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md max-h-[92vh] overflow-y-auto"
        style={{
          opacity: modalVisible ? 1 : 0,
          transform: modalVisible
            ? "scale(1) translateY(0)"
            : "scale(0.94) translateY(24px)",
          transition: "all 0.3s cubic-bezier(0.34,1.1,0.64,1)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white z-10 px-7 pt-6 pb-0 rounded-t-3xl">
          <div className="flex items-center justify-between mb-5">
            <Logo size="sm" />
            <button
              onClick={close}
              className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
            >
              <X size={16} className="text-gray-600" />
            </button>
          </div>

          {/* Mode tabs */}
          <div className="flex bg-[#f5f0e6] rounded-xl p-1 mb-6">
            {(["login", "register"] as const).map((m) => (
              <button
                key={m}
                onClick={() => switchMode(m)}
                className="flex-1 py-2.5 text-[13px] font-semibold rounded-lg transition-all duration-200"
                style={{
                  backgroundColor: mode === m ? "#1e3d2d" : "transparent",
                  color: mode === m ? "#fff" : "#6b7280",
                }}
              >
                {m === "login" ? "Se connecter" : "Créer un compte"}
              </button>
            ))}
          </div>

          {/* Step indicator */}
          {mode === "register" && (
            <div className="flex items-center justify-between mb-6">
              {STEP_LABELS.map((label, i) => {
                const sNum = i + 1;
                const done = sNum < step;
                const active = sNum === step;
                return (
                  <div key={label} className="flex items-center gap-2 flex-1">
                    <div className="flex flex-col items-center gap-1">
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold transition-all duration-300"
                        style={{
                          backgroundColor:
                            done || active ? "#1e3d2d" : "#e5ddd0",
                          color: done || active ? "#fff" : "#9ca3af",
                          boxShadow: active
                            ? "0 0 0 4px rgba(30,61,45,0.12)"
                            : "none",
                        }}
                      >
                        {done ? <Check size={12} /> : sNum}
                      </div>
                      <span
                        className="text-[10px] font-semibold transition-colors duration-200"
                        style={{
                          color: active
                            ? "#1e3d2d"
                            : done
                              ? "#4a7c64"
                              : "#9ca3af",
                        }}
                      >
                        {label}
                      </span>
                    </div>
                    {i < 2 && (
                      <div
                        className="flex-1 h-px mx-1 mb-3 transition-colors duration-300"
                        style={{
                          backgroundColor: done ? "#1e3d2d" : "#e5ddd0",
                        }}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Body */}
        <div className="px-7 pb-7">
          {/* ── LOGIN ── */}
          {mode === "login" && (
            <div className="flex flex-col gap-4">
              <div className="mb-1">
                <h2 className="font-serif text-2xl font-bold text-[#1a1208]">
                  Bon retour !
                </h2>
                <p className="text-[13px] text-gray-500 mt-1">
                  Connectez-vous à votre espace dalyoo
                </p>
              </div>

              <Field
                label="Adresse email"
                icon={<Mail size={15} />}
                error={loginErr.email}
              >
                <input
                  type="email"
                  value={login.email}
                  onChange={(e) =>
                    setLogin((p) => ({ ...p, email: e.target.value }))
                  }
                  onBlur={() => {
                    const e: typeof loginErr = {};
                    if (!login.email.trim())
                      e.email = "L'email est obligatoire";
                    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(login.email))
                      e.email = "Format email invalide";
                    setLoginErr((p) => ({ ...p, ...e }));
                  }}
                  placeholder="vous@exemple.com"
                  className={inputCls(loginErr.email)}
                  autoComplete="email"
                />
              </Field>

              <Field
                label="Mot de passe"
                icon={<Lock size={15} />}
                error={loginErr.password}
              >
                <input
                  type={showLoginPw ? "text" : "password"}
                  value={login.password}
                  onChange={(e) =>
                    setLogin((p) => ({ ...p, password: e.target.value }))
                  }
                  placeholder="••••••••"
                  className={`${inputCls(loginErr.password)} pr-11`}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowLoginPw((p) => !p)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showLoginPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </Field>

              <div className="text-right -mt-1">
                <button className="text-[12px] text-forest-700 hover:text-forest-900 font-medium transition-colors">
                  Mot de passe oublié ?
                </button>
              </div>

              <button
                onClick={handleLogin}
                className="w-full py-3.5 rounded-xl bg-forest-800 hover:bg-forest-900 text-white font-semibold text-[14px] transition-all duration-200 active:scale-[0.98] mt-1"
              >
                Se connecter
              </button>

              <p className="text-center text-[13px] text-gray-500">
                Pas encore de compte ?{" "}
                <button
                  onClick={() => switchMode("register")}
                  className="text-forest-700 font-semibold hover:underline"
                >
                  Créer un compte
                </button>
              </p>
            </div>
          )}

          {/* ── REGISTER ── */}
          {mode === "register" && (
            <div style={contentStyle}>
              {/* Step 1 */}
              {step === 1 && (
                <div className="flex flex-col gap-4">
                  <div className="mb-1">
                    <h2 className="font-serif text-2xl font-bold text-[#1a1208]">
                      Votre identité
                    </h2>
                    <p className="text-[13px] text-gray-500 mt-1">
                      Commençons par faire connaissance
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <Field
                      label="Prénom"
                      icon={<User size={15} />}
                      error={errors.firstName}
                    >
                      <input
                        type="text"
                        value={form.firstName}
                        onChange={(e) => set("firstName", e.target.value)}
                        onBlur={() => blur("firstName")}
                        placeholder="Youness"
                        className={inputCls(errors.firstName)}
                        maxLength={30}
                      />
                    </Field>
                    <Field
                      label="Nom"
                      icon={<User size={15} />}
                      error={errors.lastName}
                    >
                      <input
                        type="text"
                        value={form.lastName}
                        onChange={(e) => set("lastName", e.target.value)}
                        onBlur={() => blur("lastName")}
                        placeholder="Dalal"
                        className={inputCls(errors.lastName)}
                        maxLength={30}
                      />
                    </Field>
                  </div>

                  <Field
                    label="Adresse email"
                    icon={<Mail size={15} />}
                    error={errors.email}
                  >
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => set("email", e.target.value)}
                      onBlur={() => blur("email")}
                      placeholder="vous@exemple.com"
                      className={inputCls(errors.email)}
                      maxLength={50}
                      autoComplete="email"
                    />
                  </Field>

                  <Field
                    label="Mot de passe"
                    icon={<Lock size={15} />}
                    error={errors.password}
                    hint="8-30 car. · majuscule · chiffre · symbole (@#$%^&+=!)"
                  >
                    <input
                      type={showPw ? "text" : "password"}
                      value={form.password}
                      onChange={(e) => set("password", e.target.value)}
                      onBlur={() => blur("password")}
                      placeholder="••••••••••"
                      className={`${inputCls(errors.password)} pr-11`}
                      maxLength={30}
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPw((p) => !p)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </Field>

                  {form.password && (
                    <div className="flex flex-col gap-1 -mt-2">
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <div
                            key={i}
                            className="flex-1 h-1.5 rounded-full transition-all duration-300"
                            style={{
                              backgroundColor:
                                i <= strength
                                  ? STRENGTH_COLOR[strength]
                                  : "#e5e7eb",
                            }}
                          />
                        ))}
                      </div>
                      <span
                        className="text-[11px] font-medium"
                        style={{ color: STRENGTH_COLOR[strength] }}
                      >
                        {STRENGTH_LABEL[strength]}
                      </span>
                    </div>
                  )}

                  <button
                    onClick={handleNext}
                    className="w-full py-3.5 rounded-xl bg-forest-800 hover:bg-forest-900 text-white font-semibold text-[14px] transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2 mt-2"
                  >
                    Continuer <ChevronRight size={16} />
                  </button>
                </div>
              )}

              {/* Step 2 */}
              {step === 2 && (
                <div className="flex flex-col gap-4">
                  <div className="mb-1">
                    <h2 className="font-serif text-2xl font-bold text-[#1a1208]">
                      Vos coordonnées
                    </h2>
                    <p className="text-[13px] text-gray-500 mt-1">
                      Pour vous contacter en cas de besoin
                    </p>
                  </div>

                  <Field
                    label="Numéro de téléphone"
                    icon={<Phone size={15} />}
                    error={errors.phoneNumber}
                    hint="Format marocain : 0612345678 ou +212612345678"
                  >
                    <input
                      type="tel"
                      value={form.phoneNumber}
                      onChange={(e) => set("phoneNumber", e.target.value)}
                      onBlur={() => blur("phoneNumber")}
                      placeholder="0612345678"
                      className={inputCls(errors.phoneNumber)}
                      maxLength={15}
                    />
                  </Field>

                  <Field
                    label="Date de naissance"
                    icon={<Calendar size={15} />}
                    error={errors.birthDate}
                  >
                    <input
                      type="date"
                      value={form.birthDate}
                      onChange={(e) => set("birthDate", e.target.value)}
                      onBlur={() => blur("birthDate")}
                      max={new Date().toISOString().split("T")[0]}
                      className={inputCls(errors.birthDate)}
                    />
                  </Field>

                  {/* Gender — Homme / Femme only */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[12px] font-semibold text-gray-600 uppercase tracking-wide">
                      Genre
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { value: "MALE", label: "Homme" },
                        { value: "FEMALE", label: "Femme" },
                      ].map((opt) => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => set("gender", opt.value)}
                          onBlur={() => blur("gender")}
                          className="py-3 text-[14px] font-medium rounded-xl border transition-all duration-200"
                          style={{
                            backgroundColor:
                              form.gender === opt.value ? "#1e3d2d" : "#faf8f4",
                            color:
                              form.gender === opt.value ? "#fff" : "#374151",
                            borderColor:
                              form.gender === opt.value
                                ? "#1e3d2d"
                                : errors.gender
                                  ? "#f87171"
                                  : "#e0d8c4",
                          }}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                    {errors.gender && (
                      <p className="text-[11px] text-red-500 flex items-center gap-1">
                        <span className="inline-block w-1 h-1 rounded-full bg-red-500" />
                        {errors.gender}
                      </p>
                    )}
                  </div>

                  <div className="flex gap-3 mt-2">
                    <button
                      onClick={handleBack}
                      className="flex-1 py-3.5 rounded-xl border border-[#e0d8c4] bg-white hover:bg-[#f5f0e6] text-gray-700 font-semibold text-[14px] transition-all duration-200 flex items-center justify-center gap-2"
                    >
                      <ChevronLeft size={16} /> Retour
                    </button>
                    <button
                      onClick={handleNext}
                      className="flex-1 py-3.5 rounded-xl bg-forest-800 hover:bg-forest-900 text-white font-semibold text-[14px] transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2"
                    >
                      Continuer <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3 */}
              {step === 3 && (
                <div className="flex flex-col gap-4">
                  <div className="mb-1">
                    <h2 className="font-serif text-2xl font-bold text-[#1a1208]">
                      Votre localisation
                    </h2>
                    <p className="text-[13px] text-gray-500 mt-1">
                      Pour trouver les prestataires près de chez vous
                    </p>
                  </div>

                  <Field
                    label="Adresse complète"
                    icon={<MapPin size={15} />}
                    error={errors.address}
                  >
                    <input
                      type="text"
                      value={form.address}
                      onChange={(e) => set("address", e.target.value)}
                      onBlur={() => blur("address")}
                      placeholder="12 Rue Mohammed V, Quartier Gueliz"
                      className={inputCls(errors.address)}
                      maxLength={150}
                    />
                  </Field>

                  {/* Country — searchable API select */}
                  <Field
                    label="Pays"
                    icon={<Globe size={15} />}
                    error={errors.country}
                  >
                    <SearchableSelect
                      options={countries}
                      value={form.country}
                      onChange={setCountryField}
                      onBlur={() => blur("country")}
                      placeholder="Sélectionnez un pays"
                      loading={loadingCountries}
                      error={!!errors.country}
                      emptyText="Aucun pays trouvé"
                    />
                  </Field>

                  {/* City — searchable API select */}
                  <Field
                    label="Ville"
                    icon={<Building2 size={15} />}
                    error={errors.city}
                  >
                    <SearchableSelect
                      options={cities}
                      value={form.city}
                      onChange={(v) => {
                        set("city", v);
                      }}
                      onBlur={() => blur("city")}
                      placeholder={
                        form.country
                          ? "Sélectionnez une ville"
                          : "Choisissez d'abord un pays"
                      }
                      loading={loadingCities}
                      disabled={!form.country}
                      error={!!errors.city}
                      emptyText="Aucune ville trouvée"
                    />
                  </Field>

                  {/* Recap card */}
                  <div className="bg-[#f5f0e6] rounded-2xl p-4 border border-[#e0d8c4] mt-1">
                    <p className="text-[12px] font-semibold text-gray-500 uppercase tracking-wide mb-2">
                      Récapitulatif
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-forest-800 flex items-center justify-center shrink-0">
                        <span className="text-white font-bold text-[13px]">
                          {form.firstName.charAt(0).toUpperCase()}
                          {form.lastName.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="text-[13px] font-semibold text-[#1a1208]">
                          {form.firstName} {form.lastName}
                        </p>
                        <p className="text-[12px] text-gray-500">
                          {form.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-1">
                    <button
                      onClick={handleBack}
                      className="flex-1 py-3.5 rounded-xl border border-[#e0d8c4] bg-white hover:bg-[#f5f0e6] text-gray-700 font-semibold text-[14px] transition-all duration-200 flex items-center justify-center gap-2"
                    >
                      <ChevronLeft size={16} /> Retour
                    </button>
                    <button
                      onClick={handleSubmit}
                      className="flex-1 py-3.5 rounded-xl bg-forest-800 hover:bg-forest-900 text-white font-semibold text-[14px] transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2"
                    >
                      <Check size={16} /> Créer mon compte
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Login success overlay */}
      {loginSuccess && (
        <LoginSuccessModal
          firstName={login.email.split("@")[0]}
          onDone={() => {
            onLoginSuccess?.({
              firstName: login.email.split("@")[0],
              lastName: "",
              email: login.email,
            });
          }}
        />
      )}
    </div>
  );
}

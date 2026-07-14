import { useState } from "react";
import type {
  RegisterRequestDto,
  RegisterRequestErrors,
} from "../types/register";

export default function RegisterForm() {
  // 1. الـ State ديال الـ Form Data
  const [formData, setformData] = useState<RegisterRequestDto>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    birthDate: "",
    gender: "",
    country: "",
    city: "",
    address: "",
  });

  // 2. الـ State ديال كود الأخطاء (كيبدأ خاوي {})
  const [errorMsgs, seterrorMsgs] = useState<RegisterRequestErrors>({});

  // الـ Change Handler للأجهزة والـ Inputs
  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setformData({
      ...formData,
      [name]: value,
    });

    // UX ميزه إضافية: ملي يبدأ الـ user يصحح الغلط، نحيدو ليه اللون الأحمر فالبلاصة
    if (errorMsgs[name as keyof RegisterRequestDto]) {
      seterrorMsgs({
        ...errorMsgs,
        [name]: undefined,
      });
    }
  };

  // 3. الـ Validation Function مبنية على الـ Java DTO 100%
  const validateForm = (): boolean => {
    const errors: RegisterRequestErrors = {};

    // --- FirstName ---
    if (!formData.firstName.trim()) {
      errors.firstName = "Le prénom est obligatoire";
    } else if (
      formData.firstName.length < 2 ||
      formData.firstName.length > 30
    ) {
      errors.firstName = "Le prénom doit contenir entre 2 et 30 caractères";
    }

    // --- LastName ---
    if (!formData.lastName.trim()) {
      errors.lastName = "Le nom est obligatoire";
    } else if (formData.lastName.length < 2 || formData.lastName.length > 30) {
      errors.lastName = "Le nom doit contenir entre 2 et 30 caractères";
    }

    // --- Email ---
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errors.email = "L'adresse email est obligatoire";
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "L'adresse email n'est pas valide";
    } else if (formData.email.length > 50) {
      errors.email = "L'email ne doit pas dépasser 50 caractères";
    }

    // --- Password (طابقنا الـ Pattern ديال الـ Backend) ---
    const passwordRegex =
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!]).{8,30}$/;
    if (!formData.password) {
      errors.password = "Le mot de passe ne doit pas être vide";
    } else if (!passwordRegex.test(formData.password)) {
      errors.password =
        "Le mot de passe doit contenir entre 8 et 30 caractères, incluant une majuscule, une minuscule, un chiffre et un caractère spécial";
    }

    // --- PhoneNumber (الـ Regex المغربي) ---
    const phoneRegex = /^(\+212|0)([5-7])\d{8}$/;
    if (!formData.phoneNumber.trim()) {
      errors.phoneNumber = "Le numéro de téléphone est obligatoire";
    } else if (!phoneRegex.test(formData.phoneNumber)) {
      errors.phoneNumber =
        "Le numéro de téléphone n'est pas valide (Format marocain attendu)";
    }

    // --- BirthDate ---
    if (!formData.birthDate) {
      errors.birthDate = "La date de naissance est obligatoire";
    } else {
      const selectedDate = new Date(formData.birthDate);
      const today = new Date();
      if (selectedDate >= today) {
        errors.birthDate = "La date de naissance doit être dans le passé";
      }
    }

    // --- Gender ---
    if (!formData.gender) {
      errors.gender = "Le genre est obligatoire";
    }

    // --- Address ---
    if (!formData.address.trim()) {
      errors.address = "L'adresse est obligatoire";
    } else if (formData.address.length < 5 || formData.address.length > 150) {
      errors.address = "L'adresse doit contenir entre 5 et 150 caractères";
    }

    // --- Country ---
    if (!formData.country.trim()) {
      errors.country = "Le pays est obligatoire";
    } else if (formData.country.length < 2 || formData.country.length > 50) {
      errors.country = "Le pays doit contenir entre 2 et 50 caractères";
    }

    // --- City ---
    if (!formData.city.trim()) {
      errors.city = "La ville est obligatoire";
    } else if (formData.city.length < 2 || formData.city.length > 50) {
      errors.city = "La ville doit contenir entre 2 et 50 caractères";
    }

    seterrorMsgs(errors);
    // إيلا كانت الـ keys length === 0 يعني خاوي وما كاين حتى غلط
    return Object.keys(errors).length === 0;
  };

  // 4. الـ Submit Handler
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 👈 حيدنا الـ Default reload

    const isValid = validateForm();

    if (isValid) {
      console.log("Data correcte! Prêt à envoyer au backend: ", formData);
      // هنا غادي نعيطو للـ API Service ونصيفطو الـ formData ديالنا ناضي
    } else {
      console.log("Le formulaire contient des erreurs.");
    }
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center p-4 md:p-8 bg-cover bg-center relative"
      style={{
        backgroundImage: `url('https://images.pexels.com/photos/4505171/pexels-photo-4505171.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80')`,
      }}
    >
      <div className="w-full max-w-2xl bg-white/95 backdrop-blur-md p-6 md:p-10 rounded-3xl shadow-2xl border border-white/20 my-8">
        <div className="flex flex-col items-center mb-8">
          <h2 className="text-2xl font-bold text-forest-950 mt-4">
            Créer votre compte
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Rejoignez dalyou et profitez de nos services à domicile
          </p>
        </div>

        {/* ربطنا الـ Submit بالـ Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 1. Prénom (firstName) */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                Prénom
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                placeholder="Ex: Youness"
                onChange={handleFormChange}
                // الـ شرط د البوردر الأحمر:
                className={`w-full px-4 py-3 bg-gray-50 border rounded-2xl focus:outline-none text-sm transition-all ${
                  errorMsgs.firstName
                    ? "border-red-500 focus:border-red-500 bg-red-50/10"
                    : "border-gray-200 focus:border-forest-800"
                }`}
              />
              {/* إيلا كاين الغلط كنبينوه هنا بالـ أحمر */}
              {errorMsgs.firstName && (
                <span className="text-xs text-red-500 font-medium mt-1.5 block">
                  {errorMsgs.firstName}
                </span>
              )}
            </div>

            {/* 2. Nom (lastName) */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                Nom
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                placeholder="Ex: El"
                onChange={handleFormChange}
                className={`w-full px-4 py-3 bg-gray-50 border rounded-2xl focus:outline-none text-sm transition-all ${
                  errorMsgs.lastName
                    ? "border-red-500 focus:border-red-500 bg-red-50/10"
                    : "border-gray-200 focus:border-forest-800"
                }`}
              />
              {errorMsgs.lastName && (
                <span className="text-xs text-red-500 font-medium mt-1.5 block">
                  {errorMsgs.lastName}
                </span>
              )}
            </div>

            {/* 3. Email */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                Adresse Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                placeholder="youness@example.com"
                onChange={handleFormChange}
                className={`w-full px-4 py-3 bg-gray-50 border rounded-2xl focus:outline-none text-sm transition-all ${
                  errorMsgs.email
                    ? "border-red-500 focus:border-red-500 bg-red-50/10"
                    : "border-gray-200 focus:border-forest-800"
                }`}
              />
              {errorMsgs.email && (
                <span className="text-xs text-red-500 font-medium mt-1.5 block">
                  {errorMsgs.email}
                </span>
              )}
            </div>

            {/* 4. Téléphone (phoneNumber) */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                Téléphone
              </label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                placeholder="Ex: 0612345678"
                onChange={handleFormChange}
                className={`w-full px-4 py-3 bg-gray-50 border rounded-2xl focus:outline-none text-sm transition-all ${
                  errorMsgs.phoneNumber
                    ? "border-red-500 focus:border-red-500 bg-red-50/10"
                    : "border-gray-200 focus:border-forest-800"
                }`}
              />
              {errorMsgs.phoneNumber && (
                <span className="text-xs text-red-500 font-medium mt-1.5 block">
                  {errorMsgs.phoneNumber}
                </span>
              )}
            </div>

            {/* 5. Mot de passe (password) */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                Mot de passe
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                placeholder="••••••••"
                onChange={handleFormChange}
                className={`w-full px-4 py-3 bg-gray-50 border rounded-2xl focus:outline-none text-sm transition-all ${
                  errorMsgs.password
                    ? "border-red-500 focus:border-red-500 bg-red-50/10"
                    : "border-gray-200 focus:border-forest-800"
                }`}
              />
              {errorMsgs.password && (
                <span className="text-xs text-red-500 font-medium mt-1.5 block">
                  {errorMsgs.password}
                </span>
              )}
            </div>

            {/* 6. Date de naissance (birthDate) */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                Date de naissance
              </label>
              <input
                type="date"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleFormChange}
                className={`w-full px-4 py-3 bg-gray-50 border rounded-2xl focus:outline-none text-sm transition-all ${
                  errorMsgs.birthDate
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-200 focus:border-forest-800"
                }`}
              />
              {errorMsgs.birthDate && (
                <span className="text-xs text-red-500 font-medium mt-1.5 block">
                  {errorMsgs.birthDate}
                </span>
              )}
            </div>

            {/* 7. Genre (gender) */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                Genre
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleFormChange}
                className={`w-full px-4 py-3 bg-gray-50 border rounded-2xl focus:outline-none text-sm appearance-none transition-all ${
                  errorMsgs.gender
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-200 focus:border-forest-800"
                }`}
              >
                <option value="">Sélectionner</option>
                <option value="MALE">Homme</option>
                <option value="FEMALE">Femme</option>
              </select>
              {errorMsgs.gender && (
                <span className="text-xs text-red-500 font-medium mt-1.5 block">
                  {errorMsgs.gender}
                </span>
              )}
            </div>

            {/* 8. Pays (country) */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                Pays
              </label>
              <input
                type="text"
                name="country"
                value={formData.country}
                placeholder="Ex: Maroc"
                onChange={handleFormChange}
                className={`w-full px-4 py-3 bg-gray-50 border rounded-2xl focus:outline-none text-sm transition-all ${
                  errorMsgs.country
                    ? "border-red-500 focus:border-red-500 bg-red-50/10"
                    : "border-gray-200 focus:border-forest-800"
                }`}
              />
              {errorMsgs.country && (
                <span className="text-xs text-red-500 font-medium mt-1.5 block">
                  {errorMsgs.country}
                </span>
              )}
            </div>

            {/* 9. Ville (city) */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                Ville
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                placeholder="Ex: Casablanca"
                onChange={handleFormChange}
                className={`w-full px-4 py-3 bg-gray-50 border rounded-2xl focus:outline-none text-sm transition-all ${
                  errorMsgs.city
                    ? "border-red-500 focus:border-red-500 bg-red-50/10"
                    : "border-gray-200 focus:border-forest-800"
                }`}
              />
              {errorMsgs.city && (
                <span className="text-xs text-red-500 font-medium mt-1.5 block">
                  {errorMsgs.city}
                </span>
              )}
            </div>

            {/* 10. Adresse */}
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                Adresse
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                placeholder="Ex: 123 Rue de la Liberté, Maarif"
                onChange={handleFormChange}
                className={`w-full px-4 py-3 bg-gray-50 border rounded-2xl focus:outline-none text-sm transition-all ${
                  errorMsgs.address
                    ? "border-red-500 focus:border-red-500 bg-red-50/10"
                    : "border-gray-200 focus:border-forest-800"
                }`}
              />
              {errorMsgs.address && (
                <span className="text-xs text-red-500 font-medium mt-1.5 block">
                  {errorMsgs.address}
                </span>
              )}
            </div>
          </div>

          {/*submit button*/}
          <button
            type="submit"
            className="w-full py-3.5 bg-forest-800 hover:bg-forest-900 text-white font-semibold rounded-2xl shadow-md transition-all duration-200 active:scale-[0.98] mt-4 text-sm"
          >
            S'inscrire
          </button>
        </form>
      </div>
    </div>
  );
}

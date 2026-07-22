import { useState } from "react";
import type {
  RegisterRequestDto,
  RegisterRequestErrors,
} from "../types/register";
import { authService } from "../services/auth.service";
import { AlertCircle } from "lucide-react";
import { City, Country } from "country-state-city";
import { useNavigate } from "react-router-dom";

export default function RegisterForm() {
  // 1.form state
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

  // 2.errors state
  const [errorMsgs, seterrorMsgs] = useState<RegisterRequestErrors>({});

  // loading state
  const [isLoading, setisLoading] = useState(false);

  // gloabl message
  const [globalErrorMsg, setGlobalErrorMsg] = useState("");

  // cities state
  const [cities, setcities] = useState<any[]>([]);

  // get all countries
  const countries = Country.getAllCountries();

  const navigate = useNavigate();

  // formchange handler
  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    if (name == "country") {
      if (value) {
        const countryCities = City.getCitiesOfCountry(value);
        setcities(countryCities);
        const selectedCountryObj = Country.getCountryByCode(value);
        const countryFullName = selectedCountryObj
          ? selectedCountryObj.name
          : "";
        setformData({
          ...formData,
          [name]: countryFullName,
          city: "",
        });
        console.log(countryFullName);
      } else {
        setcities([]);
        setformData({
          ...formData,
          country: "",
          city: "",
        });
      }
    } else {
      setformData({
        ...formData,
        [name]: value,
      });
    }
    // --- Better User Experience (UX) ---
    // Hide the red borders around the fields dynamically when the user starts typing/correcting their input.

    // We use "Bracket Notation" (errorMsgs[name]) instead of "Dot Notation" because 'name' is a dynamic variable.
    // 'name as keyof RegisterRequestDto' is a Type Assertion. It tells the TypeScript compiler that the dynamic 'name'
    // string is guaranteed to be one of the keys of our DTO, preventing TS compile-time errors.
    if (errorMsgs[name as keyof RegisterRequestDto]) {
      seterrorMsgs({
        ...errorMsgs,
        [name]: undefined,
        ...(name === "country" ? { city: undefined } : {}),
      });
    }
  };

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

    // --- Password
    const passwordRegex =
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!]).{8,30}$/;
    if (!formData.password) {
      errors.password = "Le mot de passe ne doit pas être vide";
    } else if (!passwordRegex.test(formData.password)) {
      errors.password =
        "Le mot de passe doit contenir entre 8 et 30 caractères, incluant une majuscule, une minuscule, un chiffre et un caractère spécial";
    }

    // --- PhoneNumber ---
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
    // si l'objects errors contient zero field c'est a dire zero erreur
    return Object.keys(errors).length === 0;
  };

  // 4.s
  //validate form return boolean for that purpose to do some debugging in the console
  // if i want to remove it it's not a problem but i will let it to say the logs in the console
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValid = validateForm();

    if (isValid) {
      console.log("Data correcte! Prêt à envoyer au backend: ", formData);
      setisLoading(true);
      try {
        const response = await authService.register(formData);
        // for just log the result to see it
        console.log(response);

        // add the token inside localstorage with user details
        const userDetails = {
          email: response.email,
          roles: response.roles,
          fullname: response.fullName,
        };
        localStorage.setItem("token", response.token);
        const userStringDetails = JSON.stringify(userDetails);
        localStorage.setItem("user", userStringDetails);
        setGlobalErrorMsg("");
        navigate("/client/dashboard");
      } catch (error: any) {
        let backendMessage = "";
        if (error.response?.status === 409) {
          backendMessage = error.response.data.message;
          seterrorMsgs({
            ...errorMsgs,
            email: backendMessage,
          });
          setGlobalErrorMsg("");
        } else {
          backendMessage = "Une erreur est survenue. Veuillez réessuyer.";
          setGlobalErrorMsg(backendMessage);
          seterrorMsgs({});
        }
      } finally {
        // pour l'instant
        setisLoading(false);
      }
    } else {
      console.log("Le formulaire contient des erreurs.");
    }
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center p-4 md:p-8 bg-cover bg-center relative"
      style={{
        backgroundImage: `url('https://rapid-plomberie.com/wp-content/uploads/2025/11/Peindre-un-mur-comme-un-pro-astuces-et-materiel-necessaire.jpg')`,
      }}
    >
      <div className="w-full max-w-2xl bg-white p-6 md:p-10 rounded-3xl  my-8">
        <div className="flex flex-col items-center mb-8">
          <h2 className="text-2xl font-bold text-forest-950 mt-4">
            Créer votre compte
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Rejoignez dalyou et profitez de nos services à domicile
          </p>
        </div>
        {globalErrorMsg && (
          <div className="mb-5 p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-3 text-red-800 animate-fadeIn">
            {/* Icône d'alerte rouge importée de lucide-react */}
            <AlertCircle size={20} className="shrink-0 text-red-600" />
            <span className="text-sm font-medium">{globalErrorMsg}</span>
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 1. Prénom (firstName) */}
            <div>
              <label className="block text-xs font-bold text-gray-700  tracking-wider mb-2">
                Prénom
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                placeholder="Ex: Youness"
                onChange={handleFormChange}
                className={`w-full px-4 py-3  border rounded-2xl focus:outline-none text-sm transition-all ${
                  errorMsgs.firstName
                    ? "border-red-500 focus:border-red-500 bg-red-50/10"
                    : "border-gray-400 focus:border-forest-500"
                }`}
              />

              {errorMsgs.firstName && (
                <span className="text-xs text-red-500 font-medium mt-1.5 block">
                  {errorMsgs.firstName}
                </span>
              )}
            </div>

            {/* 2. Nom (lastName) */}
            <div>
              <label className="block text-xs font-bold text-gray-700 tracking-wider mb-2">
                Nom
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                placeholder="Ex: Dalal"
                onChange={handleFormChange}
                className={`w-full px-4 py-3  border rounded-2xl focus:outline-none text-sm transition-all ${
                  errorMsgs.lastName
                    ? "border-red-500 focus:border-red-500 bg-red-50/10"
                    : "border-gray-400 focus:border-forest-500"
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
              <label className="block text-xs font-bold text-gray-700 tracking-wider mb-2">
                Adresse Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                placeholder="youness@example.com"
                onChange={handleFormChange}
                className={`w-full px-4 py-3  border rounded-2xl focus:outline-none text-sm transition-all ${
                  errorMsgs.email
                    ? "border-red-500 focus:border-red-500 bg-red-50/10"
                    : "border-gray-400 focus:border-forest-500"
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
              <label className="block text-xs font-bold text-gray-700 tracking-wider mb-2">
                Téléphone
              </label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                placeholder="Ex: 0612345678"
                onChange={handleFormChange}
                className={`w-full px-4 py-3  border rounded-2xl focus:outline-none text-sm transition-all ${
                  errorMsgs.phoneNumber
                    ? "border-red-500 focus:border-red-500 bg-red-50/10"
                    : "border-gray-400 focus:border-forest-500"
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
              <label className="block text-xs font-bold text-gray-700 tracking-wider mb-2">
                Mot de passe
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                placeholder="••••••••"
                onChange={handleFormChange}
                className={`w-full px-4 py-3  border rounded-2xl focus:outline-none text-sm transition-all ${
                  errorMsgs.password
                    ? "border-red-500 focus:border-red-500 bg-red-50/10"
                    : "border-gray-400 focus:border-forest-500"
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
              <label className="block text-xs font-bold text-gray-700 tracking-wider mb-2">
                Date de naissance
              </label>
              <input
                type="date"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleFormChange}
                className={`w-full px-4 py-3 border rounded-2xl focus:outline-none text-sm transition-all ${
                  errorMsgs.birthDate
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-400 focus:border-forest-500"
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
              <label className="block text-xs font-bold text-gray-700 tracking-wider mb-2">
                Genre
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleFormChange}
                className={`w-full px-4 py-3  border rounded-2xl focus:outline-none text-sm appearance-none transition-all ${
                  errorMsgs.gender
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-400 focus:border-forest-500"
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
              <label className="block text-xs font-bold text-gray-700 tracking-wider mb-2">
                Pays
              </label>
              <select
                name="country"
                value={
                  countries.find((c) => c.name === formData.country)?.isoCode ||
                  ""
                }
                onChange={handleFormChange}
                className={`w-full px-4 py-3  border rounded-2xl focus:outline-none text-sm transition-all ${
                  errorMsgs.country
                    ? "border-red-500 focus:border-red-500 bg-red-50/10"
                    : "border-gray-400 focus:border-forest-500"
                }`}
              >
                <option value="">Sélectionnez un pays</option>
                {countries.map((country) => (
                  <option key={country.isoCode} value={country.isoCode}>
                    {country.name}
                  </option>
                ))}
              </select>
              {errorMsgs.country && (
                <span className="text-xs text-red-500 font-medium mt-1.5 block">
                  {errorMsgs.country}
                </span>
              )}
            </div>

            {/* 9. Ville (city) */}
            <div>
              <label className="block text-xs font-bold text-gray-700 tracking-wider mb-2">
                Ville
              </label>
              <select
                name="city"
                value={formData.city}
                onChange={handleFormChange}
                disabled={cities.length === 0}
                className={`w-full px-4 py-3 border rounded-2xl focus:outline-none text-sm transition-all ${
                  errorMsgs.city
                    ? "border-red-500 focus-within:border-red-500 bg-red-50/10"
                    : "border-gray-400 focus:border-forest-500"
                }`}
              >
                <option value="">
                  {formData.country
                    ? "Sélectionnez une ville"
                    : "Sélectionnez d'abord un pays"}
                </option>
                {cities.map((city, index) => (
                  <option key={city.name + "-" + index} value={city.name}>
                    {" "}
                    {city.name}
                  </option>
                ))}
              </select>
              {errorMsgs.city && (
                <span className="text-xs text-red-500 font-medium mt-1.5 block">
                  {errorMsgs.city}
                </span>
              )}
            </div>

            {/* 10. Adresse */}
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-gray-700 tracking-wider mb-2">
                Adresse
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                placeholder="Ex: lot ouroud sidi maarouf"
                onChange={handleFormChange}
                className={`w-full px-4 py-3  border rounded-2xl focus:outline-none text-sm transition-all ${
                  errorMsgs.address
                    ? "border-red-500 focus:border-red-500 bg-red-50/10"
                    : "border-gray-400 focus:border-forest-500"
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
            disabled={isLoading}
            className="w-full py-3.5 bg-forest-800 hover:bg-forest-900 text-white font-semibold rounded-2xl shadow-md transition-all duration-200 active:scale-[0.98] mt-4 text-sm"
          >
            {isLoading ? <span>Inscription en cours...</span> : "S'inscrire"}
          </button>
        </form>
      </div>
    </div>
  );
}

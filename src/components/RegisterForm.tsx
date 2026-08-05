import { useRegisterForm } from "../hooks/useRegisterForm";
import bgRegister from "../assets/register-background.png";

export default function RegisterForm() {
  const {
    formData,
    errorMsgs,
    isLoading,
    countries,
    cities,
    selectedCountryCode,
    handleFormChange,
    handleSubmit,
  } = useRegisterForm();

  return (
    <div
      className="min-h-screen w-full bg-cover bg-left md:bg-center bg-no-repeat flex items-center justify-center lg:justify-end p-4 md:p-12 lg:pr-24"
      style={{
        backgroundImage: `url(${bgRegister})`,
      }}
    >
      <div className="w-full max-w-xl bg-white/95 backdrop-blur-sm p-6 md:p-8 rounded-3xl my-8 shadow-2xl border border-white/20">
        <div className="flex flex-col items-center mb-6">
          <h2 className="text-2xl font-bold text-forest-950 mt-2">
            Créer votre compte
          </h2>
          <p className="text-sm text-gray-500 mt-1 text-center">
            Rejoignez dalyou et profitez de nos services à domicile
          </p>
        </div>

        <form className="space-y-4 md:space-y-5" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 1. Prénom */}
            <div>
              <label className="block text-xs font-bold text-gray-700 tracking-wider mb-2">
                Prénom
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                placeholder="Ex: Youness"
                onChange={handleFormChange}
                className={`w-full px-4 py-3 border rounded-2xl focus:outline-none text-sm transition-all ${
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

            {/* 2. Nom */}
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
                className={`w-full px-4 py-3 border rounded-2xl focus:outline-none text-sm transition-all ${
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
                className={`w-full px-4 py-3 border rounded-2xl focus:outline-none text-sm transition-all ${
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

            {/* 4. Téléphone */}
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
                className={`w-full px-4 py-3 border rounded-2xl focus:outline-none text-sm transition-all ${
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

            {/* 5. Mot de passe */}
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
                className={`w-full px-4 py-3 border rounded-2xl focus:outline-none text-sm transition-all ${
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

            {/* 6. Date de naissance */}
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

            {/* 7. Genre */}
            <div>
              <label className="block text-xs font-bold text-gray-700 tracking-wider mb-2">
                Genre
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleFormChange}
                className={`w-full px-4 py-3 border rounded-2xl focus:outline-none text-sm appearance-none transition-all ${
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

            {/* 8. Pays */}
            <div>
              <label className="block text-xs font-bold text-gray-700 tracking-wider mb-2">
                Pays
              </label>
              <select
                name="country"
                value={selectedCountryCode}
                onChange={handleFormChange}
                className={`w-full px-4 py-3 border rounded-2xl focus:outline-none text-sm transition-all ${
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

            {/* 9. Ville */}
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
                  <option key={`${city.name}-${index}`} value={city.name}>
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
                className={`w-full px-4 py-3 border rounded-2xl focus:outline-none text-sm transition-all ${
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

          {/* Submit Button */}
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

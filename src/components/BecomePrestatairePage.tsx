import { Navigate } from "react-router-dom";
import { MapPin, Briefcase, ArrowRight } from "lucide-react";
import heroProviderImg from "../assets/BecomePrestataireImage.png";
import { usePrestataire } from "../hooks/usePrestataire";
import { useAuth } from "../context/AuthContext";
import { useServices } from "../hooks/useServices";

export default function BecomePrestatairePage() {
  const { isAuthenticated } = useAuth();
  const { prestataireInfo, handleChange, handleSubmit, errors, isLoading } =
    usePrestataire();
  const services = useServices();
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return (
    <div className="min-h-screen bg-cream-50 flex items-center justify-center p-4 md:p-8 lg:p-12 font-sans text-gray-800">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* ================= LEFT COLUMN: HERO IMAGE ================= */}
        <div className="lg:col-span-6 relative w-full h-[380px] sm:h-[480px] md:h-[580px] rounded-3xl overflow-hidden shadow-card">
          <img
            src={heroProviderImg}
            alt="Dalyoo Prestataire"
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* ================= RIGHT COLUMN: CONTENT & QUICK FORM ================= */}
        <div className="lg:col-span-6 flex flex-col justify-center space-y-6 md:space-y-8">
          {/* Badge & Typography */}
          <div className="space-y-4">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cream-100 text-forest-700 text-xs font-semibold tracking-wide border border-cream-200">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              Bienvenue chez dalyoo
            </span>

            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-forest-900 leading-tight">
              Devenez prestataire et <br className="hidden sm:inline" />
              <span className="text-amber-500">
                travaillez près de chez vous.
              </span>
            </h1>

            <p className="text-gray-600 text-sm md:text-base leading-relaxed max-w-xl">
              Dalyoo est la plateforme marocaine de services à domicile.
              Indiquez votre zone et votre métier — nous vous connectons à des
              clients autour de vous, en toute simplicité.
            </p>
          </div>

          {/* Quick Registration Card */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-cream-200 shadow-card space-y-6">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-forest-900">
              Commencez en 30 secondes
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              {/* Field 1: Zone d'intervention */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Zone d'intervention
                </label>

                <div className="relative flex items-center">
                  <MapPin className="absolute left-4 w-5 h-5 text-gray-400 pointer-events-none" />
                  <input
                    type="text"
                    name="interventionArea"
                    value={prestataireInfo.interventionArea}
                    onChange={handleChange}
                    placeholder="Casablanca, Sidi Maarouf"
                    className={`w-full pl-12 pr-4 py-3.5 bg-cream-50/50 border rounded-2xl text-sm focus:outline-none transition-all duration-200 ${
                      errors.interventionArea
                        ? "border-red-500 focus:border-red-500 bg-red-50/20"
                        : "border-gray-200 focus:border-forest-500 focus:bg-white"
                    }`}
                  />
                </div>
                {errors.interventionArea && (
                  <p className="text-xs text-red-500 font-medium mt-1">
                    {errors.interventionArea}
                  </p>
                )}
              </div>

              {/* Field 2: Service principal */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Service principal
                </label>
                <div className="relative flex items-center">
                  <Briefcase className="absolute left-4 w-5 h-5 text-gray-400 pointer-events-none" />
                  <select
                    name="service"
                    value={prestataireInfo.service}
                    onChange={handleChange}
                    className={`w-full pl-12 pr-10 py-3.5 bg-cream-50/50 border rounded-2xl text-sm appearance-none focus:outline-none transition-all duration-200 text-gray-700 ${
                      errors.service
                        ? "border-red-500 focus:border-red-500 bg-red-50/20"
                        : "border-gray-200 focus:border-forest-500 focus:bg-white"
                    }`}
                  >
                    <option value="" disabled>
                      Sélectionner un service
                    </option>
                    {services.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-4 pointer-events-none text-gray-400 text-xs">
                    ▼
                  </div>
                </div>
                {errors.service && (
                  <p className="text-xs text-red-500 font-medium mt-1">
                    {errors.service}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-4 bg-forest-900 hover:bg-forest-800 text-white font-semibold rounded-2xl shadow-md transition-all duration-200 flex items-center justify-center gap-2 text-sm md:text-base active:scale-[0.99] mt-2"
              >
                {isLoading ? "Enregistrement..." : "Devenir prestataire"}
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

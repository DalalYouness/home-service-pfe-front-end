import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { City, Country } from "country-state-city";
import type {
  RegisterRequestDto,
  RegisterRequestErrors,
} from "../types/register";
import { authService } from "../services/auth.service";
import { useAuth } from "../context/AuthContext";

export const useRegisterForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState<RegisterRequestDto>({
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

  const [errorMsgs, setErrorMsgs] = useState<RegisterRequestErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [cities, setCities] = useState<any[]>([]);

  // List of all countries
  const countries = Country.getAllCountries();

  // Dynamic Country Code mapping for UI selection
  const selectedCountryCode =
    countries.find((c) => c.name === formData.country)?.isoCode || "";

  // Dynamic Change Handler with Country-City Cascade Logic
  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    if (name === "country") {
      if (value) {
        const countryCities = City.getCitiesOfCountry(value);
        const selectedCountryObj = Country.getCountryByCode(value);
        const countryFullName = selectedCountryObj
          ? selectedCountryObj.name
          : "";

        setCities(countryCities);
        setFormData((prev) => ({
          ...prev,
          country: countryFullName,
          city: "", // Reset city on country change
        }));
      } else {
        setCities([]);
        setFormData((prev) => ({
          ...prev,
          country: "",
          city: "",
        }));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    // Dynamic Error Clearing on Input Change
    if (errorMsgs[name as keyof RegisterRequestDto]) {
      setErrorMsgs((prev) => ({
        ...prev,
        [name]: undefined,
        ...(name === "country" ? { city: undefined } : {}),
      }));
    }
  };

  // Explicit Form Validation Strategy
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

    // --- Password ---
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
      const todayStr = new Date().toISOString().split("T")[0];
      if (formData.birthDate >= todayStr) {
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

    setErrorMsgs(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const response = await authService.register(formData);

      login(
        {
          id: response.id,
          email: response.email,
          roles: response.roles,
          fullname: response.fullName,
          activeMode: response.activeMode || "CLIENT",
        },
        response.token,
      );

      navigate("/user/dashboard");
    } catch (error: any) {
      if (error.response?.status === 409) {
        const backendMessage =
          error.response.data?.message || "Cet email est déjà utilisé.";
        setErrorMsgs((prev) => ({
          ...prev,
          email: backendMessage,
        }));
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    errorMsgs,
    isLoading,
    countries,
    cities,
    selectedCountryCode,
    handleFormChange,
    handleSubmit,
  };
};

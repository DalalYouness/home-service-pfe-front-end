import { useEffect, useState, type FormEvent, type ChangeEvent } from "react";
import {
  type UserProfilResponseDTO,
  type ProfileErrors,
} from "../types/UserProfilResponseDTO";
export const useProfil = () => {
  //done
  const [isEditing, setIsEditing] = useState(false);
  //done
  const [role, setRole] = useState("");
  const [errors, setErrors] = useState<ProfileErrors>({});

  const [formData, setFormData] = useState<UserProfilResponseDTO>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    photo: "",
    address: "",
    city: "",
    country: "",
    bio: "",
    interventionArea: "",
  });

  //done
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      try {
        const parsedUser = JSON.parse(user);
        const roleName = parsedUser?.roles?.[0]?.roleName || "";
        setRole(roleName);
      } catch (e) {
        console.error("Failed to parse user from localStorage", e);
      }
    }
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    if (errors[id]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[id];
        return newErrors;
      });
    }
  };
  const validateForm = (): boolean => {
    const newErrors: ProfileErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "Le prénom est obligatoire";
    }

    if (!formData.lastName.trim() || formData.lastName === "—") {
      newErrors.lastName = "Le nom est obligatoire";
    }

    const phoneRegex = /^(?:0|\+212)[5-7]\d{8}$/;
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Le numéro de téléphone est obligatoire";
    } else if (!phoneRegex.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Format de téléphone invalide (ex: 0612345678)";
    }

    if (!formData.address.trim()) {
      newErrors.address = "L'adresse est obligatoire";
    }

    if (!formData.city.trim()) {
      newErrors.city = "La ville est obligatoire";
    }

    if (role === "ROLE_PRESTATAIRE" && !formData.interventionArea?.trim()) {
      newErrors.interventionArea = "La zone d'intervention est obligatoire";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const isValid = validateForm();

    if (isValid) {
      console.log("Données valides, prêt pour l'API call:", formData);
      // هنا غانديرو مستقبلاً الـ API Call لـ Backend
      setIsEditing(false);
    } else {
      console.log("Validation échouée", errors);
    }
  };

  const handleEdit = () => {
    if (isEditing) {
      setErrors({});
    }
    setIsEditing(!isEditing);
  };

  return {
    isEditing,
    handleEdit,
    role,
    errors,
    formData,
    handleChange,
    handleSubmit,
  };
};

import { useEffect, useState, type FormEvent, type ChangeEvent } from "react";
import {
  type UserProfilResponseDTO,
  type ProfileErrors,
} from "../types/UserProfilResponseDTO";
import { profileService } from "../services/profile.service";
export const useProfil = () => {
  //done
  const [isEditing, setIsEditing] = useState(false);
  //done
  const [role, setRole] = useState("");
  const [errors, setErrors] = useState<ProfileErrors>({});

  //component loading
  const [isLoading, setisLoading] = useState(false);

  const [formData, setFormData] = useState<UserProfilResponseDTO>({
    //id: wakha blama nkatbo ghadi yji man lbackend ghan7atoh tilqa2iyan hna
    firstName: "",
    lastName: "",
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
    // 1. Extraire le rôle du localStorage
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
    const fetchProfil = async () => {
      try {
        setisLoading(true);
        const profileData = await profileService.getProfil();
        setFormData(profileData);
      } catch (e) {
        console.log("Error fetching profile", e);
      } finally {
        setisLoading(false);
      }
    };
    fetchProfil();
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    // l'utilisation de l'id aussi dayza parce que bach nwarak ela label ndkhol l field o sf madam
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));

    if (errors[id]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[id as keyof ProfileErrors];
        return newErrors;
      });
    }
  };

  //done
  const validateForm = (): boolean => {
    const newErrors: ProfileErrors = {};

    // 1. Valid firstName
    const fn = (formData.firstName || "").trim();
    if (!fn) {
      newErrors.firstName = "Le prénom est obligatoire";
    } else if (fn.length < 2 || fn.length > 30) {
      newErrors.firstName = "Le prénom doit contenir entre 2 et 30 caractères";
    }

    // 2. Valid lastName
    const ln = (formData.lastName || "").trim();
    if (!ln) {
      newErrors.lastName = "Le nom est obligatoire";
    } else if (ln.length < 2 || ln.length > 30) {
      newErrors.lastName = "Le nom doit contenir entre 2 et 30 caractères";
    }

    // 3. Valid Phone Number
    const phone = (formData.phoneNumber || "").trim();
    const regexPhone = /^(\+212|0)([5-7])\d{8}$/;
    if (!phone) {
      newErrors.phoneNumber = "Le numéro de téléphone est obligatoire";
    } else if (!regexPhone.test(phone)) {
      newErrors.phoneNumber =
        "Le numéro de téléphone n'est pas valide (Format marocain attendu)";
    }

    // 4. Valid Address
    const addr = (formData.address || "").trim();
    if (!addr) {
      newErrors.address = "L'adresse est obligatoire";
    } else if (addr.length < 5 || addr.length > 150) {
      newErrors.address = "L'adresse doit contenir entre 5 et 150 caractères";
    }

    // 5. Valid Country
    const country = (formData.country || "").trim();
    if (!country) {
      newErrors.country = "Le pays est obligatoire";
    } else if (country.length < 2 || country.length > 50) {
      newErrors.country = "Le pays doit contenir entre 2 et 50 caractères";
    }

    // 6. Valid City
    const city = (formData.city || "").trim();
    if (!city) {
      newErrors.city = "La ville est obligatoire";
    } else if (city.length < 2 || city.length > 50) {
      newErrors.city = "La ville doit contenir entre 2 et 50 caractères";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const isValid = validateForm();

    if (isValid) {
      console.log("Données valides, prêt pour l'API call:", formData);

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
    isLoading,
  };
};

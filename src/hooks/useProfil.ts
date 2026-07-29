import { useEffect, useState, type FormEvent, type ChangeEvent } from "react";
import { useAuth } from "../context/AuthContext"; // 👈 Context Integration
import { profileService } from "../services/profile.service";
import type {
  UserProfilResponseDTO,
  ProfileErrors,
} from "../types/UserProfilResponseDTO";
import type { UpdateProfileRequestDto } from "../types/UpdateProfileRequestDto";

export const useProfil = () => {
  const { user, updateUser } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<ProfileErrors>({});

  // Deriving role & email from AuthContext directly
  const role = user?.roles?.[0]?.roleName || user?.roles?.[0] || "";
  const email = user?.email || "";

  const [formData, setFormData] = useState<UserProfilResponseDTO>({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    photo: null,
    address: "",
    city: "",
    country: "",
    bio: "",
    interventionArea: "",
  });

  // 1. Fetch Profile Data on Mount mafhomma ✔
  useEffect(() => {
    let isMounted = true;

    const fetchProfil = async () => {
      try {
        setIsLoading(true);
        const profileData = await profileService.getProfil();
        if (isMounted) {
          setFormData(profileData);
        }
      } catch (e) {
        // Axios interceptors handle global errors (401, 500),
        // local catch handles specific fallback if needed.
        console.error("Error fetching profile", e);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchProfil();

    return () => {
      isMounted = false;
    };
  }, []);

  // 2. Clear error on typing
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));

    if (errors[id as keyof ProfileErrors]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[id as keyof ProfileErrors];
        return newErrors;
      });
    }
  };

  // 3. Validation Logic
  const validateForm = (): boolean => {
    const newErrors: ProfileErrors = {};

    const fn = (formData.firstName || "").trim();
    if (!fn) newErrors.firstName = "Le prénom est obligatoire";
    else if (fn.length < 2 || fn.length > 30)
      newErrors.firstName = "Le prénom doit contenir entre 2 et 30 caractères";

    const ln = (formData.lastName || "").trim();
    if (!ln) newErrors.lastName = "Le nom est obligatoire";
    else if (ln.length < 2 || ln.length > 30)
      newErrors.lastName = "Le nom doit contenir entre 2 et 30 caractères";

    const phone = (formData.phoneNumber || "").trim();
    const regexPhone = /^(\+212|0)([5-7])\d{8}$/;
    if (!phone)
      newErrors.phoneNumber = "Le numéro de téléphone est obligatoire";
    else if (!regexPhone.test(phone))
      newErrors.phoneNumber =
        "Le numéro de téléphone n'est pas valide (Format marocain attendu)";

    const addr = (formData.address || "").trim();
    if (!addr) newErrors.address = "L'adresse est obligatoire";
    else if (addr.length < 5 || addr.length > 150)
      newErrors.address = "L'adresse doit contenir entre 5 et 150 caractères";

    const country = (formData.country || "").trim();
    if (!country) newErrors.country = "Le pays est obligatoire";
    else if (country.length < 2 || country.length > 50)
      newErrors.country = "Le pays doit contenir entre 2 et 50 caractères";

    const city = (formData.city || "").trim();
    if (!city) newErrors.city = "La ville est obligatoire";
    else if (city.length < 2 || city.length > 50)
      newErrors.city = "La ville doit contenir entre 2 et 50 caractères";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 4. Submit Update
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setIsLoading(true);
      const updatePayload: UpdateProfileRequestDto = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        phoneNumber: formData.phoneNumber,
        address: formData.address,
        city: formData.city,
        country: formData.country,
        bio: formData.bio,
        interventionArea: formData.interventionArea,
      };

      const response = await profileService.updateProfil(updatePayload);

      // Update local state
      setFormData(response);
      setIsEditing(false);

      // Sync updated name globally via AuthContext (Updates Navbar automatically)
      updateUser({
        fullname: `${response.firstName} ${response.lastName}`.trim(),
      });
    } catch (e) {
      console.error("Error updating profile", e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = () => {
    if (isEditing) {
      setErrors({});
    }
    setIsEditing((prev) => !prev);
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
    email,
  };
};

import { useState } from "react";
import type {
  ChangeEmailErrors,
  ChangeEmailRequestDto,
} from "../types/changeEmail";
import type { AuthResponseDto } from "../types/auth";
import { profileService } from "../services/profile.service";
import { useAuth } from "../context/AuthContext";

export const useChangeEmailForm = () => {
  const { user, updateUser, updateToken } = useAuth();

  const [formData, setFormData] = useState<ChangeEmailRequestDto>({
    newEmail: "",
    currentPassword: "",
  });

  const [isSaving, setIsSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errors, setErrors] = useState<ChangeEmailErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof ChangeEmailErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSuccessMsg("");
    setErrors({});

    try {
      const response: AuthResponseDto =
        await profileService.changeEmail(formData);

      updateToken(response.token);
      updateUser({
        email: response.email,
        fullname: response.fullName,
        roles: response.roles,
      });

      setSuccessMsg(response.message);
      setFormData((prev) => ({ ...prev, currentPassword: "" }));
    } catch (err: any) {
      if (err.response && err.response.status === 400) {
        const errorMsg =
          err.response.data?.message || "Mot de passe incorrect.";
        setErrors({ currentPassword: errorMsg });
        return;
      }

      if (err.response && err.response.status === 409) {
        const currentEmail = user?.email;
        let errorMsg =
          err.response.data?.message || "Cet adresse email est déjà utilisée.";

        if (
          currentEmail &&
          formData.newEmail.trim().toLowerCase() ===
            currentEmail.trim().toLowerCase()
        ) {
          errorMsg = "C'est déjà votre adresse email actuelle.";
        }

        setErrors({ newEmail: errorMsg });
        return;
      }
    } finally {
      setIsSaving(false);
    }
  };
  return {
    formData,
    isSaving,
    successMsg,
    errors,
    handleChange,
    handleSubmit,
  };
};

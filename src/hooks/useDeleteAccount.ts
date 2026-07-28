import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { profileService } from "../services/profile.service";
import { useAuth } from "../context/AuthContext";

export const useDeleteAccount = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteAccount = async () => {
    setIsDeleting(true);

    try {
      await profileService.deleteAccount();

      setTimeout(() => {
        logout();
        navigate("/");
      }, 1500);
    } catch (err) {
      setIsDeleting(false);
    }
  };

  return {
    isDeleting,
    handleDeleteAccount,
  };
};

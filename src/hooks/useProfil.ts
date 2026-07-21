import { useEffect, useState } from "react";
import type { ProfileErrors } from "../types/UserProfilResponseDTO";

export const useProfil = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [role, setRole] = useState("");
  const [errors, setErrors] = useState<ProfileErrors>({});

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
  // we return the reference to the component
  const handleEdit = () => {
    setIsEditing(!isEditing);
  };
  return {
    isEditing,
    handleEdit,
    role,
    errors,
  };
};

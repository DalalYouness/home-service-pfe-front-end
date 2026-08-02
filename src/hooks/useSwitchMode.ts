import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { profileService } from "../services/profile.service";
import { toast } from "sonner";

export const useSwitchMode = () => {
  const navigate = useNavigate();
  const { user, currentMode, switchMode } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  // التحقق واش المستخدم عندو Role Prestataire
  const hasPrestataireRole = user?.roles?.some((role: any) =>
    typeof role === "string"
      ? role === "ROLE_PRESTATAIRE"
      : role?.roleName === "ROLE_PRESTATAIRE",
  );

  const handleModeAction = async () => {
    // 1. إلا ما عندوش الـ Role، يمشي لصفحة devenir-prestataire
    if (!hasPrestataireRole) {
      navigate("/become-provider");
      return;
    }

    setIsLoading(true);

    try {
      if (currentMode === "PRESTATAIRE") {
        // 2. العياط للـ Backend للتحويل إلى CLIENT
        const res = await profileService.switchToClient();
        switchMode("CLIENT");
        toast.success(res.message || "Mode client activé");
        navigate("/user/dashboard");
      } else {
        // 3. العياط للـ Backend للتحويل إلى PRESTATAIRE
        const res = await profileService.switchToProvider();
        switchMode("PRESTATAIRE");
        toast.success(res.message || "Mode prestataire activé");
        navigate("/prestataire/dashboard");
      }
    } catch (error: any) {
      console.error("Erreur switch mode:", error);
      toast.error(
        error?.response?.data?.message || "Impossible de changer de mode.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return {
    hasPrestataireRole,
    handleModeAction,
    isLoading,
  };
};

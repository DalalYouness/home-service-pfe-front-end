import { useState } from "react";
import { authService } from "../services/auth.service";
import type { ResetPasswordRequestDto } from "../types/auth";

export function useResetPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleResetPassword = async (
    resetData: ResetPasswordRequestDto,
    onSuccessCallback?: () => void,
  ) => {
    // Client-side Guard Validation
    if (
      !resetData.email ||
      !resetData.newPassword ||
      !resetData.confirmationPassword
    ) {
      setErrorMsg("Tous les champs sont obligatoires.");
      return;
    }

    if (resetData.newPassword !== resetData.confirmationPassword) {
      setErrorMsg(
        "Le nouveau mot de passe et sa confirmation ne correspondent pas.",
      );
      return;
    }

    setIsLoading(true);
    setErrorMsg(null);
    setIsSuccess(false);

    try {
      await authService.resetPassword(resetData);
      setIsSuccess(true);

      if (onSuccessCallback) {
        onSuccessCallback();
      }
    } catch (error: any) {
      const backendMessage =
        error?.response?.data?.message ||
        "Impossible de réinitialiser le mot de passe. Veuillez réessayer.";
      setErrorMsg(backendMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const resetResetState = () => {
    setIsLoading(false);
    setErrorMsg(null);
    setIsSuccess(false);
  };

  return {
    handleResetPassword,
    isResetLoading: isLoading,
    resetErrorMsg: errorMsg,
    isResetSuccess: isSuccess,
    resetResetState,
    setResetErrorMsg: setErrorMsg,
  };
}

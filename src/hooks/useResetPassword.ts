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
    // 1. Client-side Validation (Guard Clauses)
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
      // 2. Call Service Employee (Axios PUT)
      await authService.resetPassword(resetData);

      setIsSuccess(true);
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    } catch (error: any) {
      // 3. Centralized Error Handling (Backend 400, 404, 500)
      const message =
        error?.response?.data?.message ||
        "Impossible de réinitialiser le mot de passe. Veuillez vérifier votre email.";
      setErrorMsg(message);
    } finally {
      setIsLoading(false);
    }
  };

  const resetState = () => {
    setIsLoading(false);
    setErrorMsg(null);
    setIsSuccess(false);
  };

  return {
    handleResetPassword,
    isLoading,
    errorMsg,
    isSuccess,
    resetState,
    setErrorMsg,
  };
}

import React, { createContext, useContext, useMemo, useState } from "react";

export type AppMode = "CLIENT" | "PRESTATAIRE" | "ADMIN";

export interface User {
  id?: number;
  email: string;
  fullname: string;
  roles: string[];
  activeMode?: AppMode;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  currentMode: AppMode;
  isAuthenticated: boolean;

  login: (user: User, token: string) => void;
  updateUser: (updatedFields: Partial<User>) => void;
  logout: () => void;
  updateToken: (newToken: string) => void;
  switchMode: (mode: AppMode) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem("token");
  });

  const [currentMode, setCurrentMode] = useState<AppMode>(() => {
    const savedMode = localStorage.getItem("currentMode") as AppMode;
    if (savedMode) return savedMode;

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsed: User = JSON.parse(storedUser);
      if (parsed.activeMode) return parsed.activeMode;
    }

    return "CLIENT";
  });

  const switchMode = (mode: AppMode) => {
    setCurrentMode(mode);
    localStorage.setItem("currentMode", mode);

    if (user) {
      const updatedUser = { ...user, activeMode: mode };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    }
  };

  const login = (userData: User, tokenData: string) => {
    const modeFromDB = userData.activeMode || "CLIENT";

    setUser(userData);
    setToken(tokenData);
    setCurrentMode(modeFromDB);

    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", tokenData);
    localStorage.setItem("currentMode", modeFromDB);
  };

  const updateUser = (updatedFields: Partial<User>) => {
    setUser((previousUser) => {
      if (!previousUser) return null;

      const updatedUser = {
        ...previousUser,
        ...updatedFields,
      };

      // dik updatedUser.activeMode  n9adro ga3ma n7tajouha ga3
      const nextMode =
        updatedFields.activeMode || updatedUser.activeMode || currentMode;

      updatedUser.activeMode = nextMode;
      setCurrentMode(nextMode);

      localStorage.setItem("user", JSON.stringify(updatedUser));
      localStorage.setItem("currentMode", nextMode);

      return updatedUser;
    });
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setCurrentMode("CLIENT");

    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("currentMode");
  };

  const updateToken = (newToken: string) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
  };

  const value = useMemo(
    () => ({
      user,
      token,
      currentMode,
      isAuthenticated: !!token,
      login,
      updateUser,
      logout,
      updateToken,
      switchMode,
    }),
    [user, token, currentMode],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
};

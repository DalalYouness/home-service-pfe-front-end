import React, { createContext, useContext, useMemo, useState } from "react";

export type AppMode = "CLIENT" | "PRESTATAIRE" | "ADMIN";

export interface User {
  id?: number;
  email: string;
  fullname: string;
  roles: string[];
  // FIXED: Added activeMode from Backend to keep state in sync with DB Profile type
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

/**
 * FIXED: Synchronization Strategy
 * 1. Honor explicit DB persisted activeMode sent from Backend User response first.
 * 2. Fall back to role priority only if activeMode is undefined (e.g. initial login).
 */
const deriveInitialMode = (user: User | null): AppMode => {
  if (!user) return "CLIENT";

  // Priority 1: Backend DB truth
  if (user.activeMode) return user.activeMode;

  // Priority 2: Role fallback logic
  if (user.roles?.includes("ROLE_ADMIN")) return "ADMIN";
  if (user.roles?.includes("ROLE_PRESTATAIRE")) return "PRESTATAIRE";

  return "CLIENT";
};

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

  // Synchronize state from persisted user or localStorage override
  const [currentMode, setCurrentMode] = useState<AppMode>(() => {
    const savedMode = localStorage.getItem("currentMode") as AppMode;
    if (savedMode) return savedMode;

    const initialUser = localStorage.getItem("user");
    const parsedUser: User | null = initialUser
      ? JSON.parse(initialUser)
      : null;
    return deriveInitialMode(parsedUser);
  });

  const switchMode = (mode: AppMode) => {
    setCurrentMode(mode);
    localStorage.setItem("currentMode", mode);

    // FIXED: Also update activeMode inside the stored user object to avoid desync on reload
    if (user) {
      const updatedUser = { ...user, activeMode: mode };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    }
  };

  const login = (userData: User, tokenData: string) => {
    setUser(userData);
    setToken(tokenData);

    const defaultMode = deriveInitialMode(userData);
    setCurrentMode(defaultMode);

    localStorage.setItem(
      "user",
      JSON.stringify({ ...userData, activeMode: defaultMode }),
    );
    localStorage.setItem("token", tokenData);
    localStorage.setItem("currentMode", defaultMode);
  };

  const updateUser = (updatedFields: Partial<User>) => {
    setUser((previousUser) => {
      if (!previousUser) return null;

      const updatedUser = {
        ...previousUser,
        ...updatedFields,
      };

      // FIXED: Dynamically derive mode if activeMode or roles were changed in update
      const newMode =
        updatedFields.activeMode ?? deriveInitialMode(updatedUser);
      setCurrentMode(newMode);

      updatedUser.activeMode = newMode;

      localStorage.setItem("user", JSON.stringify(updatedUser));
      localStorage.setItem("currentMode", newMode);

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

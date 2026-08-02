import React, { createContext, useContext, useMemo, useState } from "react";

// NEW: Define all supported application modes across the UI context
export type AppMode = "CLIENT" | "PRESTATAIRE" | "ADMIN";

interface User {
  id?: number;
  email: string;
  fullname: string;
  roles: string[];
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  // NEW: State and handler exposed to control global dynamic layout viewing modes
  currentMode: AppMode;
  isAuthenticated: boolean;

  login: (user: User, token: string) => void;
  updateUser: (updatedFields: Partial<User>) => void;
  logout: () => void;
  updateToken: (newToken: string) => void;
  // NEW: Action handler for explicitly toggling viewing modes (e.g. from UserNavBar)
  switchMode: (mode: AppMode) => void;
}

/**
 * NEW: Helper function to evaluate role hierarchy and derive initial active mode.
 * Rules: ADMIN -> PRESTATAIRE -> CLIENT (Fallback for unauthenticated or base users).
 */
const deriveInitialMode = (user: User | null): AppMode => {
  if (!user || !user.roles) return "CLIENT";

  if (user.roles.includes("ROLE_ADMIN")) return "ADMIN";
  if (user.roles.includes("ROLE_PRESTATAIRE")) return "PRESTATAIRE";
  return "CLIENT";
};

// Creates the global Authentication Context contract.
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // User
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Token
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem("token");
  });

  // NEW: Current viewing mode initialization with local persistence & role check fallback
  const [currentMode, setCurrentMode] = useState<AppMode>(() => {
    const savedMode = localStorage.getItem("currentMode") as AppMode;
    if (savedMode) return savedMode;

    const initialUser = localStorage.getItem("user");
    const parsedUser = initialUser ? JSON.parse(initialUser) : null;
    return deriveInitialMode(parsedUser);
  });

  //NEW: Updates mode state in memory and persists state across page reloads
  const switchMode = (mode: AppMode) => {
    setCurrentMode(mode);
    localStorage.setItem("currentMode", mode);
  };

  const login = (user: User, token: string) => {
    setUser(user);
    setToken(token);

    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);

    // NEW: Automatically calculate and set the priority mode immediately upon authentication
    const defaultMode = deriveInitialMode(user);
    setCurrentMode(defaultMode);
    localStorage.setItem("currentMode", defaultMode);
  };

  const updateUser = (updatedFields: Partial<User>) => {
    setUser((previousUser) => {
      if (!previousUser) return null;

      const updatedUser = {
        ...previousUser,
        ...updatedFields,
      };

      localStorage.setItem("user", JSON.stringify(updatedUser));

      // NEW: Recalculate and trigger mode update if roles were updated (e.g., Became Prestataire)
      if (updatedFields.roles) {
        const newMode = deriveInitialMode(updatedUser);
        setCurrentMode(newMode);
        localStorage.setItem("currentMode", newMode);
      }

      return updatedUser;
    });
  };

  const logout = () => {
    setUser(null);
    setToken(null);

    // NEW: Reset viewing mode state back to default guest/client mode upon logout
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
      currentMode, // NEW
      isAuthenticated: !!token,

      login,
      updateUser,
      logout,
      updateToken,
      switchMode, // NEW
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

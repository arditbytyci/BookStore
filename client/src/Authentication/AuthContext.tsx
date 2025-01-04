import { createContext, useContext, useEffect, useState } from "react";
import { getRoleFromToken } from "./utils";

interface AuthContextType {
  isLoggedIn: boolean;
  role: string | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    !!localStorage.getItem("token")
  );
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setRole(getRoleFromToken(token));
    }
    const handleStorageChange = () => {
      const updatedToken = localStorage.getItem("token");
      setIsLoggedIn(!!updatedToken);
      setRole(updatedToken ? getRoleFromToken(updatedToken) : null);
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const login = (token: string) => {
    console.log("Login Token:", token);
    localStorage.setItem("token", token);
    setIsLoggedIn(true);
    const roleFromToken = getRoleFromToken(token);
    console.log("Extracted Role from Token:", roleFromToken);
    setRole(roleFromToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, role }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) throw new Error("useAuth must be within AuthProvider");

  return context;
};

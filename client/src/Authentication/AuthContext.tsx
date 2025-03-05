/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import {
  getEmailFromToken,
  getFullNameFromToken,
  getRoleFromToken,
  getUserIdFromToken,
} from "./utils";


interface AuthContextType {
  isLoggedIn: boolean;
  role: "Customer" | "Admin" | null;
  userId: string | null;
  email: string | null;
  fullName: string | null;
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
  const [role, setRole] = useState<"Customer" | "Admin">("Customer");
  const [userId, setUserId] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [fullName, setFullName] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const roleFromToken = getRoleFromToken(token);
      const idFromToken = getUserIdFromToken(token);
      const emailFromToken = getEmailFromToken(token);
      const fullNameFromToken = getFullNameFromToken(token);
      if (roleFromToken === "Admin" || roleFromToken === "Customer") {
        setRole(roleFromToken);
      } else {
        setRole("Customer");
      }
      setUserId(idFromToken);
      setEmail(emailFromToken);
      setFullName(fullNameFromToken);
    }

    const handleStorageChange = () => {
      const updatedToken = localStorage.getItem("token");
      setIsLoggedIn(!!updatedToken);
      if (updatedToken) {
        const roleFromToken = getRoleFromToken(updatedToken);
        const idFromToken = getUserIdFromToken(updatedToken);
        const emailFromToken = getEmailFromToken(updatedToken);
        const fullNameFromToken = getFullNameFromToken(updatedToken);
        if (roleFromToken === "Admin" || roleFromToken === "Customer") {
          setRole(roleFromToken);
        } else {
          setRole("Customer");
        }

        setUserId(idFromToken);
        setEmail(emailFromToken);
        setFullName(fullNameFromToken);
      } else {
        setRole("Customer");
        setUserId(null);
        setEmail(null);
        setFullName(null);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const login = (token: string) => {
    
    localStorage.setItem("token", token);
    setIsLoggedIn(true);
    const roleFromToken = getRoleFromToken(token);
    const idFromToken = getUserIdFromToken(token);
    const emailFromToken = getEmailFromToken(token);
    const fullNameFromToken = getFullNameFromToken(token);
    if (roleFromToken === "Admin" || roleFromToken === "Customer") {
      setRole(roleFromToken);
    } else {
      setRole("Customer");
    }

    setUserId(idFromToken);
    setEmail(emailFromToken);
    setFullName(fullNameFromToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setRole("Customer");
    setUserId(null);
    setEmail(null);
    setFullName(null);

    window.location.href = "/";
  };
  return (
    <AuthContext.Provider
      value={{ isLoggedIn, login, logout, role, userId, email, fullName }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) throw new Error("useAuth must be within AuthProvider");

  return context;
};

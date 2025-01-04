import { createContext, useContext, useEffect, useState } from "react";
import { getRoleFromToken } from "./utils";

interface AuthContextType {
  isLoggedIn: boolean;
  role: "Customer" | "Admin" | null;
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

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const roleFromToken = getRoleFromToken(token);
      // Ensure role is either 'Customer' or 'Admin'
      if (roleFromToken === "Admin" || roleFromToken === "Customer") {
        setRole(roleFromToken);
      } else {
        setRole("Customer"); // Default to "Customer" if the role is invalid
      }
    }

    const handleStorageChange = () => {
      const updatedToken = localStorage.getItem("token");
      setIsLoggedIn(!!updatedToken);
      if (updatedToken) {
        const roleFromToken = getRoleFromToken(updatedToken);
        // Ensure role is either 'Customer' or 'Admin'
        if (roleFromToken === "Admin" || roleFromToken === "Customer") {
          setRole(roleFromToken);
        } else {
          setRole("Customer"); // Default to "Customer" if the role is invalid
        }
      } else {
        setRole("Customer"); // Default to "Customer" if no token
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const login = (token: string) => {
    console.log("Login Token:", token);
    localStorage.setItem("token", token);
    setIsLoggedIn(true);
    const roleFromToken = getRoleFromToken(token);
    // Ensure role is either 'Customer' or 'Admin'
    if (roleFromToken === "Admin" || roleFromToken === "Customer") {
      setRole(roleFromToken);
    } else {
      setRole("Customer"); // Default to "Customer" if the role is invalid
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setRole("Customer"); // Reset to "Customer" on logout
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

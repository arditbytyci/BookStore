import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { ReactNode } from "react";
import toast from "react-hot-toast";

interface ProtectedRouteProps {
  children?: ReactNode;
  requiredRoles: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRoles,
}) => {
  const { isLoggedIn, role } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/AuthPage" />;
  }

  if (
    !requiredRoles
      .map((r) => r.toLowerCase())
      .includes((role || "").toLowerCase())
  ) {
    toast.error(
      `Access denied. User role "${role}" does not match required roles: ${requiredRoles}`,
    );
    return <Navigate to="/" replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;

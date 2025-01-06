import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { ReactNode } from "react";

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
    return <Navigate to="login" />;
  }

  console.log("User Role:", role);
  console.log("Required Roles:", requiredRoles);

  if (
    !requiredRoles
      .map((r) => r.toLowerCase())
      .includes((role || "").toLowerCase())
  ) {
    console.log(
      `Access denied. User role "${role}" does not match required roles:`,
      requiredRoles
    );
    return <Navigate to="/home" replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;

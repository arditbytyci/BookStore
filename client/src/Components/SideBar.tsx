import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Authentication/AuthContext";
import { ReactNode } from "react";
import { IonIcon } from "@ionic/react"; // Import IonIcon component from @ionic/react
import {
  bookOutline,
  cogOutline,
  cogSharp,
  homeOutline,
  informationCircleOutline,
} from "ionicons/icons"; // Import the icon components

export type LinkType = {
  path: string;
  label: ReactNode;
  icon: any;
};

export type RoleLinks = {
  Admin: LinkType[];
  Customer: LinkType[];
};

export const links: RoleLinks = {
  Customer: [
    { path: "/Home", label: "Home", icon: homeOutline },
    { path: "/BookView", label: "Books", icon: bookOutline },
    { path: "/AuthorView", label: "Authors", icon: cogOutline },
    { path: "/GenreView", label: "About Us", icon: informationCircleOutline },
  ],
  Admin: [{ path: "/Admin", label: "Admin Dashboard", icon: cogSharp }],
};

const SideBar: React.FC<{
  links: RoleLinks;
}> = ({ links }) => {
  const { isLoggedIn, logout, role } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/Home", { replace: true });
  };

  if (role !== "Customer" && role !== "Admin") {
    return null; // Handle unauthorized or default state
  }

  return (
    <div className="flex flex-col justify-around min-h-screen ">
      {/* Sidebar with external CSS for styling */}
      <div className="sidebar">
        {/* Logo or Title */}
        <div className="mb-6 text-md font-bold text-center">logo</div>

        {/* Navigation Links */}
        <div className="space-y-8">
          {links[role]?.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="btn btn-ghost text-sm w-full text-left flex items-center space-x-2"
            >
              <IonIcon icon={link.icon} className="w-6 h-6" />
            </Link>
          ))}
        </div>

        <div>but</div>

        {/* Authentication Buttons
        <div className="mt-auto space-y-2">
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="btn btn-warning w-full text-sm"
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="btn btn-primary w-full text-sm">
                Login
              </Link>
              <Link to="/register" className="btn btn-secondary w-full text-sm">
                Register
              </Link>
            </>
          )}
        </div> */}
      </div>
    </div>
  );
};

export default SideBar;

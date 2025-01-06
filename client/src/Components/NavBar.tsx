import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Authentication/AuthContext";
import { ReactNode } from "react";

export type Link = {
  path: string;
  label: ReactNode;
};

export type RoleLinks = {
  Admin: Link[];
  Customer: Link[];
};

export const links: RoleLinks = {
  Customer: [
    { path: "/Home", label: "Home" },
    { path: "/BookView", label: "Book" },
    { path: "/AuthorView", label: "Authors" },
    { path: "/GenreView", label: "About Us" },
    {
      path: "/CartView",
      label: (
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5 mr-2"
          >
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2 13h13l3-9H6"></path>
          </svg>
        </div>
      ),
    },
  ],

  Admin: [{ path: "/Admin", label: "Admin Dashboard" }],
};

const NavBar: React.FC<{ links: RoleLinks }> = ({ links }) => {
  const { isLoggedIn, logout, role } = useAuth();
  const navigate = useNavigate();

  


  if (role !== "Customer" && role !== "Admin") {
    return null; // or handle unauthorized access here
  }
  const handleLogout = () => {
    logout();
    navigate("/Home", { replace: true });
  };

  return (
    <div className="navbar bg-custom-gradient-bg flex flex-row justify-around">
      <div className="flex space-x-4">
        {role &&
          links[role]?.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="btn btn-ghost text-lg"
            >
              {link.label}
            </Link>
          ))}
      </div>
      <div>
        {isLoggedIn ? (
          <button onClick={handleLogout} className="btn btn-warning">
            Logout
          </button>
        ) : (
          <>
            <Link to="/login" className="btn btn-primary">
              Login
            </Link>
            <Link to="/register" className="btn btn-secondary">
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default NavBar;

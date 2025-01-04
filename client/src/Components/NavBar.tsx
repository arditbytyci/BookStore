import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Authentication/AuthContext";

type Link = {
  path: string;
  label: string;
};

type RoleLinks = {
  [role: string]: Link[];
};

const links: RoleLinks = {
  Customer: [
    { path: "/Home", label: "Home" },
    { path: "/BookView", label: "Books" },
    { path: "/AuthorView", label: "Authors" },
    { path: "/GenreView", label: "Genres" },
  ],
  Admin: [{ path: "/Admin", label: "Admin Dashboard" }],
};

const NavBar: React.FC = () => {
  const { isLoggedIn, logout, role } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/Home", { replace: true });
  };

  return (
    <div className="navbar bg-base-100">
      <div className="flex-2">
        {role &&
          links[role]?.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="btn btn-ghost text-xl"
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

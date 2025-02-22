/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import { useAuth } from "../Authentication/AuthContext";
import { ReactNode } from "react";
import icon from "../assets/book-shop.png";
import homeIcon from "../assets/home-icon.png";
import authorIcon from "../assets/inkwell.png";
import bookIcon from "../assets/book.png";
import bookMark from "../assets/bookmark.png";
import { cogSharp } from "ionicons/icons"; // Import the icon components

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
    { path: "/Home", label: "Home", icon: homeIcon },
    { path: "/Books", label: "Books", icon: bookIcon },
    { path: "/Authors", label: "Authors", icon: authorIcon },
    // { path: "/GenreView", label: "Orders", icon: orderIcon },
  ],
  Admin: [{ path: "/Admin", label: "Admin Dashboard", icon: cogSharp }],
};

const SideBar: React.FC<{
  links: RoleLinks;
}> = ({ links }) => {
  const { role } = useAuth();
  const { isLoggedIn } = useAuth();

  if (role !== "Customer" && role !== "Admin") {
    return null; // Handle unauthorized or default state
  }

  return (
    <div className="flex flex-col justify-around min-h-screen">
      {/* Sidebar with external CSS for styling */}
      <div className="sidebar flex flex-col justify-between items-center min-h-[100%] w-[7rem] bg-background-color p-[2rem] absolute z-10">
        {/* Logo or Title */}
        <div
          className="mb-6 
         text-center"
        >
          {" "}
          <Link to="/Home">
            <img src={icon} alt="Bookstore Icon" width="58" height="58" />
          </Link>
        </div>
        <div className="space-y-16">
          {links[role]?.map((link) => (
            <div className="relative group" key={link.path}>
              <Link
                key={link.path}
                to={link.path}
                className="flex items-center space-x-2 text-gray-700 hover:text-black"
              >
                <img
                  src={link.icon}
                  alt={link.label as string}
                  className="w-[2.5rem] h-[2.5rem]"
                ></img>
              </Link>
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-sm text-white bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity">
                {link.label}
              </span>
            </div>
          ))}
        </div>
        {isLoggedIn && (
          <div className="relative group">
            <Link
              to="/Orders"
              className="flex items-center space-x-2 text-gray-700 hover:text-black"
            >
              <img
                src={bookMark} // Use your icon for GenreView
                alt="Orders"
                className="w-[2.5rem] h-[2.3rem]"
              />
            </Link>
            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-sm text-white bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity">
              Orders
            </span>
          </div>
        )}

        <div>but</div>
      </div>
    </div>
  );
};

export default SideBar;

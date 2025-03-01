/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import { useAuth } from "../Authentication/AuthContext";
import { ReactNode } from "react";
import icon from "../assets/book-shop.png";
import homeIcon from "../assets/home-icon.png";
import authorIcon from "../assets/inkwell.png";
import bookIcon from "../assets/book.png";

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
    { path: "/", label: "Home", icon: homeIcon },
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

  if (role !== "Customer" && role !== "Admin") {
    return null; // Handle unauthorized or default state
  }

  return (
    <div className="flex flex-col justify-around min-h-screen">
      {/* Sidebar with responsive width and positioning */}
      <div className="sidebar flex flex-col justify-between items-center min-h-[100%] w-16 md:w-20 lg:w-24 xl:w-28 bg-background-color p-4 md:p-6 lg:p-8 absolute z-10">
        {/* Logo or Title */}
        <div className=" text-center">
          <Link to="/">
            <img
              src={icon}
              alt="Bookstore Icon"
              className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14"
            />
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="space-y-20 md:space-y-12 lg:space-y-32">
          {links[role]?.map((link) => (
            <div className="relative group" key={link.path}>
              <Link
                to={link.path}
                className="flex items-center space-x-2 text-gray-700 hover:text-black"
              >
                <img
                  src={link.icon}
                  alt={link.label as string}
                  className="w-8 h-8 sm:w-7 sm:h-7 sm:space-x-10 md:w-10 md:h-10 lg:w-10 lg:h-10"
                />
              </Link>
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-sm text-white bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity">
                {link.label}
              </span>
            </div>
          ))}
        </div>

        {/* Placeholder for additional content */}
        <div></div>
      </div>
    </div>
  );
};

export default SideBar;

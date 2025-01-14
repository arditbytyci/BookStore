import { Link } from "react-router-dom";
import { useAuth } from "../Authentication/AuthContext";
import { ReactNode } from "react";
import icon from "../assets/book-shop.png";
import homeIcon from "../assets/home-icon.png";
import authorIcon from "../assets/inkwell.png";
import bookIcon from "../assets/book.png";
import orderIcon from "../assets/order.png";
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
    { path: "/GenreView", label: "Orders", icon: orderIcon },
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
      {/* Sidebar with external CSS for styling */}
      <div className="sidebar">
        {/* Logo or Title */}
        <div
          className="mb-6 
         text-center"
        >
          {" "}
          <img src={icon} alt="Bookstore Icon" width="58" height="58" />
        </div>
        <div className="space-y-16">
          {links[role]?.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="flex items-center space-x-2 text-gray-700 hover:text-black"
            >
              <img
                src={link.icon}
                alt="author icon"
                className="w-[2.5rem] h-[2.5rem]"
              ></img>
            </Link>
          ))}
        </div>

        <div>but</div>
      </div>
    </div>
  );
};

export default SideBar;

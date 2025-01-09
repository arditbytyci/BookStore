import { Link } from "react-router-dom";
import { useAuth } from "../Authentication/AuthContext";
import { ReactNode } from "react";
import { IonIcon } from "@ionic/react"; // Import IonIcon component from @ionic/react
import bookicon from "../assets/icon.svg";
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
    { path: "/Books", label: "Books", icon: bookOutline },
    { path: "/AuthorView", label: "Authors", icon: cogOutline },
    { path: "/GenreView", label: "About Us", icon: informationCircleOutline },
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
          <img src={bookicon} alt="Bookstore Icon" width="58" height="58" />
        </div>
        <div className="space-y-16">
          {links[role]?.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="flex items-center space-x-2 text-gray-700 hover:text-black"
            >
              <IonIcon icon={link.icon} className="w-8 h-8" />
            </Link>
          ))}
        </div>

        <div>but</div>
      </div>
    </div>
  );
};

export default SideBar;

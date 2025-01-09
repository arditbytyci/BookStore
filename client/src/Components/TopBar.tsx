import React from "react";
import { Link } from "react-router-dom";

const TopBar: React.FC = () => {
  return (
    <header className="h-16 bg-transparent text-white fixed top-1 left-0 w-full flex flex-row items-center justify-between ml-20 px-8">
      {/* Left: Logo or App Name */}
      <div className=" text-black border-black ">Search</div>

      {/* Right: Navigation Links or User Actions */}

      <div className="text-black pl-60">User</div>
    </header>
  );
};

export default TopBar;

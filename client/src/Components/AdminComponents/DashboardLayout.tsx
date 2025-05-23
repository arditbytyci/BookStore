import { Navigate, Link, Outlet } from "react-router-dom";
import { useAuth } from "../../Authentication/AuthContext";

const DashboardLayout: React.FC = () => {
  const { role } = useAuth();

  if (role !== "Admin") {
    return <Navigate to="/Home" />; // Or any other page for non-Admin users
  }

  return (
    <div className="flex h-auto justify-center w-full">
      <div className="flex flex-col justify-evenly items-center w-34 bg-background-color h-full p-6">
        <div className="flex justify-between items-center ">
          <h2 className="text-2xl font-semibold">
            <Link to="/Admin" className="btn btn-ghost w-full text-lg">
              Admin Dashboard
            </Link>
          </h2>
        </div>
        <ul className="space-y-4">
          <li>
            <Link to="/BookList" className="btn btn-ghost w-full text-lg">
              Books
            </Link>
          </li>
          <li>
            <Link to="/AuthorList" className="btn btn-ghost w-full text-lg">
              Authors
            </Link>
          </li>
          <li>
            <Link to="/GenreList" className="btn btn-ghost w-full text-lg">
              Genres
            </Link>
          </li>
          <li>
            <Link to="/UserList" className="btn btn-ghost w-full text-lg">
              Users
            </Link>
          </li>
          <li>
            <Link to="/OrderList" className="btn btn-ghost w-full text-lg">
              Orders
            </Link>
          </li>
        </ul>
      </div>

      <div className="main flex-1 p-6 bg-background-color border border-black">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;

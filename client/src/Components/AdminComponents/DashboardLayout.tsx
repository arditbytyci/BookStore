import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../../Authentication/AuthContext";

const DashboardLayout: React.FC = () => {
  const { logout, role } = useAuth();

  return (
    <div className="flex">
      {/* Only show sidebar for Admin role */}
      {role === "Admin" && (
        <div className="w-64 bg-base-200 h-screen sticky top-0 p-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-semibold">Admin Dashboard</h2>
          </div>
          <ul>
            <li>
              <Link to="/Admin" className="btn btn-ghost w-full text-lg">
                Admin Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/Admin/BookView"
                className="btn btn-ghost w-full text-lg"
              >
                Books
              </Link>
            </li>
            <li>
              <Link to="/OrderView" className="btn btn-ghost w-full text-lg">
                Orders
              </Link>
            </li>
            <li>
              <Link to="/CustomerView" className="btn btn-ghost w-full text-lg">
                Customers
              </Link>
            </li>
            <li>
              <Link to="/Settings" className="btn btn-ghost w-full text-lg">
                Settings
              </Link>
            </li>
          </ul>
          <div className="mt-8">
            <button onClick={logout} className="btn btn-warning w-full">
              Logout
            </button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 bg-base-100 p-6">
        <Outlet /> {/* This will render the child route components */}
      </div>
    </div>
  );
};

export default DashboardLayout;

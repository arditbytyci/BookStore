import { Link } from "react-router-dom";
import { useAuth } from "../../Authentication/AuthContext";

const AdminDashboard: React.FC = () => {
  const { isLoggedIn, role, logout } = useAuth();

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-64 bg-base-200 h-screen p-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold">Admin Dashboard</h2>
        </div>
        <ul>
          <li>
            <Link to="/Home" className="btn btn-ghost w-full text-lg">
              Home
            </Link>
          </li>
          <li>
            <Link to="/BookView" className="btn btn-ghost w-full text-lg">
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

      {/* Main Content Area */}
      <div className="flex-1 bg-base-100 p-6">
        <h1 className="text-3xl font-semibold">Dashboard Overview</h1>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-3 gap-6 mt-8">
          <div className="card w-60 bg-base-200 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Total Orders</h2>
              <p>12,345</p>
            </div>
          </div>

          <div className="card w-60 bg-base-200 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Total Customers</h2>
              <p>1,234</p>
            </div>
          </div>

          <div className="card w-60 bg-base-200 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Total Books</h2>
              <p>456</p>
            </div>
          </div>
        </div>

        {/* Recent Orders Table */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold">Recent Orders</h2>
          <table className="table table-zebra w-full mt-4">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Status</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>#1021</td>
                <td>John Doe</td>
                <td>Shipped</td>
                <td>$250</td>
              </tr>
              <tr>
                <td>#1022</td>
                <td>Jane Smith</td>
                <td>Processing</td>
                <td>$120</td>
              </tr>
              <tr>
                <td>#1023</td>
                <td>Bob Johnson</td>
                <td>Delivered</td>
                <td>$310</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

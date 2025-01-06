import { Link } from "react-router-dom";


const AdminDashboard: React.FC = () => {
  return (
    <div className="flex-1">
      {/* Dashboard Header */}
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

      {/* Admin Actions (Optional) */}
      <div className="mt-8">
        <Link to="/OrderView" className="btn btn-primary w-full">
          View All Orders
        </Link>
        <Link to="/CustomerView" className="btn btn-secondary w-full mt-4">
          View All Customers
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;

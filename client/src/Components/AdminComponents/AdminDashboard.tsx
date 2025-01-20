import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../../axiosClient";
import { Book } from "../../Models/Book";
import { User } from "../../Models/User";
import { Order } from "../../Models/Order";

const AdminDashboard: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  useEffect(() => {
    fetchBooks();
    fetchUsers();
    fetchOrders();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axiosClient.get("/book");
      setBooks(response.data);
    } catch (error) {
      console.error("fetchBooks API error", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axiosClient.get("/user");
      setUsers(response.data);
    } catch (error) {
      console.error("fetchUsers API error", error);
    }
  };
  const fetchOrders = async () => {
    try {
      const response = await axiosClient.get("/order");
      setOrders(response.data);
    } catch (error) {
      console.error("fetchUsers API error", error);
    }
  };

  return (
    <div className="flex-1">
      {/* Dashboard Header */}
      <h1 className="text-3xl font-semibold">Dashboard Overview</h1>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-3 gap-6 mt-8">
        <div className="card w-60 bg-base-200 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Total Orders</h2>
            <p>{orders.length}</p>
          </div>
        </div>

        <div className="card w-60 bg-base-200 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Total Users</h2>
            <p>{users.length - 1}</p>
          </div>
        </div>

        <div className="card w-60 bg-base-200 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Total Books</h2>
            <p>{books.length}</p>
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

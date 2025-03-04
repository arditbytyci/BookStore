import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../../api/axiosClient";
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

  const fetchLatestOrders = (orders: Order[]) => {
    return orders.sort((a, b) => b.orderID - a.orderID).slice(0, 3);
  };

  return (
    <div className="flex flex-col justify-center gap-10">
      {/* Dashboard Header */}
      <h1 className="text-3xl font-semibold">Dashboard Overview</h1>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-3 gap-6 mt-8">
        <div className="card w-60 h-20 max-h-40 bg-base-400 shadow-xl">
          <div className="card-body flex flex-col gap-8 items-center">
            <h2 className="card-title">Total Orders</h2>
            <p className="text-xl">{orders.length}</p>
          </div>
        </div>

        <div className="card w-60 h-20 max-h-40 bg-base-200 shadow-xl">
          <div className="card-body flex flex-col gap-8 items-center">
            <h2 className="card-title">Total Users</h2>
            <p className="text-xl">{users.length - 1}</p>
          </div>
        </div>

        <div className="card w-60 h-20 max-h-40 bg-base-200 shadow-xl">
          <div className="card-body flex flex-col gap-8 items-center">
            <h2 className="card-title">Total Books</h2>
            <p className="text-xl">{books.length}</p>
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

              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {fetchLatestOrders(orders).map((o) => (
              <tr key={o.orderID}>
                <td>{o.orderID}</td>
                <td>{o.fullName}</td>
                <td>{o.totalAmount}</td>
              </tr>
            ))}

            <tr></tr>
          </tbody>
        </table>
      </div>

      {/* Admin Actions (Optional) */}
      <div className="mt-8 flex flex-row justify-around items-center">
        <Link
          to="/OrderList"
          className="btn bg-primary text-white font-thin hover:border-primary hover:bg-transparent hover:text-black "
        >
          View All Orders
        </Link>
        <Link
          to="/UserList"
          className="btn bg-primary text-white font-thin hover:border-primary hover:bg-transparent hover:text-black"
        >
          View All Customers
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;

import React, { useEffect, useState } from "react";
import { Order } from "../../Models/Order";
import axiosClient from "../../axiosClient";

const OrderList: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axiosClient.get("order");
      setOrders(response.data);
    } catch (error) {
      console.error("fetchOrders API error", error);
    }
  };

  return (
    <div className="orderlist-container">
      <table className="table">
        <thead>
          <tr>
            <th>OrderID</th>
            <th>Customer</th>
            <th>Email</th>
            <th>Date ordered</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.orderID}>
              <td>{o.orderID}</td>
              <td>{o.fullName}</td>
              <td>{o.email}</td>
              <td>{new Date(o.orderDate).toLocaleDateString()}</td>
              <td>{o.totalAmount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderList;

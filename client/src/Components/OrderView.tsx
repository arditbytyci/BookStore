import { useEffect, useState } from "react";
import { Order } from "../Models/Order";
import axiosClient from "../axiosClient";

const OrderView = () => {
  const [orderData, setOrderData] = useState<Order[]>([]);
  const [, setError] = useState<string | null>();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axiosClient("/order");

      setOrderData(response.data);
    } catch (error) {
      setError("Failed to fetch Orders");
    }
  };

  // export interface Order {
  //   orderID: number;
  //   orderDate: string;
  //   totalAmount: number;
  //   customerID: number;
  //   customerName: string;
  // }

  return (
    <div>
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>ID</th>
            <th>OrderDate</th>
            <th>TotalAmount</th>
            <th>CustomerID</th>
            <th>CustomerName</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {orderData.map((o, i) => (
            <tr key={i}>
              <th>{o.orderID}</th>
              <th>{o.orderDate}</th>
              <th>{o.totalAmount}</th>
              <th>{o.customerID}</th>
              <th>{o.customerName}</th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderView;

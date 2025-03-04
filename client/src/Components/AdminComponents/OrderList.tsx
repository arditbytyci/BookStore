import { useEffect } from "react";
import { useOrder } from "./hooks/useOrder";

const OrderList: React.FC = () => {
  const { orders, handleCancelOrder, fetchOrders } = useOrder();

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return (
    <div className="orderlist-container">
      <table className="table">
        <thead>
          <tr className="text-lg">
            <th>OrderID</th>
            <th>Customer</th>
            <th>Email</th>
            <th>Date ordered</th>
            <th>Total</th>
            <th>Actions</th>
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
              <td
                className="btn btn-md bg-red-700 btn-circle font-thin text-white"
                onClick={() => handleCancelOrder(o.orderID)}
              >
                Cancel
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderList;

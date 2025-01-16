import { useEffect, useState } from "react";
import { Order } from "../../Models/Order";
import axiosClient from "../../axiosClient";
import { useNavigate } from "react-router-dom";
import { OrderDetail } from "../../Models/OrderDetail";

const OrderView: React.FC = () => {
  const [orderData, setOrderData] = useState<Order[]>();
  const [orderDetails] = useState<OrderDetail>();
  const navigate = useNavigate();
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axiosClient.get("/order");
      setOrderData(response.data);
    } catch (error) {
      console.log("fetchOrders API error ", error);
    }
  };

  return (
    <div>
      <ul>
        {orderData?.map((o) => (
          <li key={o.orderID}>
            <h3>Name: {o.fullName}</h3>
            <p>Email: {o.email}</p>
            <p>Total: ${o.totalAmount}</p>
            <p>Order date: {new Date(o.orderDate).toLocaleDateString()}</p>
            <button
              className="btn btn-sm"
              onClick={() => navigate(`/OrderDetails/${o.orderID}`)}
            >
              Order Details
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderView;

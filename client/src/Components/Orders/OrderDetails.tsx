import { useEffect, useState } from "react";
import { OrderDetail } from "../../Models/OrderDetail";
import axiosClient from "../../axiosClient";
import { useParams } from "react-router-dom";

const OrderDetails: React.FC = () => {
  const [orderDetailData, setOrderDetailData] = useState<OrderDetail>();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      fetchOrderDetails(id);
    }
  }, [id]);

  const fetchOrderDetails = async (id: string | number): Promise<void> => {
    try {
      const response = await axiosClient.get(`/orderdetail/${id}`);
      setOrderDetailData(response.data);
    } catch (error) {
      console.log("fetchOrderDetails API error ", error);
    }
  };

  return (
    <div>
      <ul>
        <li>
          <h3>Book name: {orderDetailData?.bookName}</h3>
          <p>Book price: ${orderDetailData?.bookPrice}</p>
          <p>Quantity: {orderDetailData?.quantity}</p>
        </li>
      </ul>
    </div>
  );
};

export default OrderDetails;

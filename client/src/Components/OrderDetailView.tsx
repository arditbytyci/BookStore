import { useEffect, useState } from "react";
import { OrderDetail } from "../Models/OrderDetail";
import axiosClient from "../axiosClient";

const OrderDetailView = () => {
  const [orderDetailData, setOrderDetailData] = useState<OrderDetail[]>([]);
  const [, setError] = useState<string | null>();

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  const fetchOrderDetails = async () => {
    try {
      const response = await axiosClient.get("/orderdetail");
      setOrderDetailData(response.data);
    } catch (error) {
      setError("failed to fetch orderDetails");
    }
  };

  // export interface OrderDetail {
  //   orderDetailID: number;
  //   quantity: number;
  //   orderID: number;
  //   bookID: number;
  //   bookName: string;
  //   bookPrice: number;
  // }

  return (
    <div>
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>ID</th>
            <th>quantity</th>
            <th>OrderID</th>
            <th>BookID</th>
            <th>BookName</th>
            <th>BookPrice</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {orderDetailData.map((od, i) => (
            <tr key={i}>
              <th>{od.orderDetailID}</th>
              <th>{od.quantity}</th>
              <th>{od.orderID}</th>
              <th>{od.bookID}</th>
              <th>{od.bookName}</th>
              <th>{od.bookPrice}</th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderDetailView;

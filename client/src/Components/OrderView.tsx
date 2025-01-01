import { useState } from "react";
import { Order } from "../Models/Order";
import axiosClient from "../axiosClient";

const OrderView = () => {
  const [orderData, setOrderData] = useState<Order[]>([]);
  const [, setError] = useState<string | null>();




  const fetchOrders = async () => {

    try {
      const response = await axiosClient("/order")

      setOrderData()
    } catch (error) {
      
    }


  }

  return <div>OrderView</div>;
};

export default OrderView;

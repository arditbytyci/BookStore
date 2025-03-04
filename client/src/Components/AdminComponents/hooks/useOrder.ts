/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { cancelOrder, getOrders } from "../services/orderService";
import { Order } from "../../../Models/Order";
import toast from "react-hot-toast";

export const useOrder = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  const fetchOrders = async () => {
    try {
      const response = await getOrders();

      setOrders(response);
    } catch (error) {
      console.error("fetchOrders API error:", error); // Log the error
      toast.error("Failed to fetch orders");
    }
  };
  const handleCancelOrder = async (id: number) => {
    try {
      await cancelOrder(id);
      setOrders((prev) => prev.filter((order) => order.orderID !== id));
    } catch (error) {
      toast.error(`Failed to delete order with ID:${id}`);
    }
  };

  return {
    orders,
    handleCancelOrder,
    fetchOrders,
  };
};

import axiosClient from "../../../api/axiosClient";
import { Order } from "../../../Models/Order";

export const getOrders = async (): Promise<Order[]> => {
  const res = await axiosClient.get("/order");
  return res.data;
};

export const cancelOrder = async (orderId: number): Promise<void> => {
  await axiosClient.delete(`/order/${orderId}`);
};

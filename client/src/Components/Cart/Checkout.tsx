import { useState } from "react";
import axiosClient from "../../axiosClient";
import { useCart } from "./CartContext";
import { Order } from "../../Models/Order";

const CheckOutPage = () => {
  const { state, dispatch } = useCart();
  const [order, setOrder] = useState<Order>();

  const handleCheckOut = async () => {
    try {
      const totalAmount = state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
      const orderDetails = state.items.map((item) => ({
        bookId: item.bookId,
        quantity: item.quantity,
        bookPrice: item.price,
      }));

      await axiosClient.post("/orders", {
        userId: order?.userId,
        orderDate: new Date().toISOString(),
        totalAmount,
        orderDetails,
      });

      dispatch({ type: "CLEAR_CART", payload: {} });
      alert("Order placed successfully!");
    } catch (error) {
      console.error("Checkout Error:", error);
      alert("Failed to place the order. Please try again.");
    }
  };

  return (
    <div>
      <h2>Checkout</h2>
      <button onClick={handleCheckOut}>Place Order</button>
    </div>
  );
};

export default CheckOutPage;

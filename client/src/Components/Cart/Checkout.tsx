import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { RootState } from "./store";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import previous from "../../assets/previous.png";
import { clearCart } from "./cartSlice";

const Checkout: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart.items);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setError("");

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement)!,
    });

    if (error) {
      setError(error.message || "Payment failed");
      setLoading(false);
      return;
    }

    console.log("Payment successful:", paymentMethod);
    toast.success("Payment successful!");
    dispatch(clearCart());
    setLoading(false);
    navigate("/Home");
  };

  return (
    <div className="p-6 border border-black w-[100vh] max-w-md mx-auto space-y-6 bg-white shadow-lg rounded-lg">
      <img
        src={previous}
        alt=""
        className="w-10 h-10 cursor-pointer"
        onClick={() => navigate(-1)}
      />

      <h2 className="text-xl font-bold mb-4">Checkout</h2>
      <p className="mb-2">Total: ${totalAmount.toFixed(2)}</p>
      <form onSubmit={handlePayment} className="space-y-4">
        <CardElement className="p-3 border rounded-md" />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          disabled={!stripe || loading}
          className="btn btn-primary w-full"
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </form>
    </div>
  );
};

export default Checkout;

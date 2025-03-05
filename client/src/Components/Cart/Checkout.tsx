/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { RootState } from "./store";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import previous from "../../assets/previous.png";
import { clearCart } from "./cartSlice";

import { Order } from "../../Models/Order";
import axiosClient from "../../api/axiosClient";
import { useAuth } from "../../Authentication/AuthContext";

const Checkout: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const { userId } = useAuth();
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

    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement)!,
      });

      if (error) {
        setError(error.message || "Payment failed");
        setLoading(false);
        return;
      }

      const orderDetails = cart.map((item) => ({
        bookId: item.bookID,
        quantity: item.quantity,
        bookPrice: item.price,
      }));

      const orderResponse = await axiosClient.post<Order>("/order", {
        userId: userId,
        orderDate: new Date().toISOString(),
        totalAmount,
        orderDetails,
      });

      dispatch(clearCart());
      toast.success("Payment successful! Order placed.");
      navigate("/");
    } catch (error) {
      console.error("Checkout Error:", error);
      setError("Failed to place the order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-fit w-screen flex items-start justify-center">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md border border-gray-100">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-800 transition-colors mb-6"
        >
          <img src={previous} alt="Back" className="w-6 h-6 mr-2" />
          <span>Back</span>
        </button>

        <h2 className="text-3xl font-bold text-gray-900 mb-6">Checkout</h2>

        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <p className="text-lg font-semibold text-gray-700">
            Total:{" "}
            <span className="text-purple-600">${totalAmount.toFixed(2)}</span>
          </p>
        </div>

        <form onSubmit={handlePayment} className="space-y-6">
          <div className="border border-gray-200 rounded-lg p-3 bg-gray-50">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#424770",
                    "::placeholder": {
                      color: "#aab7c4",
                    },
                  },
                  invalid: {
                    color: "#9e2146",
                  },
                },
              }}
            />
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            disabled={!stripe || loading}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin h-5 w-5 mr-3 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing...
              </span>
            ) : (
              "Pay Now"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;

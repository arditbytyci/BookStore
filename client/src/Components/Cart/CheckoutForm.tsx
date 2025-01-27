import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useCart } from "./CartContext";
import axiosClient from "../../api/axiosClient";
import { useAuth } from "../../Authentication/AuthContext";
import axios from "axios";

const stripePromise = loadStripe(
  "pk_test_51PSffqGGsJXk0iHFsnaBLJVtQkcYI5xTtrBAyV9Qs4xDFOnyhTytToRNLy7zIE2AYc1a5AYZwpZlklH7MFHTNtSo00vpOOHG6h"
);

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#374151", // Gray-700
      fontFamily: '"Inter", sans-serif',
      fontSize: "16px",
      "::placeholder": {
        color: "#9CA3AF", // Gray-400
      },
    },
    invalid: {
      color: "#EF4444", // Red-500
      iconColor: "#EF4444",
    },
  },
};

const CheckOutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { state, dispatch } = useCart();
  const { userId, email, fullName } = useAuth();
  const orderDate = new Date().toISOString();

  const handleCheckOut = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    try {
      const totalAmount = state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );

      const { data } = await axiosClient.post("/cart/payment/intent", {
        amount: totalAmount * 100,
      });

      const clientSecret = data.clientSecret;
      console.log(clientSecret);

      const cardElement = elements.getElement(CardElement);
      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement!,
          billing_details: { name: "Customer Name" },
        },
      });

      if (paymentResult.error) {
        alert(`Payment failed: ${paymentResult.error.message}`);
      } else if (paymentResult.paymentIntent?.status === "succeeded") {
        // Log the request object before sending it to the server
        const orderDetails = state.items.map((item) => ({
          bookID: item.bookID,
          quantity: item.quantity,
          bookPrice: item.price,
          bookName: item.bookName,
        }));

        const orderRequest = {
          userId,
          orderDate,
          fullName,
          email,
          totalAmount,
          orderDetails: orderDetails,
        };

        console.log("Order Request: ", orderRequest); // Log request

        await axiosClient.post("/order", orderRequest);
        dispatch({ type: "CLEAR_CART", payload: {} });
        alert("Payment and Order successful!");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("API error response: ", error.response?.data);
      } else {
        console.error("Checkout error", error);
      }
      alert("Failed to process payment.");
    }
  };
  return (
    <div className="w-[550px] mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Checkout</h2>
      <form onSubmit={handleCheckOut} className="space-y-4">
        <div className="border border-gray-300 p-4 rounded-md">
          <CardElement options={CARD_ELEMENT_OPTIONS} />
        </div>
        <button
          type="submit"
          disabled={!stripe || !elements}
          className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Pay Now
        </button>
      </form>
    </div>
  );
};

const CheckOutPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Elements stripe={stripePromise}>
        <CheckOutForm />
      </Elements>
    </div>
  );
};

export default CheckOutPage;

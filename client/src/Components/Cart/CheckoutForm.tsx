import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useCart } from "./CartContext";
import axiosClient from "../../axiosClient";

const stripePromise = loadStripe(
  "pk_test_51PSffqGGsJXk0iHFsnaBLJVtQkcYI5xTtrBAyV9Qs4xDFOnyhTytToRNLy7zIE2AYc1a5AYZwpZlklH7MFHTNtSo00vpOOHG6h"
);

const CheckOutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const { state, dispatch } = useCart();

  const handleCheckOut = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    try {
      const totalAmount = state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );

      const { data: clientSecret } = await axiosClient.post(
        "/api/payment/intent",
        {
          amount: totalAmount * 100,
        }
      );

      const cardElement = elements.getElement(CardElement);
      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement!,
          billing_details: {
            name: "Customer Name",
          },
        },
      });

      if (paymentResult.error) {
        alert(`Payment failed: ${paymentResult.error.message}`);
      }
    } catch (error) {}
  };
};
